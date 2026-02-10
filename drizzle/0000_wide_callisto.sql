CREATE TYPE "public"."food_type" AS ENUM('VEG', 'NONVEG');--> statement-breakpoint
CREATE TYPE "public"."meal_time" AS ENUM('BREAKFAST', 'LUNCH', 'DINNER');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'PREPARING', 'READY', 'SERVED', 'PAID');--> statement-breakpoint
CREATE TYPE "public"."table_status" AS ENUM('FREE', 'OCCUPIED', 'RESERVED');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('ADMIN', 'WAITER', 'CASHIER', 'KITCHEN');--> statement-breakpoint
CREATE TABLE "menu" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"image" text,
	"food_type" "food_type" NOT NULL,
	"meal_time" "meal_time" NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"menu_id" uuid NOT NULL,
	"item_name" text NOT NULL,
	"item_price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"status" "order_status" DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"table_id" uuid NOT NULL,
	"waiter_id" uuid,
	"status" "order_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"method" text NOT NULL,
	"status" text NOT NULL,
	"paid_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "restaurant_tables" (
	"id" uuid PRIMARY KEY NOT NULL,
	"table_number" text NOT NULL,
	"status" "table_status" DEFAULT 'FREE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" "user_roles" NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_restaurant_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."restaurant_tables"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_waiter_id_users_id_fk" FOREIGN KEY ("waiter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;