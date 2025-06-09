const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const Notification = require('../models/Notification');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let onlineUsers = [];

const addNewUser = (userId, username, socketId) => {
  if (!onlineUsers.some(user => user.userId === userId)) {
    onlineUsers.push({ userId, username, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const getUserById = (userId) => {
  return onlineUsers.find(user => user.userId === userId);
};

const getUserByName = (username) => {
  return onlineUsers.find(user => user.username === username);
};

// Save notification to DB and emit to recipient
const sendNotifications = async ({ senderId, senderName, receiverId, receiverName, postId, type }) => {
  try {
    // Save to database
    const notification = new Notification({
      sender: senderId,
      recipient: receiverId,
      post: postId,
      type,
      read: false
    });

    await notification.save();

    // Find recipient's socket if online
    const recipient = getUserById(receiverId) || getUserByName(receiverName);
    
    if (recipient) {
      io.to(recipient.socketId).emit('getNotification', {
        _id: notification._id,
        sender: {
          _id: senderId,
          username: senderName
        },
        post: postId,
        type,
        read: false,
        createdAt: notification.createdAt
      });
    }

    return notification;
  } catch (error) {
    console.error('Notification error:', error);
    throw error;
  }
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register user when they authenticate
  socket.on("newUser", ({ userId, username }) => {
    addNewUser(userId, username, socket.id);
    console.log(`User ${username} (${userId}) connected with socket ${socket.id}`);
  });

  // Handle notification requests
  socket.on("sendNotification", async ({ senderId, senderName, receiverName, postId, type }) => {
    try {
      // In a real app, you'd verify the sender is who they claim to be
      await sendNotification({
        senderId,
        senderName,
        receiverName,
        postId,
        type
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

module.exports = { app, io, server, sendNotification };


const sendNotification = async ({ senderName, postId, type }) => {
  try {
    // 1. First find the post to get the owner's ID
    const post = await Post.findById(postId).select('author').populate('author', 'username');
    
    if (!post) {
      throw new Error('Post not found');
    }

    // 2. Create and save the notification
    const notification = new Notification({
      sender: senderName,  // You might want to store sender ID instead
      recipient: post.author._id,
      post: postId,
      type,
      read: false
    });

    await notification.save();

    // 3. Find if the recipient is online
    const recipient = onlineUsers.find(user => 
      user.userId === post.author._id.toString() || 
      user.username === post.author.username
    );

    // 4. Send real-time notification if user is online
    if (recipient) {
      io.to(recipient.socketId).emit('getNotification', {
        _id: notification._id,
        senderName,
        postId,
        type,
        createdAt: notification.createdAt,
        message: `${senderName} ${type === 'like' ? 'liked' : 'commented on'} your post`
      });
    }

    return notification;
  } catch (error) {
    console.error('Notification error:', error);
    throw error;
  }
};

// Socket.io handler
 socket.on("sendNotification", async ({ senderName, postId, type }) => {
  try {
    await sendNotification({ senderName, postId, type });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
});



socket.on("newUser", (username) => {
    const existingUser = onlineUsers.find(user => user.username === username);
    if (!existingUser) {
      onlineUsers.push({ username, socketId: socket.id });
      console.log(`User ${username} connected with socket ID ${socket.id}`);
    }
  });

  // Handle notifications
//    socket.on("newUser", (userData) => {
//   const existingUser = onlineUsers.find(user => 
//     user.username === userData.username || user.userId === userData.userId
//   );
//   if (!existingUser) {
//     onlineUsers.push({ 
//       username: userData.username, 
//       userId: userData.userId,
//       socketId: socket.id 
//     });
//     console.log(`User ${userData.username} connected`);
//   }
// });

// // Update the notification handler to find by userId if needed
// socket.on("sendNotification", ({ senderName, receiverId, postId, type }) => {
//   const receiver = onlineUsers.find(user => 
//     user.userId === receiverId || user.username === receiverId
//   );
//   if (receiver) {
//     const notification = {
//       senderName,
//       receiverId,
//       postId,
//       type,
//       createdAt: new Date()
//     };
//     io.to(receiver.socketId).emit("newNotification", notification);
//   }
// });

//   socket.on("disconnect", () => {
//     onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });



// Upcomming Accessment
// New Learning Module Created
// Acheivement Unlocked Level Up
// Assesment Results

// // // // 