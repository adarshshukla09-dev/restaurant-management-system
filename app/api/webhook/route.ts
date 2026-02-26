import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { tableSessions, restaurantTables, payments } from "@/db/schema/schema";
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

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const sessionId = paymentIntent.metadata.sessionId;
    const tableId = paymentIntent.metadata.tableId;

    // 1️⃣ Save payment
    await db.insert(payments).values({
      stripePaymentIntentId: paymentIntent.id,
      sessionId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      method: "CARD",
      status: "SUCCESS",
      paidAt: new Date(),
    });

    await db
      .update(tableSessions)
      .set({
        status: "CLOSED",
        endedAt: new Date(),
      })
      .where(eq(tableSessions.id, sessionId));

    await db
      .update(restaurantTables)
      .set({ status: "FREE" })
      .where(eq(restaurantTables.id, tableId));
  }

  return new Response("OK", { status: 200 });
}