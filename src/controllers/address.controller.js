const {
  getWard,
  getDistric,
  getProvince,
  getDistrictByProvinceName,
  getWardByDistrictName,
} = require('../models/address.model');

const addressController = {
  getWard,
  getDistric,
  getProvince,
  getDistrictByProvinceName,
  getWardByDistrictName,
};

module.exports = addressController;
