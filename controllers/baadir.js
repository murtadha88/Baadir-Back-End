const express = require('express')
const User = require('../models/User')
const Application = require('../models/Application')
const Event = require("../models/Event")
const router = express.Router()

router.get("/applications", async (req,res) => {
    try {
        const foundApplication = await Application.find()
        res.status(200).json(foundApplication)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})


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

router.get("/events", async (req, res) => {
    try {
        const eventsList = await Event.find();
        res.status(200).json(eventsList)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

//show each event by company
router.get("/companyEvents/:eventId", verifyToken, async (req, res) => {
    try {
      const eventId = await Event.findById(req.params.eventId).populate("userId");
      res.status(200).json(eventId);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
// delete event by company
  router.delete("/events/:eventId", verifyToken, async (req, res)=>{
    try{
        const eventId = await Event.findById(req.params.eventId);
        if(!eventId.userId.equals(req.user._id)){
            return res.status(403).send("You're not allowed to do that!");
          }
          const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
          res.status(200).json(deletedEvent);
    }
    catch(err){
        res.status(500).json({ err: err.message });
    }
  })
  router.delete("/applications/:applicationId", verifyToken, async (req, res)=>{
    try{
        const applicationId = await Application.findById(req.params.applicationId);
        if(!applicationId.userId.equals(req.user._id)){
            return res.status(403).send("You're not allowed to do that!");
          }
          const deletedApplication = await Event.findByIdAndDelete(req.params.applicationId);
          res.status(200).json(deletedApplication);
    }
    catch(err){
        res.status(500).json({ err: err.message });
    }
  })

module.exports = router
