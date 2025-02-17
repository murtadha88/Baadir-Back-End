const express = require('express')
const User = require('../models/User')
const Application = require('../models/Application')

const router = express.Router()

router.get("/applications", async (req,res) => {
    try {
        const foundApplication = await Application.find()
        res.status(200).json(foundApplication)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.get("/", (req,res) => {
    res.send("GG");
})

module.exports = router
