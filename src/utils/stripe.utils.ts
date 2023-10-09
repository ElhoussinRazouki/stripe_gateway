import { Stripe } from "stripe";
import memoize from 'memoizee';
import dotenv from 'dotenv';
dotenv.config();

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16',
});

// subscribe to a plan
export async function subscribe(productId: string) {
    const amount = await getProductPrice(productId);
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency : "usd",
    })
    return paymentIntent.client_secret;
}

// handle events that came from stripe webhook
export const handleEvent = async (body: string, signature: any) => {
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

    console.log(`event of type ${event.type}`);
}

// buy credits
export async function buyCredits(productId : string, quantity : number){
    const amount = await getProductPrice(productId);
    const paymentIntent = await stripe.paymentIntents.create({
        amount : (amount*quantity),
        currency : "usd",
    })
    return paymentIntent.client_secret;
}

// get plans
export const getSubscriptionPlans = memoize(async () => {
    const list = await stripe.plans.list().then(plans => plans.data.filter(plan => plan.active));
    const productsIds = [...new Set(list.map(plan => plan.product))] as string[];
    const plans = (await stripe.products.list({ ids: productsIds })).data
    return plans
} , { maxAge: 1000 * 60 * 5 }); 

// get product price
async function getProductPrice(productId: string) {
    if (!productId) throw new Error('Product Id is required');
    const price = await stripe.products.retrieve(productId).then(price => stripe.prices.retrieve(price.default_price as string))
    return price.unit_amount as number;
}