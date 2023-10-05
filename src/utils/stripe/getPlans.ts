import { stripe } from "."


export const getPlans = async () => {
    const list = await stripe.products.list({ active: true , type: 'service' })
    return list;
}