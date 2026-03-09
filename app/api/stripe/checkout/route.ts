import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { name, amount, tableSessionId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    metadata: {
      tableSessionId,
    },

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}