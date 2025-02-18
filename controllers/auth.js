const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Add bcrypt and the user model
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.post('/sign-up', async (req, res) => {
    try {

        // Check if the name is taken
        const userInDatabase = await User.findOne({ email: req.body.email })

        if(userInDatabase) {
            return res.status(409).json({ err: 'Something went wrong.'})
        }

        // Create a new user with hashed password
        const user = await User.create({
            name: req.body.name,
            hashedPassword: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS)),
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        })

        // Construct the payload
        const payload = { name: user.name, role: user.role, _id: user._id }

        // Create the token
        const token = jwt.sign({ payload, role: user.role }, process.env.JWT_SECRET)

        // Send the token instead of user
        res.status(201).json({ token })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.post('/sign-in', async(req, res) => {
    try {
        // Find user in DB
        const user = await User.findOne({ email: req.body.email })

        // If the user doesn't exist, return a 401 status code with a message
        if (!user) {
            return res.status(401).json({ err: 'Invalid credentials'})
        }

        // Check if password is correct
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.hashedPassword)

        // If the password is incorrect
        if (!isPasswordCorrect) {
            return res.status(401).json({ err: 'Invalid credentials'})
        }

        const payload = { name: user.name, role: user.role, _id: user._id }

        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(200).json({ token })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router