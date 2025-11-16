# DriveEase

An on-demand platform for hiring verified drivers for personal vehicles with flexible booking durations.

## Overview

DriveEase is like Uber, but instead of booking a cab, you book a professional driver for your own car. Users can hire background-checked, licensed drivers by the hour, day, week, or month.

## Recent Changes

**November 15, 2025** - In-App Messaging Complete ✅
- **Real-Time Chat**: WebSocket-powered messaging between customers and drivers
- **Messages Table**: Added schema with bookingId, senderId, senderType, senderName, message, read status
- **WebSocket Server**: Live bidirectional communication on /ws endpoint
- **Chat Interface**: Modern messaging UI with real-time updates and connection status
- **Message History**: Persistent message storage with timestamps
- **Integration**: "Message" buttons on booking cards for easy access

**Previous Session** - Authentication & Booking History Complete ✅
- **Replit Auth Integration**: Implemented full OIDC authentication supporting Google, GitHub, Apple, and email/password login
- **Session Management**: PostgreSQL-backed sessions with environment-aware security (HTTP for dev, HTTPS for prod)
- **Users Table**: Added id, email, firstName, lastName, profileImageUrl, createdAt, updatedAt
- **Booking History Page**: User-specific booking view with upcoming/past trips, status badges, and detailed trip information
- **Protected Routes**: /api/bookings GET requires authentication and returns only user's bookings
- **Auth-Aware UI**: Header shows "My Bookings" link and Sign Out button for authenticated users
- **User Association**: Bookings automatically linked to logged-in users via userId foreign key

**Previous Progress**
- Implemented complete schema for drivers, bookings, and reviews
- Built beautiful Uber-inspired UI with professional design
- Created all frontend pages: Home, Drivers Browse, Driver Detail, Booking, How It Works
- Integrated PostgreSQL database with Drizzle ORM
- Implemented all REST API endpoints with proper validation
- Added seed data with 6 professional drivers and 9 reviews

## Project Architecture

### Frontend
- **React** with TypeScript for component-based UI
- **Wouter** for client-side routing
- **Tailwind CSS** + **Shadcn UI** for beautiful, responsive design
- **TanStack Query** for data fetching and caching
- **React Hook Form** + **Zod** for form validation

### Backend
- **Express.js** REST API
- **PostgreSQL** database via Neon
- **Drizzle ORM** for type-safe database operations
- **Zod** for request validation

### Pages
- `/` - Landing page with hero, features, and CTAs
- `/drivers` - Browse all drivers with filters
- `/drivers/:id` - Detailed driver profile with reviews
- `/book/:id` - Booking interface with duration selector and price calculation
- `/bookings` - User's booking history with upcoming and past trips (requires auth)
- `/messages/:bookingId` - Real-time chat interface for communicating with drivers (requires auth)
- `/how-it-works` - Informational page about the service

## Database Schema

### Drivers
- Profile information (name, photo, bio, location)
- Ratings and review counts
- Experience and vehicle types
- Pricing for hourly, daily, weekly, monthly
- Verification status (background check, license, insurance)
- Availability and location coordinates

### Users
- OIDC authentication via Replit Auth
- Profile information (email, name, photo)
- Session tracking with PostgreSQL

### Bookings
- Customer information
- Driver assignment
- User association (userId foreign key, nullable for guest bookings)
- Duration type and length
- Start date and pickup location
- Total price and booking status

### Sessions
- PostgreSQL-backed session storage
- Session ID, user data, and expiration tracking

### Messages
- Real-time chat messages for bookings
- Sender information (ID, type, name)
- Message content and timestamps
- Read status tracking
- Linked to bookings

### Reviews
- Customer feedback for drivers
- Rating (1-5 stars)
- Comments and helpful count
- Linked to bookings

## Design System

- **Primary Color**: Blue (#0066FF) - trust and professionalism
- **Typography**: Inter font family for clean, modern look
- **Components**: Shadcn UI for consistent, accessible components
- **Responsive**: Mobile-first design with breakpoints

## API Endpoints

### Drivers
- `GET /api/drivers` - List all drivers
- `GET /api/drivers/:id` - Get driver by ID
- `POST /api/drivers` - Create new driver

### Bookings
- `GET /api/bookings` - Get user's bookings (requires authentication)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking (guest or authenticated)

### Reviews
- `GET /api/reviews/:driverId` - Get reviews for driver
- `POST /api/reviews` - Create new review

### Authentication
- `GET /api/login` - Initiate OIDC login flow
- `GET /api/callback` - OIDC callback handler
- `GET /api/logout` - Destroy session and log out
- `GET /api/auth/user` - Get current user info

### Messages
- `GET /api/messages/:bookingId` - Get all messages for a booking
- `POST /api/messages` - Send a new message
- `WS /ws` - WebSocket endpoint for real-time messaging

## Running the Project

The application runs with `npm run dev` which starts both the Express server and Vite frontend on the same port.

## Seed Data

Run `tsx server/seed.ts` to populate the database with:
- 6 professional drivers across major US cities (New York, Los Angeles, Chicago, Houston, Miami, San Francisco)
- 9 customer reviews with 4-5 star ratings
- Realistic pricing and availability data

## Known Limitations (Future Enhancements)

- **Messaging Security**: WebSocket connections need session-based authentication; currently REST endpoints are protected but WebSocket handshake trusts client-supplied data
- **Driver Messaging Access**: Messaging currently supports customer-side only; driver authentication and dual-role access needed for full driver-customer chat
- **Cache Optimization**: React Query cache keys could be user-scoped (['/api/bookings', 'me']) and invalidated on logout for better isolation
- **Real-time availability**: Static data - consider websockets for live driver status
- **Map integration**: Placeholder - integrate Google Maps API for live driver locations
- **Payment processing**: Not implemented - add Stripe for secure payments
- **Notifications**: Add email/SMS confirmations for bookings
- **Driver Verification**: Admin interface for document review and approval workflow
- **GPS Tracking**: Live driver location updates during active trips with map visualization
- **Receipt Generation**: Auto-generated PDF receipts for completed bookings

## Current Status

✅ **Core Features Complete**
- Replit Auth OIDC integration with multiple providers
- Session management with PostgreSQL
- User-specific booking history page
- Protected API endpoints
- Real-time in-app messaging with WebSocket

🚧 **In Progress**
- Live GPS tracking for active trips

📋 **Planned Features**
- Stripe payment integration
- Driver verification system
- Receipt generation
