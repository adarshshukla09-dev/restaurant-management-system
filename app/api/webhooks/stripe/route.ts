import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { payments, orders, tableSessions, restaurantTables } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

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
    console.error("Webhook signature failed:", err);
    return new Response("Webhook error", { status: 400 });
  }

  console.log("Stripe event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const tableSessionId = session.metadata?.tableSessionId;
    const paymentIntentId = session.payment_intent ?? session.id;

    if (!tableSessionId) {
      return new Response("Missing tableSessionId", { status: 400 });
    }

    const existing = await db.query.payments.findFirst({
      where: eq(payments.stripePaymentIntentId, paymentIntentId),
    });

    if (existing) {
      return new Response("Already processed", { status: 200 });
    }

    await db.transaction(async (tx) => {
      await tx.insert(payments).values({
        stripePaymentIntentId: paymentIntentId,
        sessionId: tableSessionId,
        amount: session.amount_total,
        currency: session.currency,
        method: "CARD",
        status: "SUCCESS",
        paidAt: new Date(),
      });

      await tx
        .update(orders)
        .set({ status: "PAID" })
        .where(eq(orders.sessionId, tableSessionId));

      const tableSession = await tx.query.tableSessions.findFirst({
        where: eq(tableSessions.id, tableSessionId),
      });

      if (!tableSession) return;

      await tx
        .update(tableSessions)
        .set({
          status: "CLOSED",
          endedAt: new Date(),
        })
        .where(eq(tableSessions.id, tableSessionId));

      await tx
        .update(restaurantTables)
        .set({ status: "FREE" })
        .where(eq(restaurantTables.id, tableSession.tableId));
    });

    console.log("Payment saved successfully");
  }

  return new Response("OK", { status: 200 });
}