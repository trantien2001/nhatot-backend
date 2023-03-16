const authModel = require('../models/auth.model');

const authController = {
  login: authModel.login,
  register: authModel.register,
};

module.exports = authController;
