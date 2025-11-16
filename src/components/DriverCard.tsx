import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Shield, MapPin, Car } from "lucide-react";
import { type Driver } from "@shared/schema";
import { Link } from "wouter";

interface DriverCardProps {
  driver: Driver;
}

export function DriverCard({ driver }: DriverCardProps) {
  const rating = parseFloat(driver.rating);
  
  return (
    <Card className="overflow-hidden hover-elevate transition-all">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage src={driver.photo} alt={driver.name} />
            <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate" data-testid={`text-driver-name-${driver.id}`}>
                {driver.name}
              </h3>
              {driver.verified && (
                <Shield className="w-5 h-5 text-primary flex-shrink-0" data-testid={`icon-verified-${driver.id}`} />
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm" data-testid={`text-rating-${driver.id}`}>
                  {rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground" data-testid={`text-review-count-${driver.id}`}>
                ({driver.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate" data-testid={`text-location-${driver.id}`}>{driver.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-bio-${driver.id}`}>
          {driver.bio}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span className="font-medium" data-testid={`text-experience-${driver.id}`}>
              {driver.yearsExperience} years
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {driver.vehicleTypes.map((type, index) => (
              <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-vehicle-${driver.id}-${index}`}>
                <Car className="w-3 h-3 mr-1" />
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Hourly</p>
            <p className="font-semibold" data-testid={`text-hourly-rate-${driver.id}`}>
              ₹{parseFloat(driver.hourlyRate).toFixed(0)}/hr
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Daily</p>
            <p className="font-semibold" data-testid={`text-daily-rate-${driver.id}`}>
              ₹{parseFloat(driver.dailyRate).toFixed(0)}/day
            </p>
          </div>
        </div>
        
        {driver.available && (
          <Badge variant="default" className="w-full justify-center" data-testid={`badge-available-${driver.id}`}>
            Available Now
          </Badge>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Link href={`/drivers/${driver.id}`} className="flex-1">
          <Button variant="outline" className="w-full" data-testid={`button-view-profile-${driver.id}`}>
            View Profile
          </Button>
        </Link>
        <Link href={`/book/${driver.id}`} className="flex-1">
          <Button className="w-full" data-testid={`button-book-now-${driver.id}`}>
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
