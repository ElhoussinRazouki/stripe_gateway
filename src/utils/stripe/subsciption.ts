import { stripe } from ".";

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