"use server";

import { db } from "@/db";
import { orderItems, orders, restaurantTables } from "@/db/schema/schema";
import { eq, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { success } from "zod";
import { tableSessions } from "@/db/schema/schema";

const getOrCreateSession = async (tableId: string) => {
  let session = await db
    .select()
    .from(tableSessions)
    .where(
      and(
        eq(tableSessions.tableId, tableId),
        eq(tableSessions.status, "ACTIVE")
      )
    )
    .limit(1);

  if (!session.length) {
    const newSession = await db
      .insert(tableSessions)
      .values({ tableId })
      .returning();

    session = newSession;
  }

  return session[0].id;
};

export const getOrCreateActiveOrder = async (
  qrToken: string,
  waiterId?: string
) => {
  const table = await db
    .select()
    .from(restaurantTables)
    .where(eq(restaurantTables.qrToken, qrToken))
    .limit(1);

  if (!table.length) throw new Error("Table not found");

  const tableId = table[0].id;

  if (table[0].status === "FREE") {
    await db
      .update(restaurantTables)
      .set({ status: "OCCUPIED" })
      .where(eq(restaurantTables.id, tableId));
  }

  const sessionId = await getOrCreateSession(tableId);

  let activeOrder = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.sessionId, sessionId),
        ne(orders.status, "PAID")
      )
    )
    .limit(1);

  if (!activeOrder.length) {
    const newOrder = await db
      .insert(orders)
      .values({
        sessionId,
        waiterId,
        status: "PENDING",
      })
      .returning();

    activeOrder = newOrder;
  }

  return activeOrder[0].id;
};


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

  const order =  await db.insert(orderItems).values(
      items.map((i) => ({
        orderId,
        menuId: i.menuId,
        itemName: i.itemName,
        itemPrice: i.itemPrice,
        quantity: i.quantity,
      }))
    );
console.log(order)
    revalidatePath(`/menu/${qrToken}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


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

const session = await db
  .select()
  .from(tableSessions)
  .where(
    and(
      eq(tableSessions.tableId, tableId),
      eq(tableSessions.status, "ACTIVE")
    )
  )
  .limit(1);

if (!session.length) {
  return { success: true, data: [] };
}

const activeOrder = await db
  .select()
  .from(orders)
  .where(
    and(
      eq(orders.sessionId, session[0].id),
      ne(orders.status, "PAID")
    )
  )
  .limit(1);
  

    if (!activeOrder.length) {
      return { success: true, data: [] };
    }

    const orderId = activeOrder[0].id;

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

export const CancelOrder = async (orderId: string) => {
  try {
    const order = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.id, orderId));

    if (!order.length) {
      return { message: "Order not found", success: false };
    }

    if (order[0].status === "PENDING") {
      await db
        .delete(orderItems)
        .where(eq(orderItems.id, orderId));
revalidatePath("/order")

      return { message: "Deleted successfully", success: true };
    }
    return {
      message: `Can't delete because the order is ${order[0].status}`,
      success: false,
    };

  } catch (error) {
    console.error(error);
    return { message: "Something went wrong", success: false };
  }
};
