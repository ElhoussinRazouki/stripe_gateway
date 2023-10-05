import  { Router } from "express";
import { ErrorHandler, Subscribe } from "../controllers/app.controller";

export const router = Router();


router.get('/', (req, res) => {
    res.json({
        message: 'payment service'
    });
})

// subscribe to a plan
router.post('/subscribe', Subscribe)

// error handler
router.use(ErrorHandler);