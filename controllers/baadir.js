const express = require('express')
const User = require('../models/User')
const Event = require("../models/Event")
const router = express.Router()
const verifyToken = require("../middleware/verify-token")

router.post("/event", verifyToken, async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const createEvent = await Event.create(req.body);
        createEvent._doc.userId = req.user;
        res.status(201).json(createEvent);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
router.get("/", (req, res) => {
    res.send("");
})
module.exports = router
