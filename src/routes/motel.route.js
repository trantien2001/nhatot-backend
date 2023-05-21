import { upload } from '../middlewares/upload.js';
import motelController from '../controllers/motel.controller.js';

export const motelRoute = (router) => {
  router.post('/motel', upload('motels').array('media'), motelController.add);
  router.put('/motel', upload('motels').array('media'), motelController.update);
  router.post('/getInfoMotel/:IdMotel', motelController.getMotel);
  router.get('/getInfoMotelByIdRoom/:IdRoom', motelController.getInfoMotelByIdRoom);
  router.post('/motelsInWard/:IdWard', motelController.getMotelsByIdWard);
  router.post('/motelsInDistrict/:IdDistrict', motelController.getMotelsByIdDistrict);
  router.post('/motelsInProvince/:IdProvince', motelController.getMotelsByIdProvince);
  router.post('/limitmotels', motelController.getLimitInfoMotelActive);
  router.post('/motels', motelController.getAllInfoMotelActive);
  router.get('/getMotelByIdUser/:IdUser', motelController.getMotelByIdUser);
  router.get('/getMotelFavourite/:IdUser', motelController.getMotelFavourite);

  // router.get('/motelsByPriceRangeInProvince', motelController.getMotelsByPriceRangeInProvince);
  // router.get('/motelsByPriceRangeInDistrict', motelController.getMotelsByPriceRangeInDistrict);
  // router.get('/motelsByPriceRangeInWard', motelController.getMotelsByPriceRangeInWard);
};
