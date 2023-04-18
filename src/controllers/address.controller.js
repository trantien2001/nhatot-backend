const addressModel = require('../models/address.model');

const addressController = {
  getWard: async (req, res) => {
    const { IdDistrict } = req.params;
    const result = await addressModel.getWard(IdDistrict);
    return res.status(200).send(result);
  },
  getDistric: async (req, res) => {
    const { IdProvince } = req.params;
    const result = await addressModel.getDistric(IdProvince);
    return res.status(200).send(result);
  },
  getProvince: async (req, res) => {
    const result = await addressModel.getProvince();
    return res.status(200).send(result);
  },
  getDistrictByProvinceName: async (req, res) => {
    const { ProvinceName } = req.body;
    const result = await addressModel.getDistrictByProvinceName(ProvinceName);
    return res.status(200).send(result);
  },
  getWardByDistrictName: async (req, res) => {
    const { DistrictName } = req.body;
    const result = await addressModel.getWardByDistrictName(DistrictName);
    return res.status(200).send(result);
  },
};

module.exports = addressController;
