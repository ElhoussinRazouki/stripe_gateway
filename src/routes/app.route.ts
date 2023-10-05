import express, { Router } from "express";
import { Subscribe } from "../utils/stripe/subsciption";
import { Webhook } from "../utils/stripe/webHook";

export const router = Router();


router.get('/', (req, res) => {
    res.json({
        message: 'payment service'
    });
})

router.post('/payment', (req, res) => {
    Subscribe(req.body.productId).then((URL) => res.json({
        url: URL
    })).catch((err) => {
        res.json({
            message: err.message
        })
    })
})

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
    const body = request.body;
    Webhook(body, sig as string);
})
  