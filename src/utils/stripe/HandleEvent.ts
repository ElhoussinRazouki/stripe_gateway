import { STRIPE_WEBHOOK_SECRET, stripe } from ".";


export const HandleEvent = async (body: string, signature: any) => {
  const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

  console.log(`event of type ${event.type}`);

}