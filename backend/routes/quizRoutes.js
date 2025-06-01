const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')

router.post('/create-quiz', quizController.createQuiz)
router.get('/get-quiz', quizController.getAllQuiz)
router.get('/get-quiz/user/:userId', quizController.getUserQuiz)
module.exports = router