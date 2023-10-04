import { Router } from "express";
import { Subscribe } from "../utils/subsciption";

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