import express from "express"
import { createComment, deleteComment, getPostComments, likeUnlikeComment } from "../controllers/commentControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/post/:postId", protectRoute, getPostComments)
router.post("/create", protectRoute, createComment)
router.put("/like/:commentId", protectRoute, likeUnlikeComment)
router.delete("/delete/:commentId", protectRoute, deleteComment)

export default router