import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Drivers from "@/pages/Drivers";
import DriverDetail from "@/pages/DriverDetail";
import BookDriver from "@/pages/BookDriver";
import HowItWorks from "@/pages/HowItWorks";
import BookingHistory from "@/pages/BookingHistory";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/drivers" component={Drivers} />
      <Route path="/drivers/:id" component={DriverDetail} />
      <Route path="/book/:id" component={BookDriver} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/bookings" component={BookingHistory} />
      <Route path="/messages/:bookingId" component={Messages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
