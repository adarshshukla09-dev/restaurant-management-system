import Stripe from "stripe";
import { payments } from "@/db/schema";
import { db } from "@/db";

export async function savePaymentToDB(
  paymentIntent: Stripe.PaymentIntent
) {
  try {

    // 🔁 Map Stripe status to your DB status
    let status: "SUCCESS" | "FAILED" | "PENDING" = "PENDING";

    if (paymentIntent.status === "succeeded") {
      status = "SUCCESS";
    } else if (paymentIntent.status === "canceled") {
      status = "FAILED";
    }

    const data = {
      orderId: paymentIntent.metadata.orderId, // make sure you send this!
      stripePaymentIntentId: paymentIntent.id,

      amount: paymentIntent.amount,
      currency: paymentIntent.currency,

      method: "CARD", // Stripe = CARD
      status,

      failureReason: paymentIntent.cancellation_reason ?? null,

      paidAt:
        paymentIntent.status === "succeeded"
          ? new Date(paymentIntent.created * 1000)
          : null,
    };

    await db.insert(payments).values(data);

  } catch (error) {
    console.error("Error saving payment:", error);
    throw error;
  }
}