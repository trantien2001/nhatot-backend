const {
  getBanner,
  addBanner,
  updateBanner,
  getAllBanner,
  getAllBannerActive,
} = require('../models/banner.model');

const bannerController = {
  getBanner,
  addBanner,
  updateBanner,
  getAllBanner,
  getAllBannerActive,
};
module.exports = bannerController;
