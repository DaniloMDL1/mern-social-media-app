import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
    {
        desc: {
            type: String,
            required: true
        },
        postPicture: {
            type: String,
            required: true
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema)

export default Post