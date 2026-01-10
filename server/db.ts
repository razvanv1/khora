import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { desc, sql, and, gte } from "drizzle-orm";
import { 
  subscribers, 
  InsertSubscriber, 
  Subscriber,
  emailLogs,
  InsertEmailLog,
  adminNotifications,
  InsertAdminNotification,
  userProfiles,
  InsertUserProfile
} from "../drizzle/schema";

// ============================================
// SUBSCRIBERS
// ============================================

export async function createSubscriber(data: InsertSubscriber): Promise<Subscriber | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create subscriber: database not available");
    return null;
  }

  try {
    await db.insert(subscribers).values(data);
    const result = await db.select().from(subscribers).where(eq(subscribers.email, data.email)).limit(1);
    return result[0] || null;
  } catch (error: any) {
    // Handle duplicate email
    if (error.code === 'ER_DUP_ENTRY') {
      // Update existing subscriber
      await db.update(subscribers)
        .set({
          name: data.name,
          gender: data.gender,
          age: data.age,
          weight: data.weight,
          height: data.height,
          activityLevel: data.activityLevel,
          goal: data.goal,
          dietaryStyle: data.dietaryStyle,
          calculatedMetrics: data.calculatedMetrics,
          mealPreferences: data.mealPreferences,
          allergies: data.allergies,
        })
        .where(eq(subscribers.email, data.email));
      
      const result = await db.select().from(subscribers).where(eq(subscribers.email, data.email)).limit(1);
      return result[0] || null;
    }
    console.error("[Database] Failed to create subscriber:", error);
    throw error;
  }
}

export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
  return result[0] || null;
}

export async function getAllSubscribers(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(subscribers).orderBy(desc(subscribers.createdAt)).limit(limit).offset(offset);
}

export async function getSubscriberCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const result = await db.select({ count: sql<number>`count(*)` }).from(subscribers);
  return result[0]?.count || 0;
}

export async function updateSubscriberWelcomeEmailSent(email: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(subscribers)
    .set({ welcomeEmailSent: true })
    .where(eq(subscribers.email, email));
}

// ============================================
// EMAIL LOGS
// ============================================

export async function createEmailLog(data: InsertEmailLog): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(emailLogs).values(data);
}

export async function updateEmailLogStatus(id: number, status: 'sent' | 'failed' | 'bounced', errorMessage?: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(emailLogs)
    .set({ 
      status, 
      errorMessage: errorMessage || null,
      sentAt: status === 'sent' ? new Date() : null
    })
    .where(eq(emailLogs.id, id));
}

export async function getRecentEmailLogs(limit = 50) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(emailLogs).orderBy(desc(emailLogs.createdAt)).limit(limit);
}

// ============================================
// ADMIN NOTIFICATIONS
// ============================================

export async function createAdminNotification(data: InsertAdminNotification): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(adminNotifications).values(data);
}

export async function getUnreadAdminNotifications() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(adminNotifications)
    .where(eq(adminNotifications.isRead, false))
    .orderBy(desc(adminNotifications.createdAt))
    .limit(50);
}

export async function markNotificationAsRead(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(adminNotifications)
    .set({ isRead: true })
    .where(eq(adminNotifications.id, id));
}

export async function markAllNotificationsAsRead(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(adminNotifications)
    .set({ isRead: true })
    .where(eq(adminNotifications.isRead, false));
}

// ============================================
// STATISTICS
// ============================================

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return {
    totalSubscribers: 0,
    totalUsers: 0,
    todaySubscribers: 0,
    todayUsers: 0,
    emailsSentToday: 0,
    unreadNotifications: 0
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [subscriberCount] = await db.select({ count: sql<number>`count(*)` }).from(subscribers);
  const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
  const [todaySubscriberCount] = await db.select({ count: sql<number>`count(*)` })
    .from(subscribers)
    .where(gte(subscribers.createdAt, today));
  const [todayUserCount] = await db.select({ count: sql<number>`count(*)` })
    .from(users)
    .where(gte(users.createdAt, today));
  const [emailCount] = await db.select({ count: sql<number>`count(*)` })
    .from(emailLogs)
    .where(and(gte(emailLogs.createdAt, today), eq(emailLogs.status, 'sent')));
  const [notificationCount] = await db.select({ count: sql<number>`count(*)` })
    .from(adminNotifications)
    .where(eq(adminNotifications.isRead, false));

  return {
    totalSubscribers: subscriberCount?.count || 0,
    totalUsers: userCount?.count || 0,
    todaySubscribers: todaySubscriberCount?.count || 0,
    todayUsers: todayUserCount?.count || 0,
    emailsSentToday: emailCount?.count || 0,
    unreadNotifications: notificationCount?.count || 0
  };
}

// ============================================
// USER PROFILES
// ============================================

export async function upsertUserProfile(userId: number, data: Partial<InsertUserProfile>): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const existing = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  
  if (existing.length > 0) {
    await db.update(userProfiles).set(data).where(eq(userProfiles.userId, userId));
  } else {
    await db.insert(userProfiles).values({ userId, ...data });
  }
}

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result[0] || null;
}

// ============================================
// ALL USERS (for admin)
// ============================================

export async function getAllUsers(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(users).orderBy(desc(users.createdAt)).limit(limit).offset(offset);
}
