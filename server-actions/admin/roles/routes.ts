"use server";

import { db } from "@/db";
import { restaurantMembers, user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getRestaurantMembers = async () => {
  try {
    const members = await db
      .select({
        memberId: restaurantMembers.id,
        role: restaurantMembers.role,
        status: restaurantMembers.status,
        userId: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      })
      .from(restaurantMembers)
      .innerJoin(user, eq(restaurantMembers.userId, user.id));

    return { success: true, data: members };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] }; // ✅ ALWAYS return array
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.select().from(user);
    return { success: true, data: users };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
export const createMember = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    // 1️⃣ Check if already member
    const existing = await db
      .select()
      .from(restaurantMembers)
      .where(eq(restaurantMembers.userId, userId));

    if (existing.length > 0) {
      return {
        success: false,
        message: "User already a member",
      };
    }

    // 2️⃣ Insert new member
    await db.insert(restaurantMembers).values({
      userId,
      role: "WAITER",
      status: "APPROVED", // or PENDING if approval flow
    });

    return {
      success: true,
      message: "Member added successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const changeMemberRole = async ({
  memberId,
  newRole,
}: {
  memberId: string;
  newRole: "ADMIN" | "WAITER" | "CASHIER" | "KITCHEN";
}) => {
  try {
    await db
      .update(restaurantMembers)
      .set({ role: newRole })
      .where(eq(restaurantMembers.id, memberId));

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};