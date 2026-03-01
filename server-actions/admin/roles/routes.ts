"use server";

import { db } from "@/db";
import { restaurantMembers, user } from "@/db/schema";
import { auth } from "@/lib/utils/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { success } from "zod";

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
       return {status:500 , success:false,message:error instanceof Error ? error.message : "something went wrong" }
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.select().from(user);
    return { success: true, data: users };
  } catch (error) {
       return {status:500 , success:false,message:error instanceof Error ? error.message : "something went wrong" }
  }
};
export const createMember = async ({ userId }: { userId: string }) => {
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
       return {status:500 , success:false,message:error instanceof Error ? error.message : "something went wrong" }

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
    await db.transaction(async (tx) => {
      const member = await tx.query.restaurantMembers.findFirst({
        where: eq(restaurantMembers.id, memberId),
      });

      if (!member) {
        throw new Error("member not found");
      }

      await tx
        .update(restaurantMembers)
        .set({ role: newRole })
        .where(eq(restaurantMembers.id, memberId));

     
    });

    return { success: true };
  } catch (error) {
    return {status:500 , message:error instanceof Error ? error.message : "something went wrong" }
  }
};
