const {
  // getAllMotel,
  // getAllMotelActive,
  getMotelsByIdWard,
  getMotelsByIdDistrict,
  getMotelsByIdProvince,
  getAllInfoMotelActive,
  getMotelsByPriceRange,
  getMotelsByPriceRangeInProvince,
  getMotelsByPriceRangeInDistrict,
  getMotelsByPriceRangeInWard,
  getMotel,
  // addMotel,
} = require('../models/motel.model');

const motelController = {
  // addMotel,
  getMotel,
  getMotelsByIdWard,
  getMotelsByIdDistrict,
  getMotelsByIdProvince,
  getMotelsByPriceRange,
  getMotelsByPriceRangeInProvince,
  getMotelsByPriceRangeInDistrict,
  getMotelsByPriceRangeInWard,
  // getAllMotel,
  // getAllMotelActive,
  getAllInfoMotelActive,
};

module.exports = motelController;
