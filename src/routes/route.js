var router = require('express').Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const addressController = require('../controllers/address.controller');
const imageController = require('../controllers/image.controller');
const bannerController = require('../controllers/banner.controller');
const messageController = require('../controllers/message.controller');
const questionController = require('../controllers/question.controller');
const motelController = require('../controllers/motel.controller');
const { upload } = require('../middlewares/upload');

module.exports = (app) => {
  // Run successfully
  router.post('/user/login', authController.login);
  router.post('/user/register', authController.register);
  router.post('/user/logout', authController.logout);
  router.post('/user/changePassword', authController.changePassword);
  router.post('/user/changeAvatar', upload('avatars').single('avatar'), authController.changeAvatar);
  // router.post('/user/changeBanner', upload('banners').single('banner'), authController.changeBanner);
  router.post('/user/changeInfoUser', authController.changeInfoUser);

  router.get('/banners', bannerController.getAllBanner);
  // router.get('/banner', bannerController.getAllBanner);
  // router.post('/banner', bannerController.add);
  router.get('/banner:active', bannerController.getAllBannerActive);

  router.get('/question/:id', questionController.getQuestion);
  router.get('/questions', questionController.getAllQuestion);
  router.post('/question', questionController.addQuestion);
  router.patch('/question/:id', questionController.updateQuestion);
  // router.post('/questions', questionController.up);

  // router.get('/message', getAllMessageActive);

  // Thành công
  router.get('/banner:active', bannerController.getAllBannerActive);

  router.post('/message', messageController.addMessage);
  router.get('/message/:IdMotel', messageController.getAllMessageInMotel);
  router.get('/chat/:IdMotel', messageController.getAllMessagesUserInMotel);
  router.get('/messageUser/:IdUser', messageController.getUserMessageList);

  router.post('/motel', upload('motels').array('image'), motelController.add);
  router.get('/motel/:IdMotel', motelController.getMotel);
  router.post('/motelsInWard/:IdWard', motelController.getMotelsByIdWard);
  router.post('/motelsInDistrict/:IdDistrict', motelController.getMotelsByIdDistrict);
  router.post('/motelsInProvince/:IdProvince', motelController.getMotelsByIdProvince);
  router.post('/motels', motelController.getAllInfoMotelActive);
  // sửa khoảng giá

  router.get('/image/:IdMotel', imageController.getImageMotel);
  router.get('/image', imageController.getAllImage);
  // Thành công

  // router.get('/motelsByPriceRangeInProvince', motelController.getMotelsByPriceRangeInProvince);
  // router.get('/motelsByPriceRangeInDistrict', motelController.getMotelsByPriceRangeInDistrict);
  // router.get('/motelsByPriceRangeInWard', motelController.getMotelsByPriceRangeInWard);
  // router.get('/getMotelByIdUser/:IdUser', motelController.getMotelByIdUser);

  router.get('/province', addressController.getProvince);
  router.get('/district/:IdProvince', addressController.getDistric);
  router.post('/districtByProvinceName', addressController.getDistrictByProvinceName);
  router.get('/ward/:IdDistrict', addressController.getWard);
  router.post('/wardByDistrictName', addressController.getWardByDistrictName);

  router.post('/infoUser', userController.getInfoUser);
  // router.get('/user/admin', userController.getAdmin);
  // router.get('/user/host', userController.getHost);
  // router.get('/user/renter', userController.getRenter);
  // router.get('/renter/:IdUser', userController.getRenterById);
  // router.get('/host/:IdUser', userController.getHostById);
  router.get('/users', userController.getAllUser);
  router.get('/user/:IdUser', userController.getUser);

  // Run successfully

  app.use('/', router);
};
