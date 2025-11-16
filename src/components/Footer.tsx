import { MapPin, Shield, CreditCard, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">DriveEase</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Professional drivers for your personal vehicle. Book by the hour, day, week, or month.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="text-sm"
                data-testid="input-newsletter-email"
              />
              <Button size="sm" data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-hourly">
                  Hourly Drivers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-daily">
                  Daily Drivers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-weekly">
                  Weekly Drivers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-monthly">
                  Monthly Drivers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-safety">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-careers">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-cookies">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              <div>
                <p className="font-semibold text-sm" data-testid="text-badge-background">Background Checks</p>
                <p className="text-xs text-muted-foreground">All drivers verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-10 h-10 text-primary" />
              <div>
                <p className="font-semibold text-sm" data-testid="text-badge-payment">Secure Payments</p>
                <p className="text-xs text-muted-foreground">256-bit encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              <div>
                <p className="font-semibold text-sm" data-testid="text-badge-insurance">Insurance Coverage</p>
                <p className="text-xs text-muted-foreground">Full protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-10 h-10 text-primary" />
              <div>
                <p className="font-semibold text-sm" data-testid="text-badge-community">Trusted Community</p>
                <p className="text-xs text-muted-foreground">500,000+ rides</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground" data-testid="text-copyright">
            © 2025 DriveEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
