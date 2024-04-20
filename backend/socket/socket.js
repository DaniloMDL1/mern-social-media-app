import { createServer } from "http"
import { Server } from "socket.io"
import express from "express"

const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

const usersSocket = {}

export const getReceiverSocketId = (receiverId) => {
    return usersSocket[receiverId]
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId

    if(userId) {
        usersSocket[userId] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(usersSocket))

    socket.on("disconnect", () => {

        io.emit("getOnlineUsers", Object.keys(usersSocket))

        delete usersSocket[userId]
    })
})

export { app, io, server }