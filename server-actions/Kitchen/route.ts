"use server"
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { OrderItemInput } from "@/lib/vaildator/order";
import { revalidatePath } from "next/cache";
export const pendingOrder = async () => {
  try {
    const all = await db.select().from(orderItems);
    return all;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
type status=OrderItemInput["status"]
export const updateStatus = async ({ id, status }: { id: string; status: status }) => {
  try {
    const updated = await db
      .update(orderItems)
      .set({ status})
      .where(eq(orderItems.id, id));

      revalidatePath("./order")
        revalidatePath("./kitchen")
  } catch (error) {
    console.error(error);
    throw error;
  }
};
