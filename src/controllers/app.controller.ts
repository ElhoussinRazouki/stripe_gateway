import { Request, Response, NextFunction } from 'express';
import { buildUrl, toList } from '../utils/buildHelpers';
import { subscribe, buyCredits, getSubscriptionPlans } from '../utils/stripe.utils';


// available url's
export const index = async (req: Request, res: Response) =>
toList({
    subscribe: await buildUrl(req, 'subscribe'),
    plans: await buildUrl(req, 'plans'),
    credits: await buildUrl(req, 'credits')
}).then(res.json.bind(res))

// getPublishableKey
export async function getPublishableKeyController(req: Request, res: Response, next: NextFunction) {
    toList({publishableKey: process.env.STRIPE_PUBLISHABLE_KEY}).then(res.json.bind(res)).catch(next)
}

// Subscribe to a plan
export async function subscribeController(req: Request, res: Response, next: NextFunction) {
    subscribe(req.body.productId).then(clientSecret => toList({clientSecret})).then(res.json.bind(res)).catch(next)
}

// buy credits
export async function buyCreditsController(req: Request, res: Response, next: NextFunction) {
    buyCredits(req.body.productId, req.body.quantity).then(clientSecret => toList({clientSecret})).then(res.json.bind(res)).catch(next)
}

// get plans
export async function getPlansController(req: Request, res: Response, next: NextFunction) {
    getSubscriptionPlans().then(toList).then(res.json.bind(res)).catch(next)
}

// error handler
export async function errorHandlerController(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(400).json({ message: err.message });
    next();
}