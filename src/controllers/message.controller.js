import { io } from '../index.js';
import messageModel from '../models/message.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const messageController = {
  createRoom: catchAsync(async (req, res) => {
    const IdRoom = await messageModel.createRoom(req.body);
    return res.status(200).send({ IdRoom });
  }),
  getMessageByNameUser: catchAsync(async (req, res) => {
    const message = await messageModel.getMessageByNameUser(req.body);
    return res.status(200).send({ message });
  }),
  deleteMessage: catchAsync(async (req, res) => {
    const message = await messageModel.getUserMessageList(req.body.IdMessage);
    return res.status(200).send({ message });
  }),
  addMessage: catchAsync(async (req, res) => {
    const { Content, IdRoom, IdUser } = req.body;
    const message = await messageModel.addMessage({ Content, IdRoom, IdUser });
    io.emit('re-render message', { message });
    return res.status(200).send({
      msg: '123 Post message in successfully!',
      message,
    });
  }),
  getUserMessageList: catchAsync(async (req, res) => {
    const result = await messageModel.getUserMessageList(req.params.IdUser);
    return res.status(200).send(result);
  }),
  getAllMessagesUserInMotel: catchAsync(async (req, res) => {
    const { IdRoom } = req.params;
    const message = await messageModel.getAllMessagesUserInMotel(IdRoom);
    return res.status(200).send({ message: 'Get message in successfully', message });
  }),
  getAllMessage: catchAsync(async (req, res) => {
    const message = await messageModel.getAllMessage();
    return res.status(200).send({ message });
  }),
  getAllMessageInMotel: catchAsync(async (req, res) => {
    const { IdRoom, IdUser } = req.body;
    const message = await messageModel.getAllMessageInMotel({ IdRoom, IdUser });
    return res.status(200).send({ message });
  }),
};

export default messageController;
