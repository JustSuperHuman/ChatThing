import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { randomUUID } from "crypto";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// Helper function to get client IP from headers
function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const realIP = headers.get("x-real-ip");
  const remoteAddr =
    headers.get("x-vercel-forwarded-for") || headers.get("cf-connecting-ip");

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return realIP || remoteAddr || "unknown";
}

// Helper function to get today's date in YYYY-MM-DD format
function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0]!;
}

export const chatRouter = createTRPCRouter({
  getMessageCount: publicProcedure.query(async ({ ctx }) => {
    try {
      console.log("🔍 getMessageCount - Context check:", {
        hasDb: !!ctx.db,
        hasSession: !!ctx.session,
        userId: ctx.session?.user?.id,
      });

      if (!ctx.db) {
        console.error("❌ Database connection is undefined in getMessageCount");
        return 0;
      }

      if (!ctx.session?.user?.id) {
        // For anonymous users, check IP-based daily usage
        const clientIP = getClientIP(ctx.headers);
        const today = getTodayDateString();

        console.log("🔍 getMessageCount - Anonymous user:", {
          clientIP,
          today,
        });

        const usage = await ctx.db.$queryRaw<
          {
            id: string;
            ipAddress: string;
            date: string;
            messageCount: number;
            createdAt: Date;
            updatedAt: Date;
          }[]
        >`
          SELECT * FROM AnonymousUsage
          WHERE ipAddress = ${clientIP} AND date = ${today}
          LIMIT 1
        `;

        const usageRecord = usage[0] || null;

        console.log("🔍 getMessageCount - Usage found:", usageRecord);
        return usageRecord?.messageCount ?? 0;
      }

      // For authenticated users, count their messages (no limit)
      console.log(
        "🔍 getMessageCount - Authenticated user:",
        ctx.session.user.id,
      );
      return ctx.db.message.count({
        where: {
          thread: {
            userId: ctx.session.user.id,
          },
          isFromUser: true,
        },
      });
    } catch (error) {
      console.error("❌ getMessageCount error:", error);
      // Return 0 as fallback to prevent UI from breaking
      return 0;
    }
  }),

  getThreads: publicProcedure
    .input(
      z.object({
        anonymousThreadIds: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // For authenticated users, get their threads
      if (ctx.session?.user?.id) {
        return ctx.db.thread.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          orderBy: {
            updatedAt: "desc",
          },
        });
      }

      // For anonymous users, get threads by IDs from localStorage
      if (input.anonymousThreadIds && input.anonymousThreadIds.length > 0) {
        return ctx.db.thread.findMany({
          where: {
            id: {
              in: input.anonymousThreadIds,
            },
            userId: null,
          },
          orderBy: {
            updatedAt: "desc",
          },
        });
      }

      return [];
    }),

  getMessages: publicProcedure
    .input(z.object({ threadId: z.string() }))
    .query(async ({ ctx, input }) => {
      // For authenticated users, check ownership. For anonymous users, allow access to any thread.
      const whereClause = ctx.session?.user?.id
        ? {
            id: input.threadId,
            userId: ctx.session.user.id,
          }
        : {
            id: input.threadId,
          };

      const thread = await ctx.db.thread.findUnique({
        where: whereClause,
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      return thread?.messages ?? [];
    }),

  createThread: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      const thread = await ctx.db.thread.create({
        data: {
          title: input.title,
          ...(userId ? { user: { connect: { id: userId } } } : {}),
        },
      });
      return thread;
    }),

  createThreadWithMessage: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        message: z.string().min(1),
        attachments: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("🔧 createThread mutation called with input:", input);
      console.log("🔧 Session data:", {
        hasSession: !!ctx.session,
        userId: ctx.session?.user?.id,
        userEmail: ctx.session?.user?.email,
      });

      // For anonymous users, we'll create threads without a userId
      // For authenticated users, we'll associate with their userId
      const userId = ctx.session?.user?.id;
      console.log("🔧 Using userId:", userId);

      // Check message limit for anonymous users
      if (!userId) {
        try {
          if (!ctx.db) {
            console.error(
              "❌ Database connection is undefined, skipping limit check",
            );
          } else {
            const clientIP = getClientIP(ctx.headers);
            const today = getTodayDateString();

            const usage = await ctx.db.$queryRaw<
              {
                id: string;
                ipAddress: string;
                date: string;
                messageCount: number;
                createdAt: Date;
                updatedAt: Date;
              }[]
            >`
              SELECT * FROM AnonymousUsage
              WHERE ipAddress = ${clientIP} AND date = ${today}
              LIMIT 1
            `;

            const usageRecord = usage[0] || null;

            if ((usageRecord?.messageCount ?? 0) >= 10) {
              throw new Error(
                "Message limit reached. Please sign up to continue chatting.",
              );
            }
          }
        } catch (error) {
          console.error("❌ Error checking message limit:", error);
          // Continue without limit check if database fails
        }
      }

      try {
        console.log("🔧 Starting database transaction...");
        const result = await ctx.db.$transaction(
          async (tx: Prisma.TransactionClient) => {
            console.log("🔧 Creating thread with data:", {
              title: input.title,
              userId: userId,
            });

            const thread = await tx.thread.create({
              data: {
                title: input.title,
                ...(userId ? { user: { connect: { id: userId } } } : {}),
              },
            });

            console.log("🔧 Thread created:", thread);

            const messageData = {
              content: input.message,
              isFromUser: true,
              threadId: thread.id,
              model: "user", // User messages don't have a model, but schema requires it.
              attachments: input.attachments
                ? JSON.stringify(input.attachments)
                : undefined,
            };

            console.log("🔧 Creating message with data:", messageData);

            await tx.message.create({
              data: messageData,
            });

            console.log("🔧 Message created successfully");

            // Increment anonymous usage counter for non-authenticated users
            if (!userId) {
              try {
                const clientIP = getClientIP(ctx.headers);
                const today = getTodayDateString();

                await tx.$executeRaw`
                  INSERT INTO AnonymousUsage (id, ipAddress, date, messageCount, createdAt, updatedAt)
                  VALUES (${randomUUID()}, ${clientIP}, ${today}, 1, ${new Date()}, ${new Date()})
                  ON CONFLICT(ipAddress, date)
                  DO UPDATE SET
                    messageCount = messageCount + 1,
                    updatedAt = ${new Date()}
                `;
                console.log("🔧 Anonymous usage incremented for IP:", clientIP);
              } catch (upsertError) {
                console.error(
                  "❌ Error incrementing anonymous usage:",
                  upsertError,
                );
                // Continue without incrementing if this fails
              }
            }

            return thread;
          },
        );

        console.log("🔧 Transaction completed successfully:", result);
        return result;
      } catch (error) {
        console.error("🔧 Database transaction failed:", error);
        if (error instanceof Error) {
          console.error("🔧 Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
          });
        }
        throw error;
      }
    }),

  sendMessage: publicProcedure
    .input(
      z.object({
        threadId: z.string(),
        content: z.string().min(1),
        attachments: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      // Check message limit for anonymous users
      if (!userId) {
        try {
          if (!ctx.db) {
            console.error(
              "❌ Database connection is undefined, skipping limit check",
            );
          } else {
            const clientIP = getClientIP(ctx.headers);
            const today = getTodayDateString();

            const usage = await ctx.db.$queryRaw<
              {
                id: string;
                ipAddress: string;
                date: string;
                messageCount: number;
                createdAt: Date;
                updatedAt: Date;
              }[]
            >`
              SELECT * FROM AnonymousUsage
              WHERE ipAddress = ${clientIP} AND date = ${today}
              LIMIT 1
            `;

            const usageRecord = usage[0] || null;

            if ((usageRecord?.messageCount ?? 0) >= 10) {
              throw new Error(
                "Message limit reached. Please sign up to continue chatting.",
              );
            }
          }
        } catch (error) {
          console.error("❌ Error checking message limit:", error);
          // Continue without limit check if database fails
        }
      }

      return ctx.db.$transaction(async (tx) => {
        const message = await tx.message.create({
          data: {
            threadId: input.threadId,
            content: input.content,
            isFromUser: true,
            model: "user",
            attachments: input.attachments
              ? JSON.stringify(input.attachments)
              : undefined,
          },
        });

        // Increment anonymous usage counter for non-authenticated users
        if (!userId) {
          try {
            const clientIP = getClientIP(ctx.headers);
            const today = getTodayDateString();

            await tx.$executeRaw`
              INSERT INTO AnonymousUsage (id, ipAddress, date, messageCount, createdAt, updatedAt)
              VALUES (${randomUUID()}, ${clientIP}, ${today}, 1, ${new Date()}, ${new Date()})
              ON CONFLICT(ipAddress, date)
              DO UPDATE SET
                messageCount = messageCount + 1,
                updatedAt = ${new Date()}
            `;
          } catch (upsertError) {
            console.error(
              "❌ Error incrementing anonymous usage:",
              upsertError,
            );
            // Continue without incrementing if this fails
          }
        }

        return message;
      });
    }),

  saveMessage: publicProcedure
    .input(
      z.object({
        threadId: z.string(),
        content: z.string().min(1),
        isFromUser: z.boolean(),
        model: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          threadId: input.threadId,
          content: input.content,
          isFromUser: input.isFromUser,
          model: input.model,
        },
      });
    }),
});
