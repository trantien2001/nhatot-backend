// const io = require('../index');
// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
// // console.log(server)

// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

const messageModel = require('../models/message.model');
const {
  getAllMessage,
  getAllMessagesUserInMotel,
  getUserMessageList,
  getAllMessageActive,
  getAllMessageInMotel,
  addMessage,
} = require('../models/message.model');

const messageController = {
  // addMessage: async (req, res) => {
  //   const { IdUser, IdMotel, Content } = req.body;
  //   try {
  //     const chat = await messageModel.addMessage({ IdUser, IdMotel, Content });
  //     console.log(chat)
  //     io.on('connection', (socket) => {
  //       socket.on('send_message', (data) => {
  //         socket.to().emit('receive_message', data)
  //       });
  //     });
  //     return res.status(200).send({chat});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  addMessage,
  getUserMessageList,
  getAllMessagesUserInMotel,
  getAllMessage,
  getAllMessageActive,
  getAllMessageInMotel,
};

module.exports = messageController;
