import adminController from '../controllers/admin.controller.js';
import { upload } from '../middlewares/upload.js';

export const adminRoute = (router) => {
  // admin
  router.get('/adminGetDataDashboard', adminController.adminGetDataDashboard);

  router.get('/users', adminController.getAllUser);
  router.post('/adminAddUser', adminController.adminAddUser);
  router.post('/adminUpdateUser', adminController.adminUpdateUser);
  router.post('/adminChangeStatusUser', adminController.adminChangeStatusUser);

  router.get('/adminGetAllBanner', adminController.adminGetAllBanner);
  router.delete('/adminRemoveBanner/:IdBanner', adminController.adminRemoveBanner);
  router.post('/adminAddBanner', upload('banners').array('banner'), adminController.adminAddBanner);
  router.put('/adminUpdateBanner', upload('banners').array('banner'), adminController.adminUpdateBanner);
  
  
  router.get('/adminGetBanner/:IdBanner', adminController.adminGetBanner);

};
