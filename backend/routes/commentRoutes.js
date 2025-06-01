 const express = require('express')
 const router = express.Router()
 const commentController = require('../controllers/commentController')
 const verifyJwt = require('../middleware/verifyJwt')

  router.post('/create-comment', verifyJwt, commentController.createComment)
  router.get('/get-comment/:feedId', commentController.getComment)
  router.delete('delete-comment/:id', commentController.deleteComment)

  module.exports = router