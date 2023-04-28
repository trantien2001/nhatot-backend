import authController from '../controllers/auth.controller.js';
import { upload } from '../middlewares/upload.js';

export const authRoute = (router) => {
  router.post('/user/login', authController.login);
  router.post('/user/register', authController.register);
  router.post('/user/logout', authController.logout);
  router.post('/user/changePassword', authController.changePassword);
  router.post('/user/changeAvatar', upload('avatars').single('avatar'), authController.changeAvatar);
  // router.post('/user/changeBanner', upload('banners').single('banner'), authController.changeBanner);
  router.post('/user/changeInfoUser', authController.changeInfoUser);
};
