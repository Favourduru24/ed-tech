const express = require('express')
const { addUserToSessionHistory, getUserQuizHistory, getUserTutorHistory} = require('../controllers/historyController')
const router = express.Router()
const jwtVerify = require('../middleware/verifyJwt')

 router.post('/add-user-history', jwtVerify, addUserToSessionHistory)
 router.get('/get-user-quiz-history', jwtVerify, getUserQuizHistory)
 router.get('/get-user-tutor-history', jwtVerify, getUserTutorHistory)

 module.exports = router