import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Driver schema
export const drivers = pgTable("drivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull().default(0),
  yearsExperience: integer("years_experience").notNull(),
  vehicleTypes: text("vehicle_types").array().notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  dailyRate: decimal("daily_rate", { precision: 10, scale: 2 }).notNull(),
  weeklyRate: decimal("weekly_rate", { precision: 10, scale: 2 }).notNull(),
  monthlyRate: decimal("monthly_rate", { precision: 10, scale: 2 }).notNull(),
  bio: text("bio").notNull(),
  verified: boolean("verified").notNull().default(true),
  backgroundCheck: boolean("background_check").notNull().default(true),
  licenseVerified: boolean("license_verified").notNull().default(true),
  insuranceCoverage: boolean("insurance_coverage").notNull().default(true),
  available: boolean("available").notNull().default(true),
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  location: text("location").notNull(),
});

export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
});

export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;

// Booking schema
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  driverId: varchar("driver_id").notNull().references(() => drivers.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  durationType: text("duration_type").notNull(), // hourly, daily, weekly, monthly
  duration: integer("duration").notNull(), // number of hours/days/weeks/months
  startDate: timestamp("start_date").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  pickupLocation: text("pickup_location").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("confirmed"), // confirmed, completed, cancelled
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  startDate: z.string().or(z.date()).transform((val) => new Date(val)),
  notes: z.string().optional().nullable(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Review schema
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  driverId: varchar("driver_id").notNull().references(() => drivers.id),
  bookingId: varchar("booking_id").references(() => bookings.id),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  helpful: integer("helpful").notNull().default(0),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  helpful: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Session storage table (REQUIRED for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User schema (REQUIRED for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Messages schema for in-app chat
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingId: varchar("booking_id").notNull().references(() => bookings.id),
  senderId: varchar("sender_id").notNull(),
  senderType: text("sender_type").notNull(), // 'customer' or 'driver'
  senderName: text("sender_name").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  read: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
