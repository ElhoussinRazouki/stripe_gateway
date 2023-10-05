import { Request, Response, NextFunction } from 'express';
import { SubscribeTo } from '../utils/stripe/subscription';


// Subscribe to a plan
export async function Subscribe(req: Request, res: Response, next: NextFunction) {
    SubscribeTo(req.body.productId).then((URL) => res.json({
        url: URL
    })).catch((err) => {
        res.json({
            message: err.message
        })
    })
}


// error handler
export async function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(400).json({ message: err.message });
    next();
}