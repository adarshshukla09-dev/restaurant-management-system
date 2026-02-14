import {
  pgEnum,
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { users} from "./auth-schema";
import { number } from "zod";





export const tableStatus = pgEnum("table_status", [
  "FREE",
  "OCCUPIED",
  "RESERVED",
]);

export const orderStatus = pgEnum("order_status", [
  "PENDING",
  "PREPARING",
  "READY",
  "SERVED",
  "PAID",
]);

export const foodType = pgEnum("food_type", ["VEG", "NONVEG"]);

export const mealTime = pgEnum("meal_time", [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
]);





export const restaurantTables = pgTable("restaurant_tables", {
  id: uuid("id").primaryKey().defaultRandom(),

tableNumber: integer("table_number").unique().notNull(),
qrToken: uuid("qr_token")
    .defaultRandom()
    .notNull()
    .unique(),
  status: tableStatus("status").default("FREE").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});


export const menu = pgTable("menu", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),
  description: text("description"),

  price: integer("price").notNull(), // live price

  image: text("image"),

  foodType: foodType("food_type").notNull(),
  mealTime: mealTime("meal_time").notNull(),

  category: text("category").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});


export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),

  tableId: uuid("table_id")
    .notNull()
    .references(() => restaurantTables.id, { onDelete: "cascade" }),

waiterId: text("waiter_id").references(() => users.id),
  status: orderStatus("status").default("PENDING").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

 

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),

  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  menuId: uuid("menu_id")
    .notNull()
    .references(() => menu.id),

  itemName: text("item_name").notNull(),     // snapshot
  itemPrice: integer("item_price").notNull(), // snapshot

  quantity: integer("quantity").notNull(),

  status: orderStatus("status").default("PENDING").notNull(),
});


export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  amount: integer("amount").notNull(),

  method: text("method").notNull(),   // CASH | UPI | CARD
  status: text("status").notNull(),   // SUCCESS | FAILED

  paidAt: timestamp("paid_at").defaultNow(),
});