import express from "express"
import { createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost } from "../controllers/postControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/feed", protectRoute, getFeedPosts)
router.get("/user/:username", getUserPosts)
router.get("/:postId", getPost)
router.post("/create", protectRoute, createPost)
router.put("/like/:postId", protectRoute, likeUnlikePost)
router.delete("/delete/:postId", protectRoute, deletePost)

export default router