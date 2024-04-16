import express from "express"
import { followUnfollowUser, getSuggestedUsers, getUserFollowers, getUserFollowings, getUserProfile, searchForUsers, updateUserProfile } from "../controllers/userControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/suggested", protectRoute, getSuggestedUsers)
router.get("/search", protectRoute, searchForUsers)
router.get("/followers/:userId", protectRoute, getUserFollowers)
router.get("/following/:userId", protectRoute, getUserFollowings)
router.get("/profile/:query", getUserProfile)
router.put("/follow/:userId", protectRoute, followUnfollowUser)
router.put("/profile/update/:userId", protectRoute, updateUserProfile)

export default router