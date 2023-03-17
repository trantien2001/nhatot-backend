const {
  getAllMessage,
  getAllMessagesUserInMotel,
  getUserMessageList,
  getAllMessageActive,
  getAllMessageInMotel,
  addMessage,
} = require('../models/message.model');

const messageController = {
  getUserMessageList,
  getAllMessagesUserInMotel,
  addMessage,
  getAllMessage,
  getAllMessageActive,
  getAllMessageInMotel,
};

module.exports = messageController;
