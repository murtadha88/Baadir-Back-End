const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    volunteers: {
        type: Number,
        required: true
    },
    applicationDeadLine: {
        type: Date,
        required: true
    },
    comments: [commentSchema],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },
    { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;