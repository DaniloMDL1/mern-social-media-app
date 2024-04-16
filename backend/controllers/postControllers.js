import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"
import { v2 as cloudinary } from "cloudinary"

export const createPost = async (req, res) => {
    try {
        const { desc, userId } = req.body
        let { postPicture } = req.body
        const loggedInUserId = req.user.userId

        if(!userId || !desc || !postPicture) return res.status(400).json({ error: "Description and picture for a post are required." })

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(user._id.toString() !== loggedInUserId.toString()) return res.status(403).json({ error: "User is not authorized to create a post." })

        if(postPicture) {
            const uploadedResponse = await cloudinary.uploader.upload(postPicture)
            postPicture = uploadedResponse.secure_url
        }

        const newPost = new Post({
            desc,
            postPicture,
            userId
        })
        const savedPost = await newPost.save()

        res.status(201).json(savedPost)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const loggedInUserId = req.user.userId

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({ error: "Post not found." })

        if(post.userId.toString() !== loggedInUserId.toString()) return res.status(403).json({ error: "User is not authorized to delete a post." })

        if(post.postPicture) {
            await cloudinary.uploader.destroy(post.postPicture.split("/").pop().split(".")[0])
        }

        await Comment.deleteMany({ postId })
        await Post.findByIdAndDelete(postId)

        res.status(200).json({ msg: "Post has been successfully deleted." })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const { postId } = req.params
        const loggedInUserId = req.user.userId

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({ error: "Post not found." })

        const isLiked = post.likes.includes(loggedInUserId)

        if(isLiked) {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: loggedInUserId }}, { new: true })
            return res.status(200).json({ msg: "Post has been unliked." })
        } else {
            await Post.findByIdAndUpdate(postId, { $push: { likes: loggedInUserId }}, { new: true })
            return res.status(200).json({ msg: "Post has been liked." })
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const { postId } = req.params

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({ error: "Post not found." })

        res.status(200).json(post)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params

        const user = await User.findOne({ username })
        if(!user) return res.status(404).json({ error: "User not found." })

        const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 })

        res.status(200).json(posts)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId

        const user = await User.findById(loggedInUserId)
        if(!user) return res.status(404).json({ error: "User not found." })

        const following = user.following

        const posts = await Post.find({ userId: { $in: following }}).sort({ createdAt: -1 })

        res.status(200).json(posts)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}