import { upload } from '../middlewares/upload.js';
import motelController from '../controllers/motel.controller.js';

export const motelRoute = (router) => {
  router.post('/motel', upload('motels').array('media'), motelController.add);
  router.get('/motel/:IdMotel', motelController.getMotel);
  router.post('/motelsInWard/:IdWard', motelController.getMotelsByIdWard);
  router.post('/motelsInDistrict/:IdDistrict', motelController.getMotelsByIdDistrict);
  router.post('/motelsInProvince/:IdProvince', motelController.getMotelsByIdProvince);
  router.post('/limitmotels', motelController.getLimitInfoMotelActive);
  router.post('/motels', motelController.getAllInfoMotelActive);

  // router.get('/motelsByPriceRangeInProvince', motelController.getMotelsByPriceRangeInProvince);
  // router.get('/motelsByPriceRangeInDistrict', motelController.getMotelsByPriceRangeInDistrict);
  // router.get('/motelsByPriceRangeInWard', motelController.getMotelsByPriceRangeInWard);
  //   router.get('/getMotelByIdUser/:IdUser', motelController.getMotelByIdUser);
};
