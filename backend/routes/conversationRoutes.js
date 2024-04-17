import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createConversation, getConversations } from "../controllers/conversationControllers.js"

const router = express.Router()

router.get("/user/:userId", protectRoute, getConversations)
router.post("/create", protectRoute, createConversation)

export default router