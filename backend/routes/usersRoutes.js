const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
.get(usersController.getAllUser)
.post(usersController.createUser)

module.exports = router