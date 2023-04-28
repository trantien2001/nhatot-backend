import motelModel from '../models/motel.model.js';

const motelController = {
  getMotelByIdUser: async (req, res) => {
    const result = await motelModel.getMotelByIdUser(req.params);
    return res.status(200).send(result);
  },
  getMotel: async (req, res) => {
    const { IdMotel } = req.params;
    console.log(IdMotel);
    const result = await motelModel.getMotel(IdMotel);
    return res.status(200).send(result);
  },

  getMotelsByIdWard: async (req, res) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax } = req.body;
    const { IdWard } = req.params;
    const motel = await motelModel.getMotelsByIdWard({
      IdWard,
      start,
      quantity,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
    });
    return res.status(200).send(motel);
  },

  getMotelsByIdDistrict: async (req, res) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax } = req.body;
    const { IdDistrict } = req.params;
    const motel = await motelModel.getMotelsByIdDistrict({
      IdDistrict,
      start,
      quantity,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
    });
    return res.status(200).send(motel);
  },

  getMotelsByIdProvince: async (req, res) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax } = req.body;
    const { IdProvince } = req.params;
    const motel = await motelModel.getMotelsByIdProvince({
      IdProvince,
      start,
      quantity,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
    });
    return res.status(200).send(motel);
  },
  getLimitInfoMotelActive: async (req, res) => {
    const motel = await motelModel.getLimitInfoMotelActive(req.body);
    return res.status(200).send(motel);
  },
  getAllInfoMotelActive: async (req, res) => {
    const motel = await motelModel.getAllInfoMotelActive();
    return res.status(200).send(motel);
  },

  add: async (req, res) => {
    const result = await motelModel.add({
      ...req.body,
      media: req.files,
    });
    return res.status(200).send(result);
  },
};

export default motelController;
