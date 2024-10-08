const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "content": String,
    "date": Date
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
