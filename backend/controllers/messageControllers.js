import Message from "../models/messageModel.js"

export const sendMessage = async (req, res) => {
    try {
        const { conversationId, message, senderId, receiverId } = req.body

        if(!conversationId || !message || !senderId || !receiverId) return res.status(400).json({ error: "User is not able to send a message."})

        const newMessage = new Message({
            conversationId,
            message,
            senderId,
            receiverId
        })
        const savedMessage = await newMessage.save()

        res.status(201).json(savedMessage)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params

        const messages = await Message.find({ conversationId })

        res.status(200).json(messages)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}