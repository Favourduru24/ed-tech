const Feed = require('../models/Feed')
const mongoose = require('mongoose')
const Category = require('../models/Category')
const User = require('../models/User')

const createFeed = async (req, res, next) => {
  const session = await mongoose.startSession();
  
  try {
      await session.startTransaction()
      
      const { title, pitch, category, userId, image, description } = req.body;

      // More detailed validation
      const missingFields = [];
      if (!title) missingFields.push('title');
      if (!pitch) missingFields.push('pitch');
      if (!category) missingFields.push('category');
      if (!userId) missingFields.push('userId');
      if (!description) missingFields.push('description');

      if (missingFields.length > 0) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({
              message: 'Missing required fields',
              missingFields
          });
      }

      const feedObject = { title, pitch, category, image, userId, description };

      const feed = await Feed.create([feedObject], { session });

      if (!feed) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({ message: 'Feed creation failed' });
      }

      await session.commitTransaction();
      session.endSession();
      return res.status(201).json({ message: 'Feed created successfully!', feed });

  } catch (error) {
       next(error)
      await session.abortTransaction();
      session.endSession();
      console.error('Error in createFeed:', error);
      return res.status(500).json({ 
          message: 'Internal server error',
          error: error.message 
      });
  }
};

  const getCategoryByName = async (name) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
  }

  const populateFeed = async (query) => {
    return query
    .populate({path: 'userId', model: User, select: "username"})
    .populate({path: 'category', model: Category, select: "_id name"})
}
  

  const getAllFeed = async (req, res) => {
    try {
      const { search: query, page = 1, limit = 5, category = '' } = req.query; // Changed to req.query
      const numLimit = Number(limit);
      const numPage = Number(page);
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
      const categoryCondition = category ? await getCategoryByName(category) : null;
       if (category && !categoryCondition) {
       return res.status(404).json({ message: 'Category not found' });
        }

      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }

      const skipAmount = (numPage - 1) * numLimit;
  
      const feeds = await Feed.find(conditions)
        .sort({ createdAt: -1 })
        .limit(numLimit)
        .skip(skipAmount)
        .populate("userId", "username")
        .populate("category", "_id name")
  
      if(!feeds.length) return res.status(404).json({ message: 'No feed found!' });
  
      const feedsCount = await Feed.countDocuments(conditions);
      // const feedQuery = await populateFeed(feeds)
  
      return res.status(200).json({
        feeds, // Make sure this matches what your frontend expects (responseData.feeds)
        totalPages: Math.ceil(feedsCount / numLimit),
        currentPage: numPage
      });
  
    } catch(error) {
      console.error('Error fetching feeds:', error);
      return res.status(500).json({ message: 'Server error fetching feeds' });
    }
  }
 
  const getFeedById = async (req, res) => {

         try{
         const {id } = req.params

         if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }

       const feedQuery = await Feed.findById(id)
                          .populate("category", "name")
                          .populate("userId", "username")

        if(feedQuery._id.toString() !== id) {
         return res.status(400).json({message: 'No feedId found!'})
        }

         const feedId = await feedQuery

         return res.status(200).json({message: 'Fetch Feed Successfully', feedId})

      } catch(error) {
        console.log('Error fetching feedId', error)
       }
  }

  // const updateFeed = async (req, res, next) => {

  //    const session = await mongoose.startSession()

  //     try{

  //        await session.startTransaction()

  //       const {title, pitch, category, userId, image, description, id} = req.body

  //       if(!mongoose.Types.ObjectId.isValid(id)) {
  //         await session.abortTransaction()
  //         session.endSession()
  //         return res.status(400).json({message: 'Invalid ID format'})
  //       }
 
  //      const missingFields = []
        
  //       if(!title) missingFields.push('title')
  //       if(!pitch) missingFields.push('pitch')
  //       if(!category) missingFields.push('category')
  //       if(!userId) missingFields.push('userId')
  //       if(!image) missingFields.push('image')
  //       if(!description) missingFields.push('description')
  //       if(!id) missingFields.push('Id') 

  //       if(missingFields.length > 0) {
  //         await session.abortTransaction()
  //          session.endSession()
  //           return res.status(400).json({
  //              message: 'Missing required field',
  //              missingFields
  //         })

  //           }

  //        const feed = await Feed.findById(id)

  //         if(feed._id.toString() !== id){
  //           await session.abortTransaction()
  //            session.endSession()
  //            return res.status(400).json({
  //              message: 'Invalid ID format!'
  //            })
  //         }
        
  //        feed.title = title
  //        feed.pitch = pitch
  //        feed.category = category
  //        feed.description = description
  //        feed.image = image

  //        const newFeed = await Feed.updateOne([{feed}], {session})

  //        if(!newFeed) {
  //         await session.abortTransaction()
  //           session.endSession()
  //            return res.status(400).json({message: 'Something went wrong updating feed!'})
  //        }

  //       await session.commitTransaction()
  //        .endSession()
  //       res.status(201).json({message: 'Feed Updated successfully!'})

  //     } catch(error) {
  //        next(error)
  //        console.log('Error occured updating feed', error)
  //        await session.abortTransaction()
  //        session.endSession()
  //        return res.status(500).json({message: 'Something went wrong updating feed!', error: error.message})
  //     }
      
  // }


  const updateFeed = async (req, res, next) => {
    const session = await mongoose.startSession();
    
    try {
        await session.startTransaction();
        
        const { title, pitch, category, userId, image, description, id } = req.body;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Validate required fields
        const requiredFields = { title, pitch, category, userId, image, description };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({
                message: 'Missing required fields',
                missingFields
            });
        }

        // Update operation
        const updatedFeed = await Feed.findByIdAndUpdate(
            id,
            { title, pitch, category, description, image },
            { new: true, runValidators: true, session }
        );

        if (!updatedFeed) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(404).json({ message: 'Feed not found' });
        }

        await session.commitTransaction();
        await session.endSession();
        
        return res.status(200).json({
            message: 'Feed updated successfully',
            feed: updatedFeed
        });

    } catch (error) {
        // Make sure we abort transaction if anything fails
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        if (session) {
            await session.endSession();
        }
        
        console.error('Error updating feed:', error);
        return res.status(500).json({
            message: 'Failed to update feed',
            error: error.message
        });
    }
};

   const likeFeed = async (req, res) => {

        const userId = req.userId
        const id = req.params
         
         const feed = await Feed.findById(id)

          if(!userId || !id) {
             return res.status(400).json({message: 'Invalid credential recieved!'})
          }  

        if(feed.likes.includes(userId)) {
            feed.likes.pull(userId)
        } else {
           feed.likes.push(userId)
        }

        await feed.save()

        res.status(201).json({message: 'liked feed!'})
   }


module.exports = {createFeed, getAllFeed, getFeedById, updateFeed, likeFeed}