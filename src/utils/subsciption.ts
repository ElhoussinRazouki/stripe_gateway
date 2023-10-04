import { Stripe } from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

export async function Subscribe(productId: string) {
  if (!productId) throw new Error('Product Id is required');
  const product = await stripe.products.retrieve(productId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal'],
    line_items: [
      {
        price: product.default_price?.toString(),
        "quantity": 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
  return session.url;
}