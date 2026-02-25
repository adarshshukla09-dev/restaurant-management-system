import { db } from "@/db";
import { restaurantMembers } from "@/db/schema";
import { auth } from "@/lib/utils/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getCurrentMember() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/register");

  const member = await db.query.restaurantMembers.findFirst({
    where: eq(restaurantMembers.userId, session.user.id),
  });

  if (!member) redirect("/");

  return member;
}

export async function requireAdmin() {
  const member = await getCurrentMember();

  if (member.role !== "ADMIN") {
    redirect("/");
  }

  return member;
}
export async function requireStaff() {
  const member = await getCurrentMember();

  const allowedRoles = [ "ADMIN", "WAITER", "CASHIER", "KITCHEN"];

  if (!allowedRoles.includes(member.role)) {
    redirect("/");
  }

  return member;
}