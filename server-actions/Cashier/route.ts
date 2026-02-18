// "use server"

// import { db } from "@/db"
// import { orders, restaurantTables } from "@/db/schema";
// import { eq ,and, ne} from "drizzle-orm";

// export const allOrder_Cashier=async (id:string) => {
//   try {
//     // 1️⃣ Find table
//     const table = await db
//       .select()
//       .from(restaurantTables)
//       .where(eq(restaurantTables.id, id))
//       .limit(1);

//     if (!table.length) {
//       throw new Error("Table not found");
//     }

//     const tableId = table[0].id;

//     // 2️⃣ Get active order
//     const activeOrder = await db
//       .select()
//       .from(orders)
//       .where(
//         and(
//           eq(orders.tableId, tableId),
//           ne(orders.status, "PAID")
//         )
//       )
//       .limit(1);

//     if (!activeOrder.length) {
//       return { success: true, data: [] };
//     }

//     const orderId = activeOrder[0].id;

//     // 3️⃣ Get items by orderId (FIXED)
//     const items = await db
//       .select()
//       .from(orderItems)
//       .where(eq(orderItems.orderId, orderId));

//     return { success: true, data: items };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };