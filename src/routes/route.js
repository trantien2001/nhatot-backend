import express from 'express';

import { authRoute } from './auth.route.js';
import { questionRoute } from './question.route.js';
import { bannerRoute } from './banner.route.js';
import { messageRoute } from './message.route.js';
import { motelRoute } from './motel.route.js';
import { mediaRoute } from './media.route.js';
import { addressRoute } from './address.route.js';
import { userRoute } from './user.route.js';

var router = express.Router();

export const routes = (app) => {
  authRoute(router);
  questionRoute(router);
  bannerRoute(router);
  messageRoute(router);
  motelRoute(router);
  mediaRoute(router);
  addressRoute(router);
  userRoute(router);
  app.use('/', router);
};
