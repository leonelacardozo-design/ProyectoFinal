import express from "express";
import { createPreference } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-preference", createPreference);

export default router;
