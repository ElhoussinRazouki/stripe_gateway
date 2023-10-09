import  { Router } from "express";
import { errorHandlerController, subscribeController, buyCreditsController, getPlansController, index, getPublishableKeyController } from "../controllers/app.controller";

export const router = Router();

// index
router.get('/', index)

// getPublishableKey
router.get('/PublishableKey', getPublishableKeyController)
// subscribe to a plan
router.post('/subscribe', subscribeController)

// buy credits
router.post('/credits', buyCreditsController)

// get plans
router.get('/plans', getPlansController)

  

// error handler
router.use(errorHandlerController);