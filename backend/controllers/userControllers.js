import mongoose from "mongoose"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"

export const getUserProfile = async (req, res) => {
    try {
        const { query } = req.params

        let user

        if(mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select("-password")
        } else {
            user = await User.findOne({ username: query }).select("-password")
        }

        if(!user) return res.status(404).json({ error: "User not found." })

        res.status(200).json(user)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { userId } = req.params
        const loggedInUserId = req.user.userId

        const userToFollow = await User.findById(userId)
        const loggedInUser = await User.findById(loggedInUserId)

        if(!userToFollow || !loggedInUser) return res.status(404).json({ error: "User not found." })
        if(userId === loggedInUserId.toString()) return res.status(400).json({ error: "You cannot follow or unfollow yourself." })

        const isFollowing = loggedInUser.following.includes(userId)

        if(isFollowing) {
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: userId }}, { new: true })
            await User.findByIdAndUpdate(userId, { $pull: { followers: loggedInUserId }}, { new: true })
            return res.status(200).json({ msg: "User has been unfollowed." })
        } else {
            await User.findByIdAndUpdate(loggedInUserId, { $push: { following: userId }}, { new: true })
            await User.findByIdAndUpdate(userId, { $push: { followers: loggedInUserId }}, { new: true })
            return res.status(200).json({ msg: "User has been followed." })
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { fullName, username, email, password, bio } = req.body
        let { profilePicture } = req.body
        const { userId } = req.params
        const loggedInUserId = req.user.userId

        if(userId !== loggedInUserId.toString()) return res.status(403).json({ error: "User is not able to update other user's profile." })

        let user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(password) {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        if(profilePicture) {
            if(user.profilePicture) {
                await cloudinary.uploader.destroy(user.profilePicture.split("/").pop().split(".")[0])
            }

            const uploadedResponse = await cloudinary.uploader.upload(profilePicture)
            profilePicture = uploadedResponse.secure_url
        }

        user.fullName = fullName || user.fullName
        user.username = username || user.username
        user.email = email || user.email
        user.profilePicture = profilePicture || user.profilePicture
        user.bio = bio || user.bio

        user = await user.save()

        const { password: pass, ...userInfo } = user._doc

        res.status(200).json(userInfo)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId

        const user = await User.findById(loggedInUserId)
        if(!user) return res.status(404).json({ error: "User not found." })

        const following = user.following

        const suggestedUsers = await User.find({
            $and: [
                { _id: { $nin: following }},
                { _id: { $ne: loggedInUserId }}
            ]
        }).limit(5).select("-password")

        res.status(200).json(suggestedUsers)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUserFollowers = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId).select("-password").populate({ path: "followers", select: "profilePicture username"})
        if(!user) return res.status(404).json({ error: "User not found." })

        const followers = user.followers

        res.status(200).json(followers)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUserFollowings = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId).select("-password").populate({ path: "following", select: "profilePicture username"})
        if(!user) return res.status(404).json({ error: "User not found." })

        const followings = user.following

        res.status(200).json(followings)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const searchForUsers = async (req, res) => {
    try {
        const { searchTerm } = req.query
        const loggedInUserId = req.user.userId

        const users = await User.find({ _id: { $ne: loggedInUserId }, $or: [
            { fullName: { $regex: searchTerm, $options: "i"}},
            { username: { $regex: searchTerm, $options: "i"}}
        ]}).select("_id profilePicture username")

        res.status(200).json(users)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}