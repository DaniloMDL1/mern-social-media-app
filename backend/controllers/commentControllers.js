import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"

export const createComment = async (req, res) => {
    try {
        const { comment, userId, postId } = req.body
        const loggedInUserId = req.user.userId

        if(!comment || !userId || !postId) return res.status(400).json({ error: "Comment, userId and postId is required." })

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(user._id.toString() !== loggedInUserId.toString()) return res.status(403).json({ error: "User is not authorized to create a comment." })

        const newComment = new Comment({
            comment,
            userId,
            postId
        })
        const savedComment = await newComment.save()

        res.status(201).json(savedComment)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const loggedInUserId = req.user.userId

        const comment = await Comment.findById(commentId)
        if(!comment) return res.status(404).json({ error: "Comment not found." })

        if(comment.userId.toString() !== loggedInUserId.toString()) return res.status(403).json({ error: "User is not authorized to delete a comment." })

        await Comment.findByIdAndDelete(commentId)

        res.status(200).json({ msg: "Comment has been successfully deleted." })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const likeUnlikeComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const loggedInUserId = req.user.userId

        const comment = await Comment.findById(commentId)
        if(!comment) return res.status(404).json({ error: "Comment not found." })

        const isLiked = comment.likes.includes(loggedInUserId)

        if(isLiked) {
            await Comment.findByIdAndUpdate(commentId, { $pull: { likes: loggedInUserId }}, { new: true })
            return res.status(200).json({ msg: "Comment has been unliked." })
        } else {
            await Comment.findByIdAndUpdate(commentId, { $push: { likes: loggedInUserId }}, { new: true })
            return res.status(200).json({ msg: "Comment has been liked." })
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({ error: "Post not found." })

        const comments = await Comment.find({ postId }).sort({ createdAt: -1 })

        res.status(200).json(comments)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}