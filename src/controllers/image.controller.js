const imageModel = require('../models/image.model');

const imageController = {
  getAllImage: async (req, res) => {
    const image = await imageModel.getAllImage();
    return res.status(200).send({ msg: 'Get image in successfully!', image });
  },
  getImageMotel: async (req, res) => {
    const { IdMotel } = req.params;
    const image = await imageModel.getImageMotel(IdMotel);
    return res.status(200).send({ msg: 'Get image in successfully!', image });
  },
  getAllImageActive: async (req, res) => {
    const image = await imageModel.getAllImageActive();
    return res
      .status(200)
      .send({ msg: 'Get image in successfully!', msg: 'Get image in successfully!', image });
  },
};

module.exports = imageController;
