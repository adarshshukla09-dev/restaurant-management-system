import { z } from "zod";

export const MenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1),
  price: z.number(),
  image: z.string().url("Image must be a valid URL"),
  foodType: z.enum(["VEG", "NONVEG"]),
  mealTime: z.enum(["BREAKFAST", "LUNCH", "DINNER"]),
  category: z.string().min(1, "Category is required"),
});

export type MenuItemInput = z.infer<typeof MenuItemSchema>;
