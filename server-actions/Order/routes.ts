"use server";

import { db } from "@/db";
import { orderItems, orders, restaurantTables } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Get or create active order using qrToken
 */
export const getOrCreateActiveOrder = async (
  qrToken: string,
  waiterId?: string
) => {
  try {
    // 1️⃣ Find table by qrToken
    const table = await db
      .select()
      .from(restaurantTables)
      .where(eq(restaurantTables.qrToken, qrToken))
      .limit(1);

    if (!table.length) {
      throw new Error("Table not found");
    }

    const tableId = table[0].id;

    // 2️⃣ If FREE → mark OCCUPIED
    if (table[0].status === "FREE") {
      await db
        .update(restaurantTables)
        .set({ status: "OCCUPIED" })
        .where(eq(restaurantTables.id, tableId));
    }

    // 3️⃣ Find active (NOT PAID) order
    let activeOrder = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.tableId, tableId),
          ne(orders.status, "PAID")
        )
      )
      .limit(1);

    // 4️⃣ If none → create one
    if (!activeOrder.length) {
      const newOrder = await db
        .insert(orders)
        .values({
          tableId,
          waiterId,
          status: "PENDING",
        })
        .returning();

      activeOrder = newOrder;
    }

    return activeOrder[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/**
 * Add items to cart / order
 */
export const buyFromCart = async (
  qrToken: string,
  items: {
    menuId: string;
    itemName: string;
    itemPrice: number;
    quantity: number;
  }[],
  waiterId?: string
) => {
  try {
    // MUST await
    const orderId = await getOrCreateActiveOrder(qrToken, waiterId);

    await db.insert(orderItems).values(
      items.map((i) => ({
        orderId,
        menuId: i.menuId,
        itemName: i.itemName,
        itemPrice: i.itemPrice,
        quantity: i.quantity,
      }))
    );

    revalidatePath(`/table/${qrToken}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/**
 * Get all items for active order
 */
export const allOrders = async (qrToken: string) => {
  try {
    // 1️⃣ Find table
    const table = await db
      .select()
      .from(restaurantTables)
      .where(eq(restaurantTables.qrToken, qrToken))
      .limit(1);

    if (!table.length) {
      throw new Error("Table not found");
    }

    const tableId = table[0].id;

    // 2️⃣ Get active order
    const activeOrder = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.tableId, tableId),
          ne(orders.status, "PAID")
        )
      )
      .limit(1);

    if (!activeOrder.length) {
      return { success: true, data: [] };
    }

    const orderId = activeOrder[0].id;

    // 3️⃣ Get items by orderId (FIXED)
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    return { success: true, data: items };
  } catch (error) {
    console.error(error);
    throw error;
  }
};