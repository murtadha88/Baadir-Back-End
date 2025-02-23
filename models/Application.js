const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: "Event"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;