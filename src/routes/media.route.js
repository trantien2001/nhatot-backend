import mediaController from '../controllers/media.controller.js';

export const mediaRoute = (router) => {
  router.get('/media/:IdMotel', mediaController.getMediaMotel);
  router.get('/media', mediaController.getAllMedia);
};
