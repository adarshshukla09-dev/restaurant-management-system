import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: "2026-01-28.clover",});

export async function POST(req: Request) {
  try {
    const { name, amount, quantity } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
            },
            unit_amount: amount, // already multiplied by 100 in frontend
          },
          quantity: quantity,
        },
      ],
   
      success_url: `${process.env.BETTER_AUTH_URL}/success`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}