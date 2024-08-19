const Podcasts = require('../models/podcasts');
const { Types } = require('mongoose');

const getAllPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcasts.find({})
        res.json(podcasts)
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const getSinglePodcast = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('podcast not found');
        const podcast = await Podcasts.findOne({ _id: new Types.ObjectId(id) });
        if (!podcast) throw new Error('podcast not found');
        res.json(podcast);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const updateSinglePodcast = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPodcastObj = req.body;
        if (!id) throw new Error('podcast not found');
        const podcast = await Podcasts.findOne({ _id: new Types.ObjectId(id) });
        if (!podcast) throw new Error('podcast not found');
        await Podcasts.updateOne({ _id: new Types.ObjectId(id) }, { $set: updatedPodcastObj });
        const updatedPodcast = await Podcasts.findOne({ _id: new Types.ObjectId(id) });
        res.json(updatedPodcast);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const addSinglePodcast = async (req, res) => {
    try {
        const { podcastId } = req.params;
        const newPodcastObj = req.body;
        const newPodcast = await Podcasts.create({ ...newPodcastObj, podcastId: new Types.ObjectId(podcastId) });
        res.json(newPodcast);
    } catch (e) {
        res.status(404).json({ error: e.message });
        console.error(e.message);
    }
}

const deleteSinglePodcast = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Podcasts.deleteOne({ _id: new Types.ObjectId(id) });

        if (result.deletedCount === 1) {
            res.json("Deleted successfully!");
        } else {
            res.status(404).json({ error: "Podcast not found or error occurred." });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
        console.error(e.message);
    }
}


module.exports = { getAllPodcasts, getSinglePodcast, updateSinglePodcast, addSinglePodcast, deleteSinglePodcast };