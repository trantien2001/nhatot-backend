import bannerModel from '../models/banner.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const bannerController = {
  getAllBanner: catchAsync(async (req, res) => {
    const result = await bannerModel.getAllBanner();
    return res.status(200).send(result);
  }),
  getAllBannerActive: catchAsync(async (req, res) => {
    const result = await bannerModel.getAllBannerActive();
    return res.status(200).send(result);
  }),
  addBanner: catchAsync(async (req, res) => {
    const result = await bannerModel.addBanner();
    return res.status(200).send(result);
  }),
};

export default bannerController;
