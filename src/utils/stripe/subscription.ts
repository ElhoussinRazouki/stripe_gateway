import { stripe } from ".";

export async function SubscribeTo(productId: string) {
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
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000',
  });

  return session.url;
}