require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const podcastsRouter = require('./routes/podcasts');
const commentsRouter = require('./routes/comments');
const messagesRouter = require('./routes/messages');

const app = express()
const PORT = 3000

app.use(express.json());
app.use('/podcast', podcastsRouter);
app.use('/comment', commentsRouter);
app.use('/message', messagesRouter);
app.use(express.static('public'));

try {
    mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
} catch (e) {
    console.error(e);
}