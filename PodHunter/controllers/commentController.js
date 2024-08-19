const Comments = require('../models/comments');
const { Types } = require('mongoose');

const getAllComments = async (req, res) => {
    try {
        const { podcastId } = req.params;
        const comments = await Comments.find({ podcastId: new Types.ObjectId(podcastId) })
        res.json(comments)
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const getSingleComment = async (req, res) => {
    try {
        const { id, podcastId } = req.params;
        if (!id) throw new Error('comment not found');
        const comment = await Comments.findOne({ _id: new Types.ObjectId(id), podcastId: new Types.ObjectId(podcastId) })
        if (!comment) throw new Error('comment not found');
        res.json(comment)
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const addSingleComment = async (req, res) => {
    try {
        const { podcastId } = req.params;
        const newCommentObj = req.body;
        const newComment = await Comments.create({ ...newCommentObj, podcastId, date: new Date() });
        res.json(newComment);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const updateSingleComment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCommentObj = req.body;
        delete updatedCommentObj.podcastId;
        delete updatedCommentObj.date;
        if (!id) throw new Error('comment not found');
        const comment = await Comments.findOne({ _id: new Types.ObjectId(id) });
        if (!comment) throw new Error('comment not found');
        await Comments.updateOne({ _id: new Types.ObjectId(id) }, { $set: updatedCommentObj });
        const updatedComment = await Comments.findOne({ _id: new Types.ObjectId(id) });
        res.json(updatedComment);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const deleteSingleComment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Comments.deleteOne({ _id: new Types.ObjectId(id) });

        if (result.deletedCount === 1) {
            res.json("Deleted successfully!");
        } else {
            res.status(404).json({ error: "Comment not found or error occurred." });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
        console.error(e.message);
    }
}

module.exports = { getAllComments, getSingleComment, addSingleComment, updateSingleComment, deleteSingleComment };