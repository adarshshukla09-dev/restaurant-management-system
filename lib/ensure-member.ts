import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "./utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function ensureRestaurantMember(userId: string) {

   const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) {
      redirect("/register");
    }
  const existing = await db
    .select()
    .from(schema.restaurantMembers)
    .where(eq(schema.restaurantMembers.userId, userId))
    .limit(1);

  if (existing.length > 0) return;

  const firstMember = await db
    .select({ id: schema.restaurantMembers.id })
    .from(schema.restaurantMembers)
    .limit(1);

  const isFirst = firstMember.length === 0;

  await db.insert(schema.restaurantMembers).values({
    userId,
    role: isFirst ? "ADMIN" : "WAITER",
    status: isFirst ? "APPROVED" : "PENDING",
  });
}