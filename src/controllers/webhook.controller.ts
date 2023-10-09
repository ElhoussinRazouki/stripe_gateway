import { Request, Response, NextFunction } from 'express';
import { handleEvent } from '../utils/stripe.utils';





// stripe event handler
export async function WebHook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    handleEvent(req.body, sig).then(() => res.send()).catch(console.log)
}


//(err) => res.status(400).send(`Webhook Error ${err.message}`)