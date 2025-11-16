# DriveEase Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing from Uber's clarity and trust-building patterns, combined with Airbnb's profile presentation and booking flow sophistication. This platform requires professional credibility balanced with approachable warmth—users are trusting strangers with their vehicles.

**Core Principles**:
- Trust-first design: Verification badges, credentials, and ratings prominently displayed
- Friction-free booking: Clear pricing, instant availability visibility
- Driver-centric presentation: Professional headshots and detailed profiles take center stage
- Map-integrated experience: Location awareness throughout the journey

## Typography System

**Font Stack**: Inter (via Google Fonts CDN) for its professional, readable characteristics
- **Headings**: 
  - H1: text-4xl md:text-5xl font-bold (Hero sections, main CTA)
  - H2: text-3xl md:text-4xl font-semibold (Section headers)
  - H3: text-xl md:text-2xl font-semibold (Driver names, card titles)
- **Body**: text-base md:text-lg (General content, descriptions)
- **Small/Meta**: text-sm (Ratings, timestamps, labels)
- **Legal/Fine Print**: text-xs (Terms, conditions)

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Tight spacing: p-2, gap-2 (within compact elements)
- Standard spacing: p-4, gap-4, mb-6 (cards, form fields)
- Section spacing: py-12 md:py-16 lg:py-20 (between major sections)
- Large spacing: py-16 md:py-24 (hero sections, emphasis areas)

**Container Strategy**:
- Full viewport: Map views, hero backgrounds
- Constrained content: max-w-7xl mx-auto px-4 md:px-6 (main content)
- Narrow content: max-w-3xl mx-auto (booking forms, driver details)

## Component Library

### Navigation
- Sticky header with logo left, navigation center, "Become a Driver" + "Sign In" buttons right
- Mobile: Hamburger menu with slide-in drawer
- Include trust indicator in header: "50,000+ verified drivers"

### Hero Section
- **Layout**: Split hero—left side with headline + search/booking initiator, right side with large professional image showing driver with client vehicle
- **Image**: Professional photograph of smiling driver in crisp uniform standing beside luxury vehicle, establishing trust and service quality
- **Height**: min-h-[600px] md:min-h-[700px]
- **CTA**: Large search input with location + "Find Drivers" button, blur backdrop treatment (backdrop-blur-lg bg-white/90)

### Driver Profile Cards
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Card structure:
  - Professional headshot (circular, bordered)
  - Name + verification badge (Heroicons check-badge)
  - Star rating with review count
  - Years of experience, vehicle types handled
  - Hourly/daily rate preview
  - "View Profile" button
- Hover state: Subtle lift with shadow transition

### Booking Interface
- Step indicator: Show "Select Driver → Choose Duration → Confirm Booking"
- Duration selector: Large button grid for Hourly/Daily/Weekly/Monthly with dynamic pricing
- Calendar component: Full-width availability view with color-coded status
- Price breakdown card: Sticky sidebar showing itemized costs
- Driver info card: Always visible during booking flow

### Map Integration
- Full-width section showing driver locations with custom markers
- Filters sidebar: Available now, rating threshold, price range
- Driver mini-cards on hover/click of map markers
- "Drivers near you" count indicator

### Reviews/Ratings Section
- Star breakdown graph (5-star to 1-star distribution)
- Featured reviews: Cards with reviewer name, date, rating, detailed feedback
- "Most helpful" sorting
- Driver response display if applicable

### Trust Elements
- Verification badge system throughout
- Background check indicator
- License validation display
- Insurance coverage information
- Safety features highlight section

### Footer
- Multi-column layout: Company info, Services (hourly/daily/weekly/monthly), Support, Legal
- Newsletter signup with email input
- Social proof: "Join 50,000+ verified drivers" or "500,000+ rides completed"
- Trust badges: Payment security, background checks, insurance coverage icons

## Images

**Hero Image**: Professional photograph—uniformed driver (mid-30s, friendly, professional) standing beside premium vehicle (BMW/Mercedes), daytime setting, clean background. Driver should look directly at camera with confident, welcoming expression. Image placement: right 50% of hero section on desktop, background on mobile.

**Driver Profile Photos**: Circular headshots, professional attire, neutral backgrounds—establishing trust and professionalism. Each card requires one image.

**How It Works Section**: Three supporting images showing (1) Driver verification process, (2) Customer booking on phone, (3) Happy customer with driver. Use in 3-column feature grid.

**Trust Section**: Background image showing diverse group of professional drivers in company polo shirts, slightly blurred to allow text overlay.

No decorative illustrations—stick to authentic photography that builds credibility and showcases real service quality.