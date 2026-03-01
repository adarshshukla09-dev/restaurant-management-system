import Stripe from "stripe";
import { payments } from "@/db/schema";
import { db } from "@/db";
import { date } from "zod";

export async function savePaymentToDB(
  paymentIntent: Stripe.PaymentIntent
) {
  try {
    let status: "SUCCESS" | "FAILED" | "PENDING" = "PENDING";

    if (paymentIntent.status === "succeeded") {
      status = "SUCCESS";
    } else if (paymentIntent.status === "canceled") {
      status = "FAILED";
    }

    const tableSessionId = paymentIntent.metadata.tableSessionId;

    if (!tableSessionId) {
      throw new Error("Missing tableSessionId in metadata");
    }

    await db.insert(payments).values({
      stripePaymentIntentId: paymentIntent.id,
      sessionId: tableSessionId, // ✅ FIXED
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      method: "CARD",
      status,
      failureReason: paymentIntent.cancellation_reason ?? null,
      paidAt:
        paymentIntent.status === "succeeded"
          ? new Date(paymentIntent.created * 1000)
          : null,
    });
  } catch (error) {
        return {status:500 , message:error instanceof Error ? error.message : "something went wrong" }

  }
}

export const readAllPayment = async()=>{
  try {
    const allPayment = await db.select().from(payments)
    return {status:200 , data :allPayment}
  } catch (error) {
    return {status:500 , message:error instanceof Error ? error.message : "something went wrong" }
  }
}