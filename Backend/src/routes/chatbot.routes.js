import { Router } from "express";
import { saveChat, getChatHistory } from "../controllers/chatbotController.js";

const router = Router();

router.post("/save", saveChat);

router.get("/history/:userId", getChatHistory);

export default router;
