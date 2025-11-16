import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star, MapPin, CalendarIcon, Check } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type Driver, type InsertBooking, insertBookingSchema } from "@shared/schema";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const durationTypes = [
  { value: "hourly", label: "Hourly", rateKey: "hourlyRate" as const },
  { value: "daily", label: "Daily", rateKey: "dailyRate" as const },
  { value: "weekly", label: "Weekly", rateKey: "weeklyRate" as const },
  { value: "monthly", label: "Monthly", rateKey: "monthlyRate" as const },
];

export default function BookDriver() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedDurationType, setSelectedDurationType] = useState("hourly");
  const [duration, setDuration] = useState(1);

  const { data: driver, isLoading } = useQuery<Driver>({
    queryKey: ["/api/drivers", id],
  });

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      driverId: id || "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      durationType: "hourly",
      duration: 1,
      startDate: new Date(),
      totalPrice: "0",
      pickupLocation: "",
      notes: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      return await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed!",
        description: "Your driver has been booked successfully. Check your email for details.",
      });
      setLocation("/drivers");
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateTotal = () => {
    if (!driver) return 0;
    const selectedType = durationTypes.find((t) => t.value === selectedDurationType);
    if (!selectedType) return 0;
    const rate = parseFloat(driver[selectedType.rateKey]);
    return rate * duration;
  };

  const onSubmit = (data: InsertBooking) => {
    const total = calculateTotal();
    const startDateString = data.startDate instanceof Date 
      ? data.startDate.toISOString() 
      : data.startDate;
    
    bookingMutation.mutate({
      ...data,
      driverId: id || "",
      durationType: selectedDurationType,
      duration,
      startDate: startDateString as any,
      totalPrice: total.toFixed(2),
      notes: data.notes || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-8 w-full">
          <Skeleton className="h-64 w-full mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="lg:col-span-2 h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Driver Not Found</h2>
            <p className="text-muted-foreground">The driver you're trying to book doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const rating = parseFloat(driver.rating);
  const total = calculateTotal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Select Driver</span>
              <span>→</span>
              <span className="text-foreground font-medium">Choose Duration</span>
              <span>→</span>
              <span>Confirm Booking</span>
            </div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">
              Book Your Driver
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                      <AvatarImage src={driver.photo} alt={driver.name} />
                      <AvatarFallback>
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-1" data-testid="text-driver-name">
                        {driver.name}
                      </h2>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({driver.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{driver.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-lg font-semibold">Select Duration</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {durationTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedDurationType(type.value)}
                        className={cn(
                          "p-4 rounded-md border-2 transition-all hover-elevate active-elevate-2",
                          selectedDurationType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                        data-testid={`button-duration-${type.value}`}
                      >
                        <div className="font-semibold mb-1">{type.label}</div>
                        <div className="text-sm text-muted-foreground">
                          ₹{parseFloat(driver[type.rateKey]).toFixed(0)}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="duration">
                      Number of {selectedDurationType === "hourly" ? "hours" : 
                                 selectedDurationType === "daily" ? "days" :
                                 selectedDurationType === "weekly" ? "weeks" : "months"}
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                      className="mt-2"
                      data-testid="input-duration"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Booking Details</h2>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-customer-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-customer-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 (555) 000-0000" {...field} data-testid="input-customer-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date & Time</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    data-testid="button-select-date"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pickupLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pickup Location</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, City, State" {...field} data-testid="input-pickup-location" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special requirements or instructions..."
                                className="resize-none"
                                {...field}
                                value={field.value || ""}
                                data-testid="textarea-notes"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <h2 className="text-lg font-semibold">Booking Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium" data-testid="text-summary-duration">
                        {duration} {selectedDurationType === "hourly" ? "hour(s)" : 
                                   selectedDurationType === "daily" ? "day(s)" :
                                   selectedDurationType === "weekly" ? "week(s)" : "month(s)"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-medium" data-testid="text-summary-rate">
                        ₹{parseFloat(driver[durationTypes.find(t => t.value === selectedDurationType)?.rateKey || "hourlyRate"]).toFixed(0)}/{selectedDurationType === "hourly" ? "hr" : selectedDurationType.slice(0, -2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span data-testid="text-summary-total">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Background-checked driver</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Licensed and insured</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Cancel up to 24hrs before</span>
                    </div>
                  </div>

                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full"
                    size="lg"
                    disabled={bookingMutation.isPending}
                    data-testid="button-confirm-booking"
                  >
                    {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By confirming, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
