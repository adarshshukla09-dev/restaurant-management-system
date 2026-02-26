import {
  pgEnum,
  pgTable,
  uuid,
  text,
  timestamp,index,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { session, user, userRoles } from "./authschema";

export const tableStatus = pgEnum("table_status", [
  "FREE",
  "OCCUPIED",
  "RESERVED",
]);
export const staffStatus = pgEnum("staff_status", [
  "APPROVED",
  "PENDING",
  "REJECTED",
]);

export const orderStatus = pgEnum("order_status", [
  "PENDING",
  "PREPARING",
  "READY",
  "SERVED",
  "PAID",
]);

export const foodType = pgEnum("food_type", ["VEG", "NONVEG"]);

export const mealTime = pgEnum("meal_time", ["BREAKFAST", "LUNCH", "DINNER"]);

export const restaurantTables = pgTable("restaurant_tables", {
  id: uuid("id").primaryKey().defaultRandom(),

  tableNumber: integer("table_number").unique().notNull(),
  qrToken: uuid("qr_token").defaultRandom().notNull().unique(),
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
export const sessionStatus = pgEnum("session_status", [
  "ACTIVE",
  "CLOSED",
]);

export const tableSessions = pgTable("table_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  tableId: uuid("table_id")
    .notNull()
    .references(() => restaurantTables.id, { onDelete: "cascade" }),

  status: sessionStatus("status").default("ACTIVE").notNull(),

  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
 
 sessionId: uuid("session_id")
  .notNull()
  .references(() => tableSessions.id, { onDelete: "cascade" }),
  waiterId: text("waiter_id").references(() => user.id),
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

  itemName: text("item_name").notNull(), // snapshot
  itemPrice: integer("item_price").notNull(), // snapshot

  quantity: integer("quantity").notNull(),

  status: orderStatus("status").default("PENDING").notNull(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  
  stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
sessionId: uuid("session_id")
  .notNull()
  .references(() => tableSessions.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("usd"),

  method: text("method").notNull(), // CASH | UPI | CARD
  status: text("status").notNull(), // SUCCESS | FAILED | PENDING

  failureReason: text("failure_reason"),

  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});


export const restaurantMembers = pgTable("restaurant_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: userRoles("role").default("WAITER").notNull(),
  status: staffStatus("status").default("PENDING").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});