import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { storage } from "./storage";
import { InsertMessage } from "@shared/schema";

interface WSClient extends WebSocket {
  bookingId?: string;
  userId?: string;
}

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ 
    server,
    path: "/ws"
  });

  wss.on("connection", (ws: WSClient, req) => {
    console.log("[WebSocket] New connection");

    ws.on("message", async (data) => {
      try {
        const payload = JSON.parse(data.toString());
        
        if (payload.type === "join") {
          ws.bookingId = payload.bookingId;
          ws.userId = payload.userId;
          console.log(`[WebSocket] User ${payload.userId} joined booking ${payload.bookingId}`);
          return;
        }

        if (payload.type === "message") {
          const messageData: InsertMessage = {
            bookingId: payload.bookingId,
            senderId: payload.senderId,
            senderType: payload.senderType,
            senderName: payload.senderName,
            message: payload.message,
          };

          const newMessage = await storage.createMessage(messageData);

          wss.clients.forEach((client: WSClient) => {
            if (
              client.readyState === WebSocket.OPEN &&
              client.bookingId === payload.bookingId
            ) {
              client.send(JSON.stringify({
                type: "message",
                data: newMessage,
              }));
            }
          });
        }
      } catch (error) {
        console.error("[WebSocket] Error:", error);
      }
    });

    ws.on("close", () => {
      console.log("[WebSocket] Connection closed");
    });
  });

  console.log("[WebSocket] Server initialized on /ws");
}
