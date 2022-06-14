const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    body: { type: String, required: true, minLength: 5, maxLength: 300 },
    date: { type: Number },
    userId: { type: String },
    username: { type: String },
    newsUrl: { type: String },
    likeCount: { type: Number },
    dislikeCount: { type: Number },
});

module.exports = mongoose.model('Comment', commentSchema);