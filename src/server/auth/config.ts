import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/server/db";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
// Debug the database connection
console.log("🔍 Debug - Database object:", {
  db: typeof db,
  verificationToken: typeof db.verificationToken,
  hasCreate: typeof db.verificationToken?.create,
});

export const authConfig = {
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",
  providers: [
    EmailProvider({
      server: {
        host: "in-v3.mailjet.com",
        port: 587,
        auth: {
          user: env.MAILJET_API_KEY,
          pass: env.MAILJET_SECRET_KEY,
        },
      },
      from: env.MAILJET_FROM_EMAIL,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { host } = new URL(url);

        try {
          const response = await fetch("https://api.mailjet.com/v3.1/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                `${env.MAILJET_API_KEY}:${env.MAILJET_SECRET_KEY}`,
              ).toString("base64")}`,
            },
            body: JSON.stringify({
              Messages: [
                {
                  From: {
                    Email: env.MAILJET_FROM_EMAIL,
                    Name: "Chat Thang",
                  },
                  To: [
                    {
                      Email: identifier,
                    },
                  ],
                  Subject: "Sign in to Chat Thang",
                  HTMLPart: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                      <h1 style="color: #333; text-align: center;">Welcome to Chat Thang!</h1>
                      <p style="color: #666; line-height: 1.6;">Click the button below to sign in to your account:</p>
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${url}" style="background-color: #0066ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                          Sign in to Chat Thang
                        </a>
                      </div>
                      <p style="color: #999; font-size: 14px; text-align: center;">
                        If you didn't request this email, you can safely ignore it.
                      </p>
                      <p style="color: #999; font-size: 14px; text-align: center;">
                        This link will expire in 24 hours.
                      </p>
                    </div>
                  `,
                  TextPart: `Welcome to Chat Thang!\n\nClick the link below to sign in to your account:\n${url}\n\nIf you didn't request this email, you can safely ignore it.\nThis link will expire in 24 hours.`,
                },
              ],
            }),
          });

          if (!response.ok) {
            throw new Error(`Mailjet API error: ${response.statusText}`);
          }

          console.log("✅ Verification email sent successfully to", identifier);
        } catch (error) {
          console.error("❌ Failed to send verification email:", error);
          throw error;
        }
      },
    }),
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
