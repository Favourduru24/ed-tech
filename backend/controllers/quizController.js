const mongoose = require('mongoose')
const Quiz = require('../models/Quiz')
const {generateText} = require('ai')
const {google} = require('@ai-sdk/google')

const createQuiz = async (req, res, next) => {
      
    const session = await mongoose.startSession()

     try {

       await session.withTransaction(async () => {
        
         const {name, subject, visibility, voice, voicePattern, duration, topic, user, amount, level} = req.body

          const missingFields = []
          if(!name) missingFields.push('name')
          if(!subject) missingFields.push('subject')
          if(!visibility) missingFields.push('visibility')
          if(!voice) missingFields.push('voice')
          if(!voicePattern) missingFields.push('voicePattern')
          if(!duration) missingFields.push('duration')
          if(!topic) missingFields.push('topic')
          if(!amount) missingFields.push('amount')
          if(!user) missingFields.push('user')
          if(!level) missingFields.push('level')

            let questions;
  try {
    const response =  await generateText({
        model: google("gemini-2.0-flash-001"),
        prompt: ` Generate ${amount} multiple-choice ${subject} questions.
                      Topic: ${topic}
                      Difficulty level: ${level} (e.g., beginner, intermediate, advanced)
                      Please return only the questions, without any additional text.

                      Each question should have 4 answer options labeled A–D.
                      After each question, include the correct answer and a brief explanation.

                      Format the output as:
                      [
                        "Question: What is 2 + 2? A. 3 B. 4 C. 5 D. 6",
                        "Correct answer: B. Because 2 + 2 = 4.",
                        ...
                      ]

                      Keep the language concise and suitable for audio delivery.
                      Avoid using symbols like *, /, or [].
                      Ensure the content is easy to understand and appropriate for learners worldwide.
                      
                      Thank you! <3`
     });

    questions = response.text;
    if (!questions) {
        console.error('AI returned empty response:', response);
        return res.status(400).json({
            message: 'AI returned empty response'
        });
    }
} catch (aiError) {
    console.error('AI call failed:', aiError);
    return res.status(500).json({
        message: 'Failed to generate questions from AI'
    });
}

          const quiz = await Quiz.create([{
        name,
        subject,
        visibility,
        voice,
        voicePattern,
        duration,
        topic,
        questions,
        userId: user,
        level
      }], { session });

         if(!quiz) {
             return res.status(400).json({
                message: 'Something went wrong creating Quiz!'
             })
         }

         res.status(201).json(quiz[0]);
         
       })

     } catch(error) {
       next(error)
       console.log(error, 'Error creating Quiz')
       return res.status(500).json({message: 'Something went wrong!'})
     }
}

 const getAllQuiz = async (req, res) => {
  
     try {
        
        const {level = '', subject = '', search = '', page = 1, limit = 1} = req.query

         const subjectCondition = subject ? { subject: {$regex: subject, $options: 'i' } } : {};
         const levelCondition = level ? {level: {$regex: level, $options: 'i' } } : {};
         const topicCondition = search ? {topic: {$regex: search, $options: 'i' } } : {};

         const conditions = {
           $and: [
            subjectCondition,
            levelCondition,
            topicCondition
           ].filter(cond => Object.keys(cond).length > 0)
         }

         const skipCount = (page - 1) * limit
       
        const quiz = await Quiz.find(conditions)
                                .populate("userId", "username")
                                .sort({createdAt: -1})
                                .skip(skipCount)
                                .limit(limit)

        if(!quiz?.length) {
             return res.status(400).json({
                 message: 'No Quiz found'
             })
        }

        const quizCount = await Quiz.countDocuments(conditions)

        return res.status(201).json({
           message: 'Quiz fetched successfully.',
            quiz,
            totalPages: Math.ceil(quizCount / limit)
        })

     } catch(error) {
         console.log(error, 'Something went wront fetching quiz.')
         return res.status(500).json({
            message: 'Something went wrong fetching quiz.'
         })
     }

 }

  const getUserQuiz = async (req, res) => {
     try {
       const user = req.params.userId

        if(!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({
             message: 'Invalid ID format!'
           })
        }

        const userQuiz = await Quiz.find({userId: user})

       if(!userQuiz) {
         return res.status(400).json({
           message: 'No user quiz found!'
         })
       }

        res.status(201).json({
           message: 'User quiz fetched successfully.',
            userQuiz
        })
     } catch (error) {
       console.log('Something went wrong fetching user quiz.', error)
     }
  }

module.exports = {
     createQuiz,
     getAllQuiz,
     getUserQuiz
}