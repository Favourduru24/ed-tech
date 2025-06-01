const express = require('express')
const router = express.Router()
const tutorController = require('../controllers/tutorController')

router.post('/create-tutor', tutorController.createTutor)
router.get('/get-tutor', tutorController.getAllTutor)
router.get('/get-tutor/:id', tutorController.getTutorById)
router.get('/get-tutor/user/:userId', tutorController.getUserTutor)

module.exports = router