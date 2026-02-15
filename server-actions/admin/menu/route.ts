"use server"
import { db } from "@/db";
import { MenuItemInput, MenuItemSchema } from "@/lib/vaildator/table";
import { menu } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createItem = async (menuItem: MenuItemInput) => {
  try {
    const result = MenuItemSchema.safeParse(menuItem);
    if (!result.success) {
      return { error: result.error.flatten() };
    }

    const data = result.data;

    const newItem = await db
      .insert(menu)
      .values({ ...data })
      .returning();
      revalidatePath("/menu")
console.log(newItem)
    return { success: true, data: newItem };
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "some internal server error",
    );
  }
};

export const readAll = async () => {
  try {
    const wholeMenu = await db.select().from(menu);

    return { success :true , data :wholeMenu}
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "some internal server error",
    );
  }
};
export const readItem = async (  id: string,
) => {
  try {
  const item = db.select().from(menu).where(eq(menu.id,id));

    return { success :true , data :item}
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "some internal server error",
    );
  }
};
export const updateItem = async (
  id: string,
  data: Partial<MenuItemInput>
) => {
  try {
    // Validate partial update
    const result = MenuItemSchema.partial().safeParse(data);

    if (!result.success) {
      return { error: result.error.flatten() };
    }

    const updated = await db
      .update(menu)
      .set(result.data)
      .where(eq(menu.id, id))
      .returning();
console.log(updated)
      revalidatePath("/menu")
    return { success: true, data: updated };
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "some internal error"
    );
    return { error: "Internal server error" };
  }
};

export const deleteItem = async(id:string
)=>{
try {
  const deleted = await db.delete(menu).where(eq(menu.id,id)).returning();
        revalidatePath("/menu")

    return { success: true, data: deleted };
} catch (error) {
  console.log(
      error instanceof Error ? error.message : "some internal error"
    );
    return { error: "Internal server error" };
}
}