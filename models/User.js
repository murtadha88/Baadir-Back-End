const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
    comments: [commentSchema]
    },
    { timestamps: true }
);

const applicationSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Accepeted', 'Rejected', 'In Progress']
    },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Company', 'Volunteer'],
    },
    applications: [applicationSchema],
    event: [eventSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;