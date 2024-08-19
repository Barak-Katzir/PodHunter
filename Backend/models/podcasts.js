const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    "name": String,
    "description": String,
    "rank": Number,
    "category": { type: String, enum: ['Sports', 'Tech', 'Science', 'Every Day', 'Economy', 'Comedy', 'Show', 'News', 'Music'] },
    "picture": String,
    "link": String
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;