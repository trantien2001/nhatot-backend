import mediaModel from '../models/media.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const mediaController = {
  getAllMedia: catchAsync(async (req, res) => {
    const media = await mediaModel.getAllMedia();
    return res.status(200).send({ msg: 'Get media in successfully!', media });
  }),
  getMediaMotel: catchAsync(async (req, res) => {
    const { IdMotel } = req.params;
    const media = await mediaModel.getMediaMotel(IdMotel);
    return res.status(200).send({ msg: 'Get media in successfully!', media });
  }),
  getAllMediaActive: catchAsync(async (req, res) => {
    const media = await mediaModel.getAllMediaActive();
    return res.status(200).send({ msg: 'Get media in successfully!', msg: 'Get media in successfully!', media });
  }),
};

export default mediaController;
