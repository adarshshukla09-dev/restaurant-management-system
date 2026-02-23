
 "use server";

import { db } from "@/db";
import { restaurantMembers, user } from "@/db/schema";
import { auth } from "@/lib/utils/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getRestaurantMembers } from "../roles/routes";
export const helperAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/register");

  const memberRes = await getRestaurantMembers();
  if (!memberRes.success) redirect("/");

  const member = memberRes.data.find(
    (m) => m.userId === session.user.id
  );

  if (!member || member.role !== "ADMIN") {
    redirect("/");
  }
};
export const helperMember = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/register");

  const memberRes = await getRestaurantMembers();
  if (!memberRes.success) redirect("/");

  const member = memberRes.data.find(
    (m) => m.userId === session.user.id
  );
 const allowedRoles = ["ADMIN", "WAITER", "CASHIER", "KITCHEN"];

  if (!member || !allowedRoles.includes(member.role)) {
    redirect("/");
  }
}