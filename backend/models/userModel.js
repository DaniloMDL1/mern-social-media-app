import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        followers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },
        following: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },
        bio: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User