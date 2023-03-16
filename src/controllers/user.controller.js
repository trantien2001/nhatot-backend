const {
  getAllUser,
  getAdmin,
  getHost,
  getHostById,
  getRenter,
  getRenterById,
} = require('../models/user.model');
const userController = {
  getAllUser,
  getAdmin,
  getHost,
  getHostById,
  getRenter,
  getRenterById,
};

module.exports = userController;
