import { io } from '../index.js';

import userModel from '../models/user.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const userController = {
  addFavourite: catchAsync(async (req, res) => {
    const favourite = await userModel.addFavourite(req.body);
    return res.status(200).send(favourite);
  }),
  deleteFavourite: catchAsync(async (req, res) => {
    const favourite = await userModel.deleteFavourite(req.body);
    return res.status(200).send(favourite);
  }),

  deleteNotifi: catchAsync(async (req, res) => {
    const { IdUser } = req.body;
    const { IdNotifi } = req.params;
    console.log({ IdUser, IdNotifi });
    const notifi = await userModel.deleteNotifi({ IdUser, IdNotifi });
    return res.status(200).send(notifi);
  }),
  getAllNotifiByIdUser: catchAsync(async (req, res) => {
    const notifi = await userModel.getAllNotifiByIdUser(req.params);
    return res.status(200).send(notifi);
  }),
  getUser: catchAsync(async (req, res) => {
    const user = await userModel.getUser(req.body);
    console.log(req.body);
    return res.status(200).send(user);
  }),
  getInfoUser: catchAsync(async (req, res) => {
    const { IdUser, IdRoom } = req.body;
    const result = await userModel.getInfoUser({ IdUser, IdRoom });
    return res.status(200).send(result);
  }),
  getAllUser: catchAsync(async (req, res) => {
    const result = await userModel.getAllUser();
    return res.status(200).send(result);
  }),

  getAdmin: catchAsync(async () => {
    const result = await userModel.getAdmin();
    return res.status(200).send(result);
  }),
  getHost: catchAsync(async () => {
    const result = await userModel.getHost();
    return res.status(200).send(result);
  }),

  getHostById: catchAsync(async (req, res) => {
    const { IdUser } = req.params;
    const result = await userModel.getHostById(IdUser);
    return res.status(200).send(result);
  }),
  getRenter: catchAsync(async () => {
    const result = await userModel.getRenter();
    return res.status(200).send(result);
  }),
  getRenterById: catchAsync(async (req, res) => {
    const { IdUser } = req.params;
    const result = await userModel.getRenterById(IdUser);
    return res.status(200).send(result);
  }),
  follow: catchAsync(async (req, res) => {
    console.log('follow: ', req.body);
    const result = await userModel.follow(req.body);
    // io.on('connection', (socket) => {
    //   console.log(`User Connected: ${socket.id}`);
    // io.on('new_follow', (data) => {
    //   console.log('received message from client:', data);
    //   // io.emit('re-render message', data);
    // });
    //   socket.on('new_follow', (data) => {
    //     // console.log('new follow: ', data);
    //     io.emit('follow', data);
    //   });
    //   socket.on('un_follow', (data) => {
    //     // console.log('un follow: ', data);
    //     io.emit('unfollow', data);
    //   });

    //   socket.on('disconnect', () => {
    //     console.log('User Disconnected', socket.id);
    //   });
    // });
    if (result.msg == 'Theo dõi thành công') {
      io.emit('follow', {
        IdFollowing: req.body.IdFollowing,
        msg: 'Bạn có thông báo mới',
        nameFollow: result.nameFollow,
      });

      // io.on('connection', (socket) => {
      //   console.log(`User Connected: ${socket.id}`);

      //   socket.on('new_follow', (data) => {
      //     console.log('follow controller: ', data);
      //     io.emit('follow', data);
      //   });
      // });
    }
    if (result.msg == 'Hủy theo dõi thành công') {
      io.emit('unfollow', {
        IdFollowing: req.body.IdFollowing,
        nameFollow: result.nameFollow,
      });
    }
    return res.status(200).send(result);
  }),
};

export default userController;
