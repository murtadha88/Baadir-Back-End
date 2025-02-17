const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get("/applications", (req,res) => {
    
})


router.get("/", (req,res) => {
    res.send("GG");
})

router.get("/events", (req, res) => {
    res.send('Events')
})

module.exports = router
