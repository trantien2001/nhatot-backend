const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const addressController = require('../controllers/address.controller');
const imageController = require('../controllers/image.controller');
const bannerController = require('../controllers/banner.controller');
const messageController = require('../controllers/message.controller');
const questionController = require('../controllers/question.controller');
const motelController = require('../controllers/motel.controller');

var router = require('express').Router();

module.exports = (app) => {
  // Run successfully
  router.post('/user/login', authController.login);
  router.post('/user/register', authController.register);

  router.get('/banner', bannerController.getAllBanner);
  router.get('/banner:active', bannerController.getAllBannerActive);

  router.get('/question', questionController.getAllQuestionActive);

  // router.get('/message', getAllMessageActive);
  router.post('/message', messageController.addMessage);
  router.get('/message/:IdMotel', messageController.getAllMessageInMotel);
  router.get('/messageUser/:IdUser', messageController.getUserMessageList);
  router.get('/chat/:IdMotel', messageController.getAllMessagesUserInMotel);

  router.get('/motels', motelController.getAllInfoMotelActive);
  router.get('/motel/:IdMotel', motelController.getMotel);

  router.get('/image/:IdMotel', imageController.getImageMotel);
  router.get('/image', imageController.getAllImage);

  router.get('/province', addressController.getProvince);
  router.get('/district/:IdProvince', addressController.getDistric);
  router.get('/ward/:IdDistrict', addressController.getWard);

  router.get('/user/admin', userController.getAdmin);
  router.get('/user/host', userController.getHost);
  router.get('/user/renter', userController.getRenter);
  router.get('/renter/:IdUser', userController.getRenterById);
  router.get('/host/:IdUser', userController.getHostById);
  router.get('/user', userController.getAllUser);
  // Run successfully

  app.use('/', router);
};
