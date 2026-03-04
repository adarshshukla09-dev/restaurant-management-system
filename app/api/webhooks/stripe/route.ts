import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import {
  payments,
  orders,
  tableSessions,
  restaurantTables,
} from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList =await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Webhook error", { status: 400 });
  }

  // ✅ When payment succeeds
  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;

    const paymentIntentId = checkoutSession.payment_intent as string;

    // Retrieve PaymentIntent to get metadata
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    const tableSessionId = paymentIntent.metadata.tableSessionId;

    if (!tableSessionId) {
      return new Response("Missing tableSessionId", { status: 400 });
    }

    // 1️⃣ Save payment
    await db.insert(payments).values({
      stripePaymentIntentId: paymentIntentId,
      sessionId: tableSessionId,
      amount: checkoutSession.amount_total!,
      currency: checkoutSession.currency!,
      method: "CARD",
      status: "SUCCESS",
      paidAt: new Date(),
    });

    // 2️⃣ Mark orders PAID
    await db
      .update(orders)
      .set({ status: "PAID" })
      .where(eq(orders.sessionId, tableSessionId));

    // 3️⃣ Get table session
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