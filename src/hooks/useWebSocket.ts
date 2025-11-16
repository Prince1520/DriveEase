import { useEffect, useRef, useState, useCallback } from "react";
import type { Message } from "@shared/schema";

interface UseWebSocketProps {
  bookingId: string;
  userId: string;
  onMessage: (message: Message) => void;
}

export function useWebSocket({ bookingId, userId, onMessage }: UseWebSocketProps) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[WebSocket] Connected");
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: "join",
        bookingId,
        userId,
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          onMessage(data.data);
        }
      } catch (error) {
        console.error("[WebSocket] Error parsing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("[WebSocket] Error:", error);
    };

    ws.onclose = () => {
      console.log("[WebSocket] Disconnected");
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [bookingId, userId, onMessage]);

  const sendMessage = useCallback((message: string, senderName: string, senderType: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "message",
        bookingId,
        senderId: userId,
        senderType,
        senderName,
        message,
      }));
    }
  }, [bookingId, userId]);

  return { isConnected, sendMessage };
}
