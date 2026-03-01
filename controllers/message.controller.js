const Message = require('../models/message.model.js');

const createMessage = async (req, res) => {
try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {  
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newMessage = new Message({
        name,
        email,
        message
    });
    console.log("New message to be saved:", newMessage);
    await newMessage.save();
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}

}

const AllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


const DeleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        console.log("Deleted message:", deletedMessage);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    createMessage,
    DeleteMessage,
    AllMessages     
};