import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md -ml-3">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">DriveEase</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" data-testid="link-nav-home">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                className="font-medium"
              >
                Home
              </Button>
            </Link>
            <Link href="/drivers" data-testid="link-nav-drivers">
              <Button
                variant={location === "/drivers" ? "secondary" : "ghost"}
                className="font-medium"
              >
                Find Drivers
              </Button>
            </Link>
            {isAuthenticated && (
              <Link href="/bookings" data-testid="link-nav-bookings">
                <Button
                  variant={location === "/bookings" ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  My Bookings
                </Button>
              </Link>
            )}
            <Link href="/how-it-works" data-testid="link-nav-how-it-works">
              <Button
                variant={location === "/how-it-works" ? "secondary" : "ghost"}
                className="font-medium"
              >
                How It Works
              </Button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" className="font-medium" data-testid="button-become-driver">
              Become a Driver
            </Button>
            {isAuthenticated ? (
              <Button variant="default" onClick={() => window.location.href = '/api/logout'} data-testid="button-logout">
                Sign Out
              </Button>
            ) : (
              <Button variant="default" onClick={() => window.location.href = '/api/login'} data-testid="button-sign-in">
                Sign In
              </Button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <Link href="/" data-testid="link-mobile-home">
                <Button
                  variant={location === "/" ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Button>
              </Link>
              <Link href="/drivers" data-testid="link-mobile-drivers">
                <Button
                  variant={location === "/drivers" ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Drivers
                </Button>
              </Link>
              <Link href="/how-it-works" data-testid="link-mobile-how-it-works">
                <Button
                  variant={location === "/how-it-works" ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Button>
              </Link>
              <div className="pt-2 mt-2 border-t flex flex-col gap-2">
                <Button variant="ghost" className="w-full font-medium" data-testid="button-mobile-become-driver">
                  Become a Driver
                </Button>
                <Button variant="default" className="w-full" onClick={() => window.location.href = '/api/login'} data-testid="button-mobile-sign-in">
                  Sign In
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      <div className="bg-primary text-primary-foreground py-2 text-center">
        <p className="text-sm font-medium" data-testid="text-trust-indicator">
          ✓ 50,000+ verified drivers • 500,000+ rides completed
        </p>
      </div>
    </header>
  );
}
