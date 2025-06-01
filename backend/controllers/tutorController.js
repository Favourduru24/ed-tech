const mongoose = require('mongoose')
const Tutor = require('../models/Tutor')

const createTutor = async (req, res, next) => {
      
    const session = await mongoose.startSession()

     try {

       await session.withTransaction(async () => {
        
         const {name, subject, visibility, voice, voicePattern, duration, topic, user} = req.body

          const missingFields = []
          if(!name) missingFields.push('name')
          if(!subject) missingFields.push('subject')
          if(!visibility) missingFields.push('visibility')
          if(!voice) missingFields.push('voice')
          if(!voicePattern) missingFields.push('voicePattern')
          if(!duration) missingFields.push('duration')
          if(!topic) missingFields.push('topic')
          if(!user) missingFields.push('user')

          const tutor = await Tutor.create([{
        name,
        subject,
        visibility,
        voice,
        voicePattern,
        duration,
        topic,
        userId: user
      }], { session });

         if(!tutor) {
             return res.status(400).json({
                message: 'Something went wrong creating tutor!'
             })
         }

         res.status(201).json(tutor[0]);
         
       })

     } catch(error) {
         next(error)
       console.log(error, 'Error creating tutor')
       return res.status(500).json({message: 'Something went wrong!'})
     }
}

  const getAllTutor = async (req, res) => {
     try {
            const {subject = '', duration = '', search = '', page = 1, limit = 1} = req.query

            const subjectCondition = subject ? { subject: { $regex: subject, $options: 'i' } } : {};
            const durationCondition = duration ? { duration: { $regex: duration, $options: 'i' } } : {};
            const topicCondition = search ? {topic: {$regex: search, $options: 'i' } } : {};

            const conditions = {
               $and:[
                 subjectCondition,
                 durationCondition,
                 topicCondition
               ].filter(cond => Object.keys(cond).length > 0)
            }

           const skipAmount = (page - 1) * limit 

          const tutor = await Tutor.find(conditions)
                                    .populate("userId", "username")
                                    .skip(skipAmount)
                                    .limit(limit)
                                    .sort({createdAt: -1})
                          

        if(!tutor?.length) {
             return res.status(404).json({
                 message: 'No Tutors found!'
             })
        }

         const tutorCount = await Tutor.countDocuments(conditions)

         return res.status(200).json({
           message: 'Tutor fetched successfully!',
           tutor,
           totalPages: Math.ceil(tutorCount / limit)
         });


     } catch(error) {
         console.log(error, 'Something went wrong!')
         return res.status(500).json({message: 'Something went wrong!'})
     }
  }

   const getTutorById = async (req, res) => {

     try {

      const {id} = req.params

     if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({
        message: 'Invalid Id format'
       })
     }

     const tutor = await Tutor.findById(id)
                               .populate("userId", "username id")

     if(tutor._id?.toString() !== id) {
       return res.status(400).json({message: 'Not matching ID'})
     }

     const tutorId = await tutor

     return res.status(201).json({
       message: 'Tutor fetched successfully.', tutorId
     })
     } catch(error) {
       console.log(error, 'Something went wrong fetching tutorId')
     }

   }
   
    const getUserTutor = async (req, res) => {
       try {
           const user = req.params.userId

            const userTutor = await Tutor.find({userId: user}).populate("userId", "username")

             if(!userTutor) {
               return res.status(400).json({
                message: 'No Tutor found'
               })
             }

            res.status(201).json({
               message: 'User tutor fetched successfully.',
                userTutor
            })
       } catch(error) {
         console.log('Something went wrong fetching User Feed!')
       }
    }

module.exports = {
     createTutor,
     getAllTutor,
     getTutorById,
     getUserTutor
}