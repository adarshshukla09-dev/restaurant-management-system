// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2026-01-28.clover",
// });
//  const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//         //     name: product.name,
//         //     images: [product.image],
//           },
//         //   unit_amount: product.price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/cancel",
//   });