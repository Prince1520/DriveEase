import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Shield, MapPin, Car, Calendar, Clock, CheckCircle, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Driver, type Review } from "@shared/schema";
import { Link, useParams } from "wouter";

export default function DriverDetail() {
  const { id } = useParams();
  
  const { data: driver, isLoading: driverLoading } = useQuery<Driver>({
    queryKey: ["/api/drivers", id],
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews", id],
  });

  if (driverLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
          <Skeleton className="h-96 w-full mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full" />
            </div>
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
            <p className="text-muted-foreground mb-6">The driver you're looking for doesn't exist.</p>
            <Link href="/drivers">
              <Button>Browse All Drivers</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const rating = parseFloat(driver.rating);
  const ratingDistribution = reviews
    ? [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: reviews.filter((r) => r.rating === stars).length,
        percentage: (reviews.filter((r) => r.rating === stars).length / reviews.length) * 100,
      }))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <Card className="mb-6">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src={driver.photo} alt={driver.name} />
                  <AvatarFallback className="text-3xl">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold" data-testid="text-driver-name">
                          {driver.name}
                        </h1>
                        {driver.verified && (
                          <Shield className="w-7 h-7 text-primary" data-testid="icon-verified" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-lg" data-testid="text-rating">
                            {rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-muted-foreground" data-testid="text-review-count">
                          ({driver.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span data-testid="text-location">{driver.location}</span>
                      </div>
                    </div>
                    
                    {driver.available && (
                      <Badge variant="default" className="text-sm" data-testid="badge-available">
                        Available Now
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6" data-testid="text-bio">
                    {driver.bio}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-semibold" data-testid="text-experience">
                          {driver.yearsExperience} years
                        </p>
                      </div>
                    </div>
                    
                    {driver.backgroundCheck && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Background</p>
                          <p className="font-semibold text-sm">Verified</p>
                        </div>
                      </div>
                    )}
                    
                    {driver.licenseVerified && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">License</p>
                          <p className="font-semibold text-sm">Verified</p>
                        </div>
                      </div>
                    )}
                    
                    {driver.insuranceCoverage && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Insurance</p>
                          <p className="font-semibold text-sm">Covered</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {driver.vehicleTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" data-testid={`badge-vehicle-${index}`}>
                        <Car className="w-3 h-3 mr-1" />
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Reviews & Ratings</h2>
                </CardHeader>
                <CardContent>
                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                      ))}
                    </div>
                  ) : reviews && reviews.length > 0 ? (
                    <>
                      <div className="mb-6 space-y-2">
                        {ratingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm font-medium">{item.stars}</span>
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <Progress value={item.percentage} className="flex-1" />
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {item.count}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <Card key={review.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold" data-testid={`text-reviewer-${review.id}`}>
                                    {review.customerName}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-muted-foreground" data-testid={`text-comment-${review.id}`}>
                                {review.comment}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reviews yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Pricing</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Hourly</span>
                    </div>
                    <span className="font-bold" data-testid="text-hourly-rate">
                      ₹{parseFloat(driver.hourlyRate).toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Daily</span>
                    </div>
                    <span className="font-bold" data-testid="text-daily-rate">
                      ₹{parseFloat(driver.dailyRate).toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Weekly</span>
                    </div>
                    <span className="font-bold" data-testid="text-weekly-rate">
                      ₹{parseFloat(driver.weeklyRate).toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Monthly</span>
                    </div>
                    <span className="font-bold" data-testid="text-monthly-rate">
                      ₹{parseFloat(driver.monthlyRate).toFixed(0)}
                    </span>
                  </div>
                  
                  <Link href={`/book/${driver.id}`}>
                    <Button className="w-full" size="lg" data-testid="button-book-driver">
                      Book This Driver
                    </Button>
                  </Link>
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
