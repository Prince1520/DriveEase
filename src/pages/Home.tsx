import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Shield, Clock, Award, MapPin, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Hero_driver_with_luxury_car_3da8df91.png";
import verificationImage from "@assets/generated_images/Driver_verification_documents_process_a2feba7e.png";
import bookingImage from "@assets/generated_images/Customer_booking_on_phone_54edb6d9.png";
import teamImage from "@assets/generated_images/Diverse_driver_team_photo_04aa8adc.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional driver with luxury vehicle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              Hire a Verified Driver for Your Car
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
              Professional, background-checked drivers available by the hour, day, week, or month. Your car, their expertise.
            </p>
            
            <Card className="backdrop-blur-lg bg-white/95 border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter your location"
                      className="pl-10 h-12"
                      data-testid="input-location"
                    />
                  </div>
                  <Link href="/drivers">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8" data-testid="button-find-drivers">
                      <Search className="w-5 h-5 mr-2" />
                      Find Drivers
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-wrap gap-4 mt-8 text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Background Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Highly Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-how-it-works-title">
              How DriveEase Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book a professional driver in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4">
                  <img
                    src={verificationImage}
                    alt="Driver verification process"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold" data-testid="text-step-1-title">
                    Browse Verified Drivers
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  View profiles of background-checked, licensed drivers in your area. See ratings, experience, and availability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4">
                  <img
                    src={bookingImage}
                    alt="Customer booking on phone"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold" data-testid="text-step-2-title">
                    Choose Your Duration
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Select hourly, daily, weekly, or monthly service based on your needs. Get instant pricing and availability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-md flex items-center justify-center">
                    <CheckCircle className="w-24 h-24 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold" data-testid="text-step-3-title">
                    Confirm & Relax
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Your driver arrives on time. Sit back and enjoy the ride while our professional takes the wheel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-why-choose-title">
              Why Choose DriveEase?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The safest, most reliable way to hire a driver for your personal vehicle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2" data-testid="text-feature-verified-title">
                  Fully Verified
                </h3>
                <p className="text-sm text-muted-foreground">
                  Background checks, license verification, and insurance coverage on all drivers
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2" data-testid="text-feature-flexible-title">
                  Flexible Booking
                </h3>
                <p className="text-sm text-muted-foreground">
                  Book by the hour, day, week, or month. Change plans easily with 24hr notice
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2" data-testid="text-feature-rated-title">
                  Highly Rated
                </h3>
                <p className="text-sm text-muted-foreground">
                  Read verified reviews from real customers. 4.8+ average rating across all drivers
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2" data-testid="text-feature-nationwide-title">
                  Nationwide Coverage
                </h3>
                <p className="text-sm text-muted-foreground">
                  50,000+ drivers across major cities. Find professional drivers wherever you are
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src={teamImage}
            alt="Professional driver team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="text-cta-title">
            Join 500,000+ Satisfied Customers
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Experience the convenience of having a professional driver for your own vehicle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/drivers">
              <Button size="lg" className="px-8" data-testid="button-cta-find-driver">
                Find a Driver Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 backdrop-blur-lg bg-white/90 hover:bg-white" data-testid="button-cta-become-driver">
              Become a Driver
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
