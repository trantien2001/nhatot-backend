import mediaModel from '../models/media.model.js';

const mediaController = {
  getAllMedia: async (req, res) => {
    const media = await mediaModel.getAllMedia();
    return res.status(200).send({ msg: 'Get media in successfully!', media });
  },
  getMediaMotel: async (req, res) => {
    const { IdMotel } = req.params;
    const media = await mediaModel.getMediaMotel(IdMotel);
    return res.status(200).send({ msg: 'Get media in successfully!', media });
  },
  getAllMediaActive: async (req, res) => {
    const media = await mediaModel.getAllMediaActive();
    return res.status(200).send({ msg: 'Get media in successfully!', msg: 'Get media in successfully!', media });
  },
};

export default mediaController;
