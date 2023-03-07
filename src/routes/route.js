const { getAllAuthority } = require('../controllers/authority.controller');
const {
  getAllBannerActive,
  getAllBanner,
} = require('../controllers/banner.controller');
const {
  getAllImage,
  getImageMotel,
} = require('../controllers/image.controller');
const {
  getAllMessageActive,
  getAllMessageInMotel,
  getUserMessageList,
  getAllMessagesUserInMotel,
} = require('../controllers/message.controller');
const {
  getAllMotelActive,
  getAllInfoMotelActive,
  getMotel,
} = require('../controllers/motel.controller');
const { getAllQuestionActive } = require('../controllers/question.controller');
const {
  getAllUser,
  getAdmin,
  getHost,
  getRenter,
} = require('../controllers/user.controller');
const {
  getProvince,
  getDistric,
  getWard,
} = require('../controllers/address.controller');

var router = require('express').Router();

module.exports = (app) => {
  router.get('/province', getProvince);
  router.get('/district/:IdProvince', getDistric);
  router.get('/ward/:IdDistrict', getWard);
  router.get('/authority', getAllAuthority);

  router.get('/user/admin', getAdmin);
  router.get('/user/host', getHost);
  router.get('/user/renter', getRenter);

  router.get('/banner', getAllBanner);
  router.get('/banner:active', getAllBannerActive);

  router.get('/message', getAllMessageActive);
  router.get('/message/:IdMotel', getAllMessageInMotel);
  router.get('/messageUser/:IdUser', getUserMessageList);
  router.get('/chat/:IdMotel', getAllMessagesUserInMotel);


  router.get('/motels', getAllInfoMotelActive);
  router.get('/motel/:IdMotel', getMotel);

  router.get('/image/:IdMotel', getImageMotel);




  
  router.get('/image', getAllImage);
  router.get('/question', getAllQuestionActive);
  router.get('/user', getAllUser);

  app.use('/', router);
};
