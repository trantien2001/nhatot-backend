import addressController from '../controllers/address.controller.js';

export const addressRoute = (router) => {
  router.get('/province', addressController.getProvince);
  router.get('/district/:IdProvince', addressController.getDistric);
  router.post('/districtByProvinceName', addressController.getDistrictByProvinceName);
  router.get('/ward/:IdDistrict', addressController.getWard);
  router.post('/wardByDistrictName', addressController.getWardByDistrictName);
};
