const {
  // getAllMotel,
  // getAllMotelActive,
  getMotelsByIdWard,
  getMotelsByIdDistrict,
  getMotelsByIdProvince,
  getAllInfoMotelActive,
  getMotel,
  addMotel,
} = require('../models/motel.model');

const motelController = {
  addMotel,
  getMotel,
  getMotelsByIdWard,
  getMotelsByIdDistrict,
  getMotelsByIdProvince,
  // getAllMotel,
  // getAllMotelActive,
  getAllInfoMotelActive,
};

module.exports = motelController;
