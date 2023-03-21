const {
  getInfoUser,
  getAllUser,
  getAdmin,
  getHost,
  getHostById,
  getRenter,
  getRenterById,
} = require('../models/user.model');
const userController = {
  getInfoUser,
  getAllUser,
  getAdmin,
  getHost,
  getHostById,
  getRenter,
  getRenterById,
};

module.exports = userController;
