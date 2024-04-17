import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { getConversationMessages, sendMessage } from "../controllers/messageControllers.js"

const router = express.Router()

router.get("/conversation/:conversationId", protectRoute, getConversationMessages)
router.post("/send", protectRoute, sendMessage)

export default router