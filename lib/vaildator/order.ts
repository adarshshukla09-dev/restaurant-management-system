import { z } from "zod";

export const OrderItem = z.object({
  itemName: z.string().min(1, "Item Name is required"),
  itemPrice: z.number(),
  quantity: z.number(),
  status: z.enum(["PENDING", "PREPARING", "READY", "SERVED", "PAID"]),
});

export type OrderItemInput = z.infer<typeof OrderItem>;
