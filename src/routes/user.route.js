import userController from '../controllers/user.controller.js';

export const userRoute = (router) => {
  router.post('/user/follow', userController.follow);
  router.post('/infoUser', userController.getInfoUser);
  // router.get('/user/admin', userController.getAdmin);
  // router.get('/user/host', userController.getHost);
  // router.get('/user/renter', userController.getRenter);
  // router.get('/renter/:IdUser', userController.getRenterById);
  // router.get('/host/:IdUser', userController.getHostById);
  router.get('/users', userController.getAllUser);
  router.post('/user/:IdUser', userController.getUser);
};
