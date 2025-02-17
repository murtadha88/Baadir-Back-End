const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Accepeted', 'Rejected', 'In Progress']
    },
    eventId: { type: String },
    userId: { type: String }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;