import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { name, amount, quantity, tableSessionId } = await req.json();

    if (!tableSessionId) {
      return NextResponse.json(
        { error: "Missing tableSessionId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      metadata: {
        tableSessionId, // ✅ important
      },

      payment_intent_data: {
        metadata: {
          tableSessionId,
        },
      },

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name,
            },
            unit_amount: amount, // must be in paise
          },
          quantity,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Checkout creation failed" },
      { status: 500 }
    );
  }
}