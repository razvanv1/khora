import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { 
  createSubscriber, 
  getSubscriberByEmail, 
  getAllSubscribers,
  getSubscriberCount,
  updateSubscriberWelcomeEmailSent,
  createEmailLog,
  createAdminNotification,
  getUnreadAdminNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getDashboardStats,
  getAllUsers,
  getRecentEmailLogs,
  upsertUserProfile,
  getUserProfile
} from "./db";
import { notifyOwner } from "./_core/notification";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Subscriber routes (public - for onboarding)
  subscriber: router({
    create: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        gender: z.string().optional(),
        age: z.number().optional(),
        weight: z.number().optional(),
        height: z.number().optional(),
        activityLevel: z.string().optional(),
        goal: z.string().optional(),
        dietaryStyle: z.string().optional(),
        calculatedMetrics: z.any().optional(),
        mealPreferences: z.any().optional(),
        allergies: z.any().optional(),
        wantsNewsletter: z.boolean().optional(),
        wantsRecipes: z.boolean().optional(),
        wantsTips: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const subscriber = await createSubscriber({
          email: input.email,
          name: input.name || null,
          gender: input.gender || null,
          age: input.age || null,
          weight: input.weight || null,
          height: input.height || null,
          activityLevel: input.activityLevel || null,
          goal: input.goal || null,
          dietaryStyle: input.dietaryStyle || null,
          calculatedMetrics: input.calculatedMetrics || null,
          mealPreferences: input.mealPreferences || null,
          allergies: input.allergies || null,
          wantsNewsletter: input.wantsNewsletter ?? true,
          wantsRecipes: input.wantsRecipes ?? true,
          wantsTips: input.wantsTips ?? true,
        });

        if (subscriber) {
          // Notify admin about new subscriber
          await createAdminNotification({
            type: 'new_subscriber',
            title: 'Abonat nou',
            message: `${input.name || 'Utilizator'} (${input.email}) s-a înscris prin onboarding.`,
            data: { email: input.email, name: input.name }
          });

          // Also send push notification to owner
          await notifyOwner({
            title: '🌱 Abonat nou Khora',
            content: `${input.name || 'Utilizator'} (${input.email}) s-a înscris.\n\nObiectiv: ${input.goal || 'nespecificat'}\nStil: ${input.dietaryStyle || 'nespecificat'}`
          });

          // Log the welcome email (will be sent separately)
          await createEmailLog({
            recipientEmail: input.email,
            recipientName: input.name || null,
            emailType: 'welcome',
            subject: 'Bine ai venit la Khora!',
            status: 'pending'
          });
        }

        return { success: true, subscriber };
      }),

    checkEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        const subscriber = await getSubscriberByEmail(input.email);
        return { exists: !!subscriber };
      }),
  }),

  // User profile routes (protected - for logged-in users)
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getUserProfile(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        gender: z.string().optional(),
        age: z.number().optional(),
        weight: z.number().optional(),
        height: z.number().optional(),
        activityLevel: z.string().optional(),
        goal: z.string().optional(),
        dietaryStyle: z.string().optional(),
        calculatedMetrics: z.any().optional(),
        mealPreferences: z.any().optional(),
        allergies: z.any().optional(),
        hydrationHistory: z.any().optional(),
        supplementHistory: z.any().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await upsertUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // Admin routes
  admin: router({
    // Dashboard stats
    stats: adminProcedure.query(async () => {
      return getDashboardStats();
    }),

    // Get all subscribers
    subscribers: adminProcedure
      .input(z.object({
        limit: z.number().default(100),
        offset: z.number().default(0)
      }).optional())
      .query(async ({ input }) => {
        const { limit = 100, offset = 0 } = input || {};
        const subscribers = await getAllSubscribers(limit, offset);
        const total = await getSubscriberCount();
        return { subscribers, total };
      }),

    // Get all users
    users: adminProcedure
      .input(z.object({
        limit: z.number().default(100),
        offset: z.number().default(0)
      }).optional())
      .query(async ({ input }) => {
        const { limit = 100, offset = 0 } = input || {};
        return getAllUsers(limit, offset);
      }),

    // Get notifications
    notifications: adminProcedure.query(async () => {
      return getUnreadAdminNotifications();
    }),

    // Mark notification as read
    markNotificationRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markNotificationAsRead(input.id);
        return { success: true };
      }),

    // Mark all notifications as read
    markAllNotificationsRead: adminProcedure.mutation(async () => {
      await markAllNotificationsAsRead();
      return { success: true };
    }),

    // Get email logs
    emailLogs: adminProcedure
      .input(z.object({ limit: z.number().default(50) }).optional())
      .query(async ({ input }) => {
        return getRecentEmailLogs(input?.limit || 50);
      }),

    // Send test notification to owner
    testNotification: adminProcedure.mutation(async () => {
      const success = await notifyOwner({
        title: 'Test Notificare Khora',
        content: 'Aceasta este o notificare de test din Admin Dashboard.'
      });
      return { success };
    }),
  }),
});

export type AppRouter = typeof appRouter;
