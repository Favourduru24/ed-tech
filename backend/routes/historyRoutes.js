const express = require('express')
const { addUserToSessionHistory, getUserSessionHistory } = require('../controllers/historyController')
const router = express.Router()
const jwtVerify = require('../middleware/verifyJwt')

 router.post('/add-user-history', jwtVerify, addUserToSessionHistory)
 router.get('/get-user-history', getUserSessionHistory)

 module.exports = router