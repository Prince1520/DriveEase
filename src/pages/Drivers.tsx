import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DriverCard } from "@/components/DriverCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Driver } from "@shared/schema";
import { useState } from "react";

export default function Drivers() {
  const [searchLocation, setSearchLocation] = useState("");
  const [minRating, setMinRating] = useState([0]);
  const [maxPrice, setMaxPrice] = useState([2000]);
  const [availability, setAvailability] = useState("all");

  const { data: drivers, isLoading } = useQuery<Driver[]>({
    queryKey: ["/api/drivers"],
  });

  const filteredDrivers = drivers?.filter((driver) => {
    const rating = parseFloat(driver.rating);
    const hourlyRate = parseFloat(driver.hourlyRate);
    
    if (minRating[0] > 0 && rating < minRating[0]) return false;
    if (hourlyRate > maxPrice[0]) return false;
    if (availability === "available" && !driver.available) return false;
    if (searchLocation && !driver.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
            Find Your Perfect Driver
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {filteredDrivers?.length || 0} verified drivers available in your area
          </p>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter location..."
                    className="pl-10"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    data-testid="input-search-location"
                  />
                </div>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="w-full md:w-48" data-testid="select-availability">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Drivers</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <SlidersHorizontal className="w-5 h-5" />
                      <h2 className="font-semibold">Filters</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          Minimum Rating
                        </label>
                        <Slider
                          value={minRating}
                          onValueChange={setMinRating}
                          max={5}
                          step={0.5}
                          className="mb-2"
                          data-testid="slider-min-rating"
                        />
                        <p className="text-sm text-muted-foreground" data-testid="text-rating-value">
                          {minRating[0].toFixed(1)}+ stars
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          Max Hourly Rate
                        </label>
                        <Slider
                          value={maxPrice}
                          onValueChange={setMaxPrice}
                          max={2000}
                          step={100}
                          className="mb-2"
                          data-testid="slider-max-price"
                        />
                        <p className="text-sm text-muted-foreground" data-testid="text-price-value">
                          Up to ₹{maxPrice[0]}/hour
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setMinRating([0]);
                      setMaxPrice([2000]);
                      setAvailability("all");
                      setSearchLocation("");
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Skeleton className="w-16 h-16 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-16 w-full mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredDrivers && filteredDrivers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDrivers.map((driver) => (
                    <DriverCard key={driver.id} driver={driver} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2" data-testid="text-no-results">
                      No drivers found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search in a different location
                    </p>
                    <Button
                      onClick={() => {
                        setMinRating([0]);
                        setMaxPrice([200]);
                        setAvailability("all");
                        setSearchLocation("");
                      }}
                      data-testid="button-reset-search"
                    >
                      Reset Search
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
