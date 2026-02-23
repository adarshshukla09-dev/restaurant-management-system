import { db } from "@/db";
import { betterAuth } from "better-auth";
import * as schema from "@/db/schema";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
        schema,
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
    },
  },
   events: {
    onUserCreate: async ({ user }:{ user : any}) => {
      await db.transaction(async (tx) => {
        const existing = await tx
          .select()
          .from(schema.restaurantMembers)
          .limit(1);

        const isFirstUser = existing.length === 0;

        await tx.insert(schema.restaurantMembers).values({
          userId: user.id,
          role: isFirstUser ? "ADMIN" : "WAITER",
          status: "APPROVED",
        });
      });
    },
  },
});
