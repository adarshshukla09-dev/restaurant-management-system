import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { tableSessions, restaurantTables, payments, orders } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
const sig = headersList.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Webhook error", { status: 400 });
  }

if (event.type === "checkout.session.completed") {
  const checkoutSession = event.data.object as Stripe.Checkout.Session;

  const tableSessionId = checkoutSession.metadata?.tableSessionId;

  if (!tableSessionId) {
    return new Response("Missing sessionId", { status: 400 });
  }

  // 1️⃣ Save payment
  await db.insert(payments).values({
    stripePaymentIntentId: checkoutSession.payment_intent as string,
    sessionId: tableSessionId,
    amount: checkoutSession.amount_total!,
    currency: checkoutSession.currency!,
    method: "CARD",
    status: "SUCCESS",
    paidAt: new Date(),
  });

  // 2️⃣ Mark all orders as PAID
  await db
    .update(orders)
    .set({ status: "PAID" })
    .where(eq(orders.sessionId, tableSessionId));

  // 3️⃣ Get tableId from session
  const tableSession = await db.query.tableSessions.findFirst({
    where: eq(tableSessions.id, tableSessionId),
  });

  if (!tableSession) {
    return new Response("Session not found", { status: 404 });
  }

  // 4️⃣ Close session
  await db
    .update(tableSessions)
    .set({
      status: "CLOSED",
      endedAt: new Date(),
    })
    .where(eq(tableSessions.id, tableSessionId));

  // 5️⃣ Free table
  await db
    .update(restaurantTables)
    .set({ status: "FREE" })
    .where(eq(restaurantTables.id, tableSession.tableId));
}

  return new Response("OK", { status: 200 });
}