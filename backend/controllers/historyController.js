const History = require('../models/History')

const addUserToSessionHistory = async (req, res) => {
     try {
       const user = req.id

        const {tutorId, quizId} = req.body
    
     const userHistory = await History.create({
         userId: user,
         tutorId,
         quizId
    })

      res.status(201).json({
         message: 'User history fetched successfully.',
         userHistory
      })

     } catch(error) {
        console.log('Error fetching user history', error)  
        return res.status(500).json({
            message:'Error fetching user history', error
        })
     }
    
    }

  const getUserSessionHistory = async (req, res) => {

       try {
         const user = req.id

         const userHistory = await History.find({
             userId: user
         }).populate("tutorId", "topic subject duration name")
           .populate("userId", "username")

         res.status(201).json('User history fetched successfully.', userHistory)

       } catch(error) {
         console.log('failed to fetch user history', error)
         return res.status(500).json({
            message:'failed to fetch user history'
         })
       } 
  }

 module.exports = {
     addUserToSessionHistory,
     getUserSessionHistory
 }