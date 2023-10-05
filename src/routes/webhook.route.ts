import express, { Router } from "express";
import { WebHook } from "../controllers/webhook.controller";

export const webHookRouter = Router();


// webhook endpoint for stripe
webHookRouter.post('/', express.raw({type: 'application/json'}), WebHook)