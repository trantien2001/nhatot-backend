const {
  getAllMessage,
  getAllMessagesUserInMotel,
  getUserMessageList,
  getAllMessageActive,
  getAllMessageInMotel,
} = require('../models/message.model');

const messageController = {
  getUserMessageList,
  getAllMessagesUserInMotel,

  getAllMessage,
  getAllMessageActive,
  getAllMessageInMotel,
};

module.exports = messageController;
