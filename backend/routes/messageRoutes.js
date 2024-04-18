import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { deleteMessage, getConversationMessages, sendMessage } from "../controllers/messageControllers.js"

const router = express.Router()

router.get("/conversation/:conversationId", protectRoute, getConversationMessages)
router.post("/send", protectRoute, sendMessage)
router.delete("/delete/:messageId", protectRoute, deleteMessage)

export default router