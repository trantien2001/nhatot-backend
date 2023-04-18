const messageModel = require('../models/message.model');

const messageController = {
  deleteMessage: async (req, res) => {
    const message = await messageModel.getUserMessageList(req.body.IdMessage);
    return res.status(200).send({ message });
  },
  addMessage: async (req, res) => {
    const { Content, IdMotel, IdUser } = req.body;
    const message = await messageModel.addMessage({ Content, IdMotel, IdUser });
    return res.status(200).send({
      msg: '123 Post message in successfully!',
      message,
    });
  },
  getUserMessageList: async (req, res) => {
    const message = await messageModel.getUserMessageList(req.params.IdUser);
    return res.status(200).send({ message });
  },
  getAllMessagesUserInMotel: async (req, res) => {
    // console.log(req.params.IdMotel)
    const { IdMotel } = req.params;
    const message = await messageModel.getAllMessagesUserInMotel(IdMotel);
    return res.status(200).send({ message: 'Get message in successfully', message });
  },
  getAllMessage: async (req, res) => {
    const message = await messageModel.getAllMessage();
    return res.status(200).send({ message });
  },
  getAllMessageInMotel: async (req, res) => {
    const { IdMotel, IdUser } = req.body;
    const message = await messageModel.getAllMessageInMotel({ IdMotel, IdUser });
    return res.status(200).send({ message });
  },
};

module.exports = messageController;
