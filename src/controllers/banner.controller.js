import bannerModel from '../models/banner.model.js';

const bannerController = {
  getAllBanner: async (req, res) => {
    const result = await bannerModel.getAllBanner();
    return res.status(200).send(result);
  },
  getAllBannerActive: async (req, res) => {
    const result = await bannerModel.getAllBannerActive();
    return res.status(200).send(result);
  },
  addBanner: async (req, res) => {
    const result = await bannerModel.addBanner();
    return res.status(200).send(result);
  },
};

export default bannerController;
