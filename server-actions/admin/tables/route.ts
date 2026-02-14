"use server"
import { db } from "@/db";
import { restaurantTables } from "@/db/schema";
import { tableInput } from "@/lib/vaildator/admin";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export const createTable = async (data:tableInput) => {
  try {
//   tableNumber: text("table_number").unique().notNull(),
// qrToken: uuid("qr_token")
//     .defaultRandom()
//     .notNull()
//     .unique(),
//   status: tableStatus("status").default("FREE").notNull(),

const newTable = await db.insert(restaurantTables).values(data).returning()

return { success:true , data:newTable}

  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "something went wrong",
    );
  }
};
export const readAllTable = async () => {
  try {
    const AllTable =await db.select().from(restaurantTables)
    return{ sucess:true,data:AllTable}
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "something went wrong",
    );
  }
};
export const deleteTable = async ( id:string) => {
  try {
    const deleteTable = await db.delete(restaurantTables).where(eq(restaurantTables.id,id)).returning()
    revalidatePath("/admin/tables")
    return { success:true , data: deleteTable}
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "something went wrong",
    );
  }
};
// export const createTable = async () => {
//   try {
//   } catch (error) {
//     console.log(
//       error instanceof Error ? error.message : "something went wrong",
//     );
//   }
// };
