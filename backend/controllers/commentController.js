const mongoose = require('mongoose')
const Comment = require('../models/Comment')

const createComment = async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction(async () => {
            const { feedId, content } = req.body;
            const user = req.id;
            
            // Validate input
            if (!feedId || !content || !user) {
                return res.status(400).json({ message: 'Missing required fields!' });
            }
            
            if (!mongoose.Types.ObjectId.isValid(feedId)) {
                return res.status(400).json({ message: 'Invalid feed ID!' });
            }
            
            const commentObject = {
                feedId,
                content,
                userId: user
            };
            
            const comment = await Comment.create([commentObject], { session });
            
            if (!comment) {
                throw new Error('Failed to create comment');
            }
            
            // If you need to update other collections, do it here within the same transaction
            
            res.status(201).json({ message: 'Comment created successfully', comment });
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Failed to create comment' });
    } finally {
        await session.endSession();
    }
};
 
const getComment = async (req, res) => {
  try {
    const { feedId } = req.params; // Changed from req.body to req.query

    if (!mongoose.Types.ObjectId.isValid(feedId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const comment = await Comment.find({feedId: feedId});

    if (!comment) {
      return res.status(404).json({ message: 'No Comment Found!' }); // 404 is better for "Not Found"
    }

    res.json({ comment });
  } catch (error) {
    console.log('Error fetching comments', error);
    res.status(500).json({ message: 'Server error' }); // Always send a response
  }
};

    const deleteComment  = async (req, res) => {
          
        try {
         const {commentId} = req.params
             
         const comment = await Comment.findByIdAndDelete({
            _id: commentId,
            userId: req.id
         })

        if(!comment) {
              return res.status(404).json({ message: 'Comment not found' });
         }
        
            res.json({ message: 'Comment deleted' });
 
            } catch(error) {
                 console.log("Error deleting comment")
    }

    }


module.exports = {
     createComment,
     getComment,
     deleteComment
}