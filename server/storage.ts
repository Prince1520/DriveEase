import {
  type User,
  type UpsertUser,
  type Driver,
  type InsertDriver,
  type Booking,
  type InsertBooking,
  type Review,
  type InsertReview,
  type Message,
  type InsertMessage,
  users,
  drivers,
  bookings,
  reviews,
  messages,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations (REQUIRED for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getAllDrivers(): Promise<Driver[]>;
  getDriver(id: string): Promise<Driver | undefined>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByDriver(driverId: string): Promise<Booking[]>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  getAllReviews(): Promise<Review[]>;
  getReview(id: string): Promise<Review | undefined>;
  getReviewsByDriver(driverId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  getMessagesByBooking(bookingId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(messageId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (REQUIRED for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllDrivers(): Promise<Driver[]> {
    return await db.select().from(drivers);
  }

  async getDriver(id: string): Promise<Driver | undefined> {
    const [driver] = await db.select().from(drivers).where(eq(drivers.id, id));
    return driver || undefined;
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const [driver] = await db.insert(drivers).values(insertDriver).returning();
    return driver;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByDriver(driverId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.driverId, driverId));
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async getReview(id: string): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review || undefined;
  }

  async getReviewsByDriver(driverId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.driverId, driverId));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  async getMessagesByBooking(bookingId: string): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.bookingId, bookingId));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    await db.update(messages).set({ read: true }).where(eq(messages.id, messageId));
  }
}

export const storage = new DatabaseStorage();
