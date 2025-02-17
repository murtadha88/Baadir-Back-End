const express = require('express')
const User = require('../models/User')
const Event = require('../models/Event')

const router = express.Router()

router.get("/applications", (req,res) => {
    
})


router.get("/", (req,res) => {
    res.send("GG");
})

router.get("/events", async (req, res) => {
    try {
        const eventsList = await Event.find()
        res.status(200).json(eventsList)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router
