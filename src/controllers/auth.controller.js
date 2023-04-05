const authModel = require('../models/auth.model');

const authController = {
  login: authModel.login,
  register: authModel.register,
  logout: authModel.logout,
  changeAvatar: authModel.changeAvatar,
  changeInfoUser: authModel.changeInfoUser,
  changePassword: authModel.changePassword,
};

module.exports = authController;
