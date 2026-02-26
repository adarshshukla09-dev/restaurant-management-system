import { savePaymentToDB } from "@/server-actions/payment/route";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import savePaymentToDB from "@/server-actions/payment"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text(); // IMPORTANT: raw body
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(
      err instanceof Error ? err.message : "Webhook Error",
      { status: 400 }
    );
  }

  // Handle successful payment
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    await savePaymentToDB(paymentIntent);
  }

  return NextResponse.json({ received: true });
}