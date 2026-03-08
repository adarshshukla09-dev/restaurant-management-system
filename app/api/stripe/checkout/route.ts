import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { name, amount, tableSessionId } = await req.json();

    if (!tableSessionId) {
      return NextResponse.json(
        { error: "Missing tableSessionId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      metadata: {
        tableSessionId,
      },

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name,
            },
            unit_amount: amount, // amount in paise
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Checkout creation failed" },
      { status: 500 }
    );
  }
}