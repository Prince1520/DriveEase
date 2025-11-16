import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDriverSchema, insertBookingSchema, insertReviewSchema, insertMessageSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupWebSocket } from "./websocket";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app.get("/api/drivers", async (_req, res) => {
    try {
      const drivers = await storage.getAllDrivers();
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch drivers" });
    }
  });

  app.get("/api/drivers/:id", async (req, res) => {
    try {
      const driver = await storage.getDriver(req.params.id);
      if (!driver) {
        return res.status(404).json({ error: "Driver not found" });
      }
      res.json(driver);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch driver" });
    }
  });

  app.post("/api/drivers", async (req, res) => {
    try {
      const validatedData = insertDriverSchema.parse(req.body);
      const driver = await storage.createDriver(validatedData);
      res.status(201).json(driver);
    } catch (error) {
      res.status(400).json({ error: "Invalid driver data" });
    }
  });

  // Get user's bookings (requires authentication)
  app.get("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  // Create booking (allows unauthenticated for guest bookings, but associates with user if logged in)
  app.post("/api/bookings", async (req: any, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      // Add userId if user is authenticated
      const bookingData = {
        ...validatedData,
        userId: req.isAuthenticated() && req.user?.claims?.sub ? req.user.claims.sub : null,
      };
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error: any) {
      console.error("Booking validation error:", error);
      if (error.issues) {
        return res.status(400).json({ error: "Invalid booking data", details: error.issues });
      }
      res.status(400).json({ error: "Invalid booking data", message: error.message });
    }
  });

  app.get("/api/reviews/:driverId", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByDriver(req.params.driverId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Message routes (require authentication and booking ownership)
  app.get("/api/messages/:bookingId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const booking = await storage.getBooking(req.params.bookingId);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      if (booking.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized to view these messages" });
      }
      
      const messages = await storage.getMessagesByBooking(req.params.bookingId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertMessageSchema.parse(req.body);
      
      const booking = await storage.getBooking(validatedData.bookingId);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      if (booking.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized to send messages for this booking" });
      }
      
      const message = await storage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  const httpServer = createServer(app);
  
  // Setup WebSocket server for real-time messaging
  setupWebSocket(httpServer);

  return httpServer;
}
