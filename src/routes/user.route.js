import userController from '../controllers/user.controller.js';

export const userRoute = (router) => {
  router.post('/user/follow', userController.follow);
  router.post('/user/addFavourite', userController.addFavourite);
  router.post('/user/deleteFavourite', userController.deleteFavourite);

  router.get('/getAllNotifiByIdUser/:IdUser', userController.getAllNotifiByIdUser);
  router.post('/deleteNotifi/:IdNotifi', userController.deleteNotifi);
  router.post('/infoUser', userController.getInfoUser);
  // router.get('/user/admin', userController.getAdmin);
  // router.get('/user/host', userController.getHost);
  // router.get('/user/renter', userController.getRenter);
  // router.get('/renter/:IdUser', userController.getRenterById);
  // router.get('/host/:IdUser', userController.getHostById);
  router.post('/user/:IdUser', userController.getUser);
  
  
};
