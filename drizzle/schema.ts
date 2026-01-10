import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Email subscribers from onboarding (before OAuth login)
 * Stores emails collected during the onboarding quiz
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  source: varchar("source", { length: 64 }).default("onboarding"),
  
  // Onboarding quiz data
  gender: varchar("gender", { length: 16 }),
  age: int("age"),
  weight: int("weight"),
  height: int("height"),
  activityLevel: varchar("activityLevel", { length: 32 }),
  goal: varchar("goal", { length: 64 }),
  dietaryStyle: varchar("dietaryStyle", { length: 64 }),
  
  // Calculated metrics stored as JSON
  calculatedMetrics: json("calculatedMetrics"),
  
  // Preferences stored as JSON
  mealPreferences: json("mealPreferences"),
  allergies: json("allergies"),
  
  // Email preferences
  wantsNewsletter: boolean("wantsNewsletter").default(true),
  wantsRecipes: boolean("wantsRecipes").default(true),
  wantsTips: boolean("wantsTips").default(true),
  
  // Status
  emailVerified: boolean("emailVerified").default(false),
  welcomeEmailSent: boolean("welcomeEmailSent").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

/**
 * User profiles - extended data for logged-in users
 * Links to users table via userId
 */
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  // Physical data
  gender: varchar("gender", { length: 16 }),
  age: int("age"),
  weight: int("weight"),
  height: int("height"),
  activityLevel: varchar("activityLevel", { length: 32 }),
  goal: varchar("goal", { length: 64 }),
  dietaryStyle: varchar("dietaryStyle", { length: 64 }),
  
  // Calculated metrics
  calculatedMetrics: json("calculatedMetrics"),
  
  // Preferences
  mealPreferences: json("mealPreferences"),
  allergies: json("allergies"),
  
  // Tracking data
  hydrationHistory: json("hydrationHistory"),
  supplementHistory: json("supplementHistory"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * Email logs - track all emails sent
 */
export const emailLogs = mysqlTable("email_logs", {
  id: int("id").autoincrement().primaryKey(),
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  recipientName: varchar("recipientName", { length: 255 }),
  emailType: varchar("emailType", { length: 64 }).notNull(), // welcome, recipe, tip, newsletter
  subject: varchar("subject", { length: 500 }),
  status: mysqlEnum("status", ["pending", "sent", "failed", "bounced"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;

/**
 * Admin notifications - messages for admin dashboard
 */
export const adminNotifications = mysqlTable("admin_notifications", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 64 }).notNull(), // new_subscriber, new_user, error
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  data: json("data"),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdminNotification = typeof adminNotifications.$inferSelect;
export type InsertAdminNotification = typeof adminNotifications.$inferInsert;

/**
 * Site statistics - daily aggregated stats
 */
export const siteStats = mysqlTable("site_stats", {
  id: int("id").autoincrement().primaryKey(),
  date: varchar("date", { length: 10 }).notNull().unique(), // YYYY-MM-DD
  totalSubscribers: int("totalSubscribers").default(0),
  newSubscribers: int("newSubscribers").default(0),
  totalUsers: int("totalUsers").default(0),
  newUsers: int("newUsers").default(0),
  emailsSent: int("emailsSent").default(0),
  pageViews: int("pageViews").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteStat = typeof siteStats.$inferSelect;
export type InsertSiteStat = typeof siteStats.$inferInsert;
