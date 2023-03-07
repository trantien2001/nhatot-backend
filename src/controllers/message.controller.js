const {
  getAllMessage,
  getAllMessagesUserInMotel,
  getUserMessageList,
  getAllMessageActive,
  getAllMessageInMotel,
} = require('../models/message.model');

module.exports = {
  getUserMessageList,
  getAllMessagesUserInMotel,

  getAllMessage,
  getAllMessageActive,
  getAllMessageInMotel,
};
