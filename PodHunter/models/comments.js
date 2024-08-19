const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "text": String,
    "podcastId": { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' },
    "date": Date
});

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;