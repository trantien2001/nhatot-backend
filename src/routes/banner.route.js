import bannerController from '../controllers/banner.controller.js';

export const bannerRoute = (router) => {
  router.get('/banners', bannerController.getAllBanner);
  // router.get('/banner', bannerController.getAllBanner);
  // router.post('/banner', bannerController.add);
  router.get('/banner:active', bannerController.getAllBannerActive);
};
