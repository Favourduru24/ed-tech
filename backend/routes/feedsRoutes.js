const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feedController')


router.route('/')
.post(feedController.createFeed)
.get(feedController.getAllFeed)

router.get('/feed/:id', feedController.getFeedById)
router.put('/feed/:id', feedController.updateFeed)
router.put('/feed/:id', feedController.likeFeed)


module.exports = router