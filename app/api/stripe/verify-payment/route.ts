import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { payments, orders, tableSessions, restaurantTables } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return Response.json({ error: "Payment not completed" }, { status: 400 });
  }

  const tableSessionId = session.metadata?.tableSessionId;
  const paymentIntentId = session.payment_intent ?? session.id;

  const existing = await db.query.payments.findFirst({
    where: eq(payments.stripePaymentIntentId, paymentIntentId as string),
  });

  if (existing) {
    return Response.json({ message: "Already saved" });
  }

  await db.transaction(async (tx) => {
    await tx.insert(payments).values({
      stripePaymentIntentId: paymentIntentId as string,
      sessionId: tableSessionId!,
      amount: session.amount_total!,
      currency: session.currency!,
      method: "CARD",
      status: "SUCCESS",
      paidAt: new Date(),
    });

    await tx
      .update(orders)
      .set({ status: "PAID" })
      .where(eq(orders.sessionId, tableSessionId!));

    const tableSession = await tx.query.tableSessions.findFirst({
      where: eq(tableSessions.id, tableSessionId!),
    });

    if (!tableSession) return;

    await tx
      .update(tableSessions)
      .set({
        status: "CLOSED",
        endedAt: new Date(),
      })
      .where(eq(tableSessions.id, tableSessionId!));

    await tx
      .update(restaurantTables)
      .set({ status: "FREE" })
      .where(eq(restaurantTables.id, tableSession.tableId));
  });

  return Response.json({ success: true });
}