import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { Message } from "@shared/schema";
import { Send, ArrowLeft } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

export default function Messages() {
  const [, params] = useRoute("/messages/:bookingId");
  const bookingId = params?.bookingId || "";
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [messageText, setMessageText] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: initialMessages, isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages", bookingId],
    enabled: !!bookingId,
  });

  useEffect(() => {
    if (initialMessages) {
      setLocalMessages(initialMessages);
    }
  }, [initialMessages]);

  const handleNewMessage = (message: Message) => {
    setLocalMessages((prev) => [...prev, message]);
  };

  const { isConnected, sendMessage } = useWebSocket({
    bookingId,
    userId: user?.id || "",
    onMessage: handleNewMessage,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !isConnected || !user) return;

    const senderName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.email || "User";

    sendMessage(messageText, senderName, "customer");
    setMessageText("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">Please log in to view messages</p>
              <Button onClick={() => window.location.href = "/api/login"} data-testid="button-login">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/bookings")}
              className="gap-2"
              data-testid="button-back-to-bookings"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Bookings
            </Button>
          </div>

          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Booking Chat</CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-muted-foreground">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {localMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      No messages yet. Start a conversation with your driver!
                    </div>
                  ) : (
                    localMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                        data-testid={`message-${msg.id}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            msg.senderId === user?.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="text-xs opacity-80 mb-1">{msg.senderName}</div>
                          <div className="break-words">{msg.message}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {format(new Date(msg.createdAt), "h:mm a")}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      disabled={!isConnected}
                      data-testid="input-message"
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={!messageText.trim() || !isConnected}
                      data-testid="button-send-message"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
