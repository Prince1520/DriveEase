import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import type { Booking } from "@shared/schema";
import { Calendar, MapPin, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function BookingHistory() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "Please log in to view your bookings.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || bookingsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const getDurationText = (durationType: string, duration: number) => {
    const unit = duration === 1 ? durationType.slice(0, -2) : durationType.slice(0, -2) + "s";
    return `${duration} ${unit}`;
  };

  const upcomingBookings = bookings?.filter(b => 
    new Date(b.startDate) >= new Date() && b.status !== "cancelled"
  ) || [];

  const pastBookings = bookings?.filter(b => 
    new Date(b.startDate) < new Date() || b.status === "cancelled"
  ) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              View and manage your driver bookings
            </p>
          </div>

          {!bookings || bookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by booking a professional driver for your vehicle
                </p>
                <Button onClick={() => setLocation("/drivers")} data-testid="button-browse-drivers">
                  Browse Drivers
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {upcomingBookings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Upcoming Trips</h2>
                  <div className="grid gap-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="hover-elevate" data-testid={`booking-card-${booking.id}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">
                                Booking #{booking.id.slice(0, 8)}
                              </CardTitle>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(booking.startDate), "MMM d, yyyy 'at' h:mm a")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {getDurationText(booking.durationType, booking.duration)}
                                </div>
                              </div>
                            </div>
                            <Badge variant={getStatusBadgeVariant(booking.status)} data-testid={`status-${booking.id}`}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>{booking.pickupLocation}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span>{booking.customerName}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{booking.customerPhone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span>{booking.customerEmail}</span>
                              </div>
                            </div>
                          </div>
                          {booking.notes && (
                            <div className="pt-3 border-t">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold">Notes:</span> {booking.notes}
                              </p>
                            </div>
                          )}
                          <div className="pt-3 border-t flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-2xl font-bold text-primary">
                              ₹{booking.totalPrice}
                            </span>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setLocation(`/messages/${booking.id}`)}
                                className="gap-1"
                                data-testid={`message-driver-${booking.id}`}
                              >
                                <MessageSquare className="w-4 h-4" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm" data-testid={`view-details-${booking.id}`}>
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {pastBookings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Past Trips</h2>
                  <div className="grid gap-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id} className="opacity-90" data-testid={`booking-card-${booking.id}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">
                                Booking #{booking.id.slice(0, 8)}
                              </CardTitle>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(booking.startDate), "MMM d, yyyy 'at' h:mm a")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {getDurationText(booking.durationType, booking.duration)}
                                </div>
                              </div>
                            </div>
                            <Badge variant={getStatusBadgeVariant(booking.status)} data-testid={`status-${booking.id}`}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>{booking.pickupLocation}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold">₹{booking.totalPrice}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
