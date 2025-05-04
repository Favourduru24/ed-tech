 require('dotenv').config()
 const express = require('express')
 const app = express()
 const PORT = process.env.PORT
 const cookieParser = require('cookie-parser')
 const connectDB = require('./config/dbConn')
 const errorMiddlerware = require('./middleware/errorHandler')
 const cors = require('cors')
 const corsOption = require('./config/corsOption')
 const {logger} = require('./middleware/logger')
 const mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require("cloudinary").v2
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const credentials = require('./middleware/credential')
const fsPromise = require('fs').promises

app.use(credentials)

connectDB()

//Middleware
 app.use(express.static('public'))
 app.use(express.json())
 app.use(cookieParser())
 app.use(express.urlencoded({extended: false}))
 app.use(cors(corsOption))
 app.use(logger)

 //routes
app.use('/users', require('./routes/usersRoutes'))
app.use('/auth', require('./routes/authsRoutes'))
app.use('/feeds', require('./routes/feedsRoutes'))
app.use('/category', require('./routes/categoryRoutes'))
 
//Error middleware
app.use(errorMiddlerware) 
 

   // configuring cloudinary
   cloudinary.config({
       cloud_name: 'dtbh8wrrb',
       api_key: '184934896244847',
       api_secret: 'p-UT7x57unJlmJYpbDBO_K0sDwU'
   })

   //  cloudinary_url='CLOUDINARY_URL=cloudinary://184934896244847:p-UT7x57unJlmJYpbDBO_K0sDwU@dtbh8wrrb'

   const storage = multer.diskStorage({
      destination: async (req, file, cb) => {
          if(!fs.existsSync(path.join(__dirname, '.', 'public'))) {
            await  fsPromise.mkdir(path.join(__dirname, '.', 'public'))
          }
         cb(null, 'public')
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname)
      }
   })

    const upload = multer({
       storage: storage,
       limits: { fileSize: 10 * 1024 * 1024 } 
    }).single('image')

   //   const compressImage = async (filePath) => {
   //     const compressedPath = filePath.replace(path.extname(filePath), '-compressed.webp')
   //      await sharp(filePath).resize({width: 800}).webp({quality: 80}).toFile(filePath)
   //      return compressedPath
   //   }

   const compressImage = async (filePath) => {
      const compressedPath = filePath.replace(path.extname(filePath), '-compressed.webp')
      await sharp(filePath).resize({width: 800}).webp({quality: 80}).toFile(compressedPath) // Use compressedPath here
      return compressedPath
    }

   

   // app.use('/upload', upload, async (req, res) => {
   //     if(!req.file) {
   //        return res.status(400).json({message: 'No image uploaded'})
   //     } 

   //     try {
   //         const localImagePath = req.file.path
   //         const compressedImagePath = await compressImage(localImagePath)

   //        cloudinary.uploader.upload(compressImage, {
   //           transformation: [
   //             {width: 800, format: 'webp', crop: 'limit'}
   //           ],
   //           folder: 'user-image'

   //       }).then((cloudinaryResult) => {
   //             fs.unlinkSync(localImagePath)
   //             fs.unlinkSync(compressedImagePath)

   //           return res.status(200).json({
   //              message: 'image uploaded sucessfully!',
   //              cloudinaryUrl: cloudinaryResult.secure_url,
   //              cloudinaryPublicId: cloudinaryResult.public_id
   //           })

   //       }).catch((error) => {
   //           return res.status(500).json({message: 'Error uploading image to cloudinary!'})
   //     })

   //     } catch(error) {
   //        console.log('Error processing the image', error)   
   //        return res.status(500).json({message: 'Error processing the image'})
   //     }
   // })
  
   app.use('/upload', upload, async (req, res) => {
      if(!req.file) {
        return res.status(400).json({message: 'No image uploaded'})
      } 
    
      try {
        const localImagePath = req.file.path
        const compressedImagePath = await compressImage(localImagePath)
    
        cloudinary.uploader.upload(compressedImagePath, {
          transformation: [
            {width: 800, format: 'webp', crop: 'limit'}
          ],
          folder: 'user-image'
        }).then((cloudinaryResult) => {
          fs.unlinkSync(localImagePath)
          fs.unlinkSync(compressedImagePath)
    
          return res.status(200).json({
            message: 'image uploaded sucessfully!',
            cloudinaryUrl: cloudinaryResult.secure_url,
            cloudinaryPublicId: cloudinaryResult.public_id
          })
        }).catch((error) => {
          return res.status(500).json({message: 'Error uploading image to cloudinary!'})
        })
    
      } catch(error) {
        console.log('Error processing the image', error)   
        return res.status(500).json({message: 'Error processing the image'})
      }
    })
//connection
mongoose.connection.once('open', () => {
 app.listen(PORT, () =>  console.log(`Server running on Port: ${PORT}`))
})

