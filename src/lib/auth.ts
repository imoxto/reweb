import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins"
import { headers } from "next/headers";
import { db } from "./db";
import { BASE_URL } from "./constants";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    admin()
  ],
  // emailAndPassword: {
  //   enabled: true,
  // },
  secret: process.env.AUTH_SECRET!,
  baseURL: BASE_URL,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60, // Cache duration in seconds
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
