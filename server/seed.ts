import { db } from "./db";
import { drivers, reviews } from "@shared/schema";

const driverPhotos = [
  "/attached_assets/generated_images/Driver_profile_headshot_male_2cf58deb.png",
  "/attached_assets/generated_images/Driver_profile_headshot_female_eaf3f415.png",
  "/attached_assets/generated_images/Senior_driver_headshot_male_6cde45cd.png",
  "/attached_assets/generated_images/Professional_driver_headshot_female_24ebe77d.png",
];

const mockDrivers = [
  {
    name: "Rajesh Kumar",
    photo: driverPhotos[0],
    rating: "4.9",
    reviewCount: 247,
    yearsExperience: 8,
    vehicleTypes: ["Luxury Sedan", "SUV", "Sports Car"],
    hourlyRate: "700.00",
    dailyRate: "5000.00",
    weeklyRate: "28000.00",
    monthlyRate: "95000.00",
    bio: "Professional chauffeur with 8 years of experience driving luxury vehicles. Specialized in executive transportation and special events. Excellent knowledge of Mumbai routes and traffic patterns.",
    verified: true,
    backgroundCheck: true,
    licenseVerified: true,
    insuranceCoverage: true,
    available: true,
    latitude: "19.0760",
    longitude: "72.8777",
    location: "Mumbai, Maharashtra",
  },
  {
    name: "Priya Sharma",
    photo: driverPhotos[1],
    rating: "4.8",
    reviewCount: 189,
    yearsExperience: 6,
    vehicleTypes: ["Sedan", "SUV", "Minivan"],
    hourlyRate: "600.00",
    dailyRate: "4200.00",
    weeklyRate: "25000.00",
    monthlyRate: "85000.00",
    bio: "Experienced driver specializing in family transportation and long-distance trips. Patient, punctual, and safety-focused. Fluent in Hindi, English and Gujarati.",
    verified: true,
    backgroundCheck: true,
    licenseVerified: true,
    insuranceCoverage: true,
    available: true,
    latitude: "28.7041",
    longitude: "77.1025",
    location: "Delhi, NCR",
  },
  {
    name: "Suresh Patel",
    photo: driverPhotos[2],
    rating: "5.0",
    reviewCount: 156,
    yearsExperience: 12,
    vehicleTypes: ["Luxury Sedan", "SUV", "Van"],
    hourlyRate: "800.00",
    dailyRate: "5500.00",
    weeklyRate: "30000.00",
    monthlyRate: "100000.00",
    bio: "Senior professional driver with over 12 years of experience. Former executive chauffeur with impeccable safety record. Specialized in VIP transportation and corporate events.",
    verified: true,
    backgroundCheck: true,
    licenseVerified: true,
    insuranceCoverage: true,
    available: true,
    latitude: "12.9716",
    longitude: "77.5946",
    location: "Bangalore, Karnataka",
  },
  {
    name: "Meera Reddy",
    photo: driverPhotos[3],
    rating: "4.9",
    reviewCount: 203,
    yearsExperience: 7,
    vehicleTypes: ["Sedan", "SUV", "Sports Car"],
    hourlyRate: "650.00",
    dailyRate: "4500.00",
    weeklyRate: "27000.00",
    monthlyRate: "90000.00",
    bio: "Professional driver with extensive experience in both personal and corporate transportation. Known for excellent customer service and attention to detail. Defensive driving certified.",
    verified: true,
    backgroundCheck: true,
    licenseVerified: true,
    insuranceCoverage: true,
    available: false,
    latitude: "17.3850",
    longitude: "78.4867",
    location: "Hyderabad, Telangana",
  },
  {
    name: "Amit Singh",
    photo: driverPhotos[0],
    rating: "4.7",
    reviewCount: 134,
    yearsExperience: 5,
    vehicleTypes: ["Sedan", "SUV"],
    hourlyRate: "550.00",
    dailyRate: "3800.00",
    weeklyRate: "23000.00",
    monthlyRate: "80000.00",
    bio: "Reliable and friendly driver with 5 years of experience. Excellent navigation skills and always on time. Great for daily commutes and airport transfers.",
    verified: true,
    backgroundCheck: true,
    licenseVerified: true,
    insuranceCoverage: true,
    available: true,
    latitude: "22.5726",
    longitude: "88.3639",
    location: "Kolkata, West Bengal",
  },
  {
    name: "Lakshmi Iyer",
    photo: driverPhotos[1],
    rating: "4.9",
    reviewCount: 178,
    yearsExperience: 9,
    vehicleTypes: ["Luxury Sedan", "SUV", "Minivan"],
    hourlyRate: "720.00",
    dailyRate: "4800.00",
    weeklyRate: "28500.00",
    monthlyRate: "92000.00",
    bio: "Experienced professional driver specializing in luxury vehicle operations. Excellent record of customer satisfaction. Perfect for business executives and special occasions.",
    verified: true,
    backgroundCheck: true,
    licenseVerified: true,
    insuranceCoverage: true,
    available: true,
    latitude: "13.0827",
    longitude: "80.2707",
    location: "Chennai, Tamil Nadu",
  },
];

const mockReviews = [
  {
    customerName: "Arjun Kapoor",
    rating: 5,
    comment: "Rajesh was absolutely fantastic! Punctual, professional, and extremely courteous. He navigated through heavy Mumbai traffic with ease and made our wedding day stress-free. Highly recommend!",
  },
  {
    customerName: "Neha Gupta",
    rating: 5,
    comment: "Best driver experience I've had! Rajesh knows all the shortcuts and got us to the airport with plenty of time to spare. Will definitely book again for our next trip.",
  },
  {
    customerName: "Vikram Malhotra",
    rating: 4,
    comment: "Great service overall. Rajesh was very professional and the car was spotless. Only minor issue was he arrived 5 minutes late, but he communicated well and made up for it during the ride.",
  },
  {
    customerName: "Kavita Menon",
    rating: 5,
    comment: "Priya was wonderful! She was so patient with my elderly mother and helped with all our bags. Very smooth driving and great conversation. A true professional!",
  },
  {
    customerName: "Rohan Desai",
    rating: 5,
    comment: "Used Priya's services for a week-long business trip. She was always on time, knew the best routes, and was very accommodating to last-minute schedule changes. Excellent service!",
  },
  {
    customerName: "Anjali Nair",
    rating: 4,
    comment: "Priya did a great job driving us around Delhi. Very friendly and knowledgeable about local attractions. Would have given 5 stars but she was a bit chatty when we needed quiet time.",
  },
  {
    customerName: "Aditya Verma",
    rating: 5,
    comment: "Suresh is simply the best! 12 years of experience really shows. Smooth driving, impeccable timing, and he treated my luxury car with utmost care. Worth every rupee!",
  },
  {
    customerName: "Deepa Krishnan",
    rating: 5,
    comment: "Hired Suresh for our month-long stay in Bangalore and couldn't be happier. He's punctual, professional, and has excellent judgment. Feels very safe with him behind the wheel.",
  },
  {
    customerName: "Karthik Ramesh",
    rating: 5,
    comment: "Outstanding service from Suresh! He went above and beyond, even helping with our luggage and giving great recommendations for restaurants. True professional!",
  },
];

async function seed() {
  try {
    console.log("Seeding database...");

    const insertedDrivers = await db.insert(drivers).values(mockDrivers).returning();
    console.log(`Inserted ${insertedDrivers.length} drivers`);

    const reviewsWithDriverIds = [
      { ...mockReviews[0], driverId: insertedDrivers[0].id, bookingId: null },
      { ...mockReviews[1], driverId: insertedDrivers[0].id, bookingId: null },
      { ...mockReviews[2], driverId: insertedDrivers[0].id, bookingId: null },
      { ...mockReviews[3], driverId: insertedDrivers[1].id, bookingId: null },
      { ...mockReviews[4], driverId: insertedDrivers[1].id, bookingId: null },
      { ...mockReviews[5], driverId: insertedDrivers[1].id, bookingId: null },
      { ...mockReviews[6], driverId: insertedDrivers[2].id, bookingId: null },
      { ...mockReviews[7], driverId: insertedDrivers[2].id, bookingId: null },
      { ...mockReviews[8], driverId: insertedDrivers[2].id, bookingId: null },
    ];

    const insertedReviews = await db.insert(reviews).values(reviewsWithDriverIds).returning();
    console.log(`Inserted ${insertedReviews.length} reviews`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
