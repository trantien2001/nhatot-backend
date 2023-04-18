const motelModel = require('../models/motel.model');

const motelController = {
  getMotel: async (req, res) => {
    const { IdMotel } = req.params;
    console.log(IdMotel);
    const result = await motelModel.getMotel(IdMotel);
    return res.status(200).send(result);
  },

  getMotelsByIdWard: async (req, res) => {
    const { start, quantity, priceMin, priceMax } = req.body;
    const { IdWard } = req.params;
    const motel = await motelModel.getMotelsByIdWard({
      IdWard,
      start,
      quantity,
      priceMin,
      priceMax,
    });
    return res.status(200).send({ motel: motel.motel, count: motel.count, msg: 'Get motel in successfully!' });
  },

  getMotelsByIdDistrict: async (req, res) => {
    const { start, quantity, priceMin, priceMax } = req.body;
    const { IdDistrict } = req.params;
    const motel = await motelModel.getMotelsByIdDistrict({ IdDistrict, start, quantity, priceMin, priceMax });
    return res.status(200).send({ motel: motel.motel, count: motel.count, msg: 'Get motel in successfully!' });
  },

  getMotelsByIdProvince: async (req, res) => {
    const { start, quantity, priceMin, priceMax } = req.body;
    const { IdProvince } = req.params;
    const motel = await motelModel.getMotelsByIdProvince({ IdProvince, start, quantity, priceMin, priceMax });
    return res.status(200).send({ motel: motel.motel, count: motel.count, msg: 'Get motel in successfully!' });
  },
  getAllInfoMotelActive: async (req, res) => {
    console.log(123);
    const motel = await motelModel.getAllInfoMotelActive(req.body);
    return res.status(200).send({ motel: motel.motel, count: motel.count, msg: 'Get motel in successfully!' });
  },

  add: async (req, res) => {
    const result = await motelModel.add({
      ...req.body,
      image: req.files,
    });
    return res.status(200).send(result);
  },
};

module.exports = motelController;
