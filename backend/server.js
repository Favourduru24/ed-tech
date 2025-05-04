const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: 'your_cloud_name',   // Replace with your Cloudinary cloud name
  api_key: 'your_api_key',         // Replace with your Cloudinary API key
  api_secret: 'your_api_secret'    // Replace with your Cloudinary API secret
});

const app = express();
const port = 3000;

// Set up Multer storage for local uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Uploads will be saved in the 'public/uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using timestamp
  }
});

// Multer upload with file size limit (10MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB size limit
}).single('image'); // Only handle single image upload

// Middleware to compress image using Sharp
const compressImage = async (filePath) => {
  const compressedPath = filePath.replace(path.extname(filePath), '-compressed.webp'); // Change to webp format
  await sharp(filePath)
    .resize({ width: 800 }) // Resize the image to a max width of 800px
    .webp({ quality: 80 })  // Convert the image to WebP format with 80% quality
    .toFile(compressedPath);
  return compressedPath; // Return the path of the compressed image
};

// Route to upload image
 app.post('/upload', upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Compress the uploaded image before saving to Cloudinary
    const localImagePath = req.file.path;  // Local file path after uploading
    const compressedImagePath = await compressImage(localImagePath); // Compress image using Sharp
 
    // Upload compressed image to Cloudinary
    cloudinary.uploader.upload(compressedImagePath, {
      folder: 'user-images',  // Optionally, store the images in a folder on Cloudinary
      transformation: [
        { width: 800, crop: 'limit', format: 'webp' }  // Ensure the image is resized and in WebP format
      ]
    }).then((cloudinaryResult) => {
      // Optional: Remove the local compressed image after successful upload to Cloudinary
      fs.unlinkSync(localImagePath);
      fs.unlinkSync(compressedImagePath);  // Delete the compressed local file

      // Return the Cloudinary URL of the uploaded image
      res.status(200).json({
        message: 'Image uploaded and transformed successfully',
        cloudinaryUrl: cloudinaryResult.secure_url
      });
    }).catch((error) => {
      // Handle any Cloudinary upload error
      res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
    });

  } catch (error) {
    // Handle errors during the image compression process
    res.status(500).json({ message: 'Error processing image', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});