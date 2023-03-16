const { getWard, getDistric, getProvince } = require('../models/address.model');

const addressController = {
  getWard,
  getDistric,
  getProvince,
};

module.exports = addressController;
