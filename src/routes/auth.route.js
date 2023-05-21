import authController from '../controllers/auth.controller.js';
import { upload } from '../middlewares/upload.js';

export const authRoute = (router) => {
  router.post('/auth/login', authController.login);
  router.post('/auth/register', authController.register);
  router.post('/auth/logout', authController.logout);
  router.post('/auth/changePassword', authController.changePassword);
  router.post('/auth/changeAvatar', upload('avatars').single('avatar'), authController.changeAvatar);
  // router.post('/auth/changeBanner', upload('banners').single('banner'), authController.changeBanner);
  router.post('/auth/changeInfoUser', authController.changeInfoUser);
};
