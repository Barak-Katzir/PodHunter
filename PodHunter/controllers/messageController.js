const Messages = require('../models/message');
const { Types } = require('mongoose');

const getAllMessages = async (req, res) => {
    try {
        const contactUs = await Messages.find({})
        res.json(contactUs)
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('message not found');
        const message = await Messages.findOne({ _id: new Types.ObjectId(id) })
        if (!message) throw new Error('message not found');
        res.json(message)
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const addMessage = async (req, res) => {
    try {
        const newMessageObj = req.body;
        const newMessage = await Messages.create({ ...newMessageObj, date: new Date() });
        res.json(newMessage);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMessageObj = req.body;
        if (!id) throw new Error('message not found');
        const message = await Messages.findOne({ _id: new Types.ObjectId(id) });
        if (!message) throw new Error('message not found');
        await Messages.updateOne({ _id: new Types.ObjectId(id) }, { $set: updatedMessageObj });
        const updatedMessage = await Messages.findOne({ _id: new Types.ObjectId(id) });
        res.json(updatedMessage);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Messages.deleteOne({ _id: new Types.ObjectId(id) });

        if (result.deletedCount === 1) {
            res.json("Deleted successfully!");
        } else {
            res.status(404).json({ error: "Message not found or error occurred." });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
        console.error(e.message);
    }
}



module.exports = { getAllMessages, addMessage, getMessage, editMessage, deleteMessage };