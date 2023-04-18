const userModel = require('../models/user.model');

const userController = {
  getUser: async (req, res) => {
    const IdUser = req.params.IdUser;
    const user = await userModel.getUser(IdUser);
    return res.status(200).send(user);
  },
  getInfoUser: async (req, res) => {
    const { IdUser, IdMotel } = req.body;
    const result = await userModel.getInfoUser({ IdUser, IdMotel });
    return res.status(200).send(result);
  },
  getAllUser: async (req, res) => {
    const result = await userModel.getAllUser();
    return res.status(200).send(result);
  },

  getAdmin: async () => {
    const result = await userModel.getAdmin();
    return res.status(200).send(result);
  },
  getHost: async () => {
    const result = await userModel.getHost();
    return res.status(200).send(result);
  },

  getHostById: async (req, res) => {
    const { IdUser } = req.params;
    const result = await userModel.getHostById(IdUser);
    return res.status(200).send(result);
  },
  getRenter: async () => {
    const result = await userModel.getRenter();
    return res.status(200).send(result);
  },
  getRenterById: async (req, res) => {
    const { IdUser } = req.params;
    const result = await userModel.getRenterById(IdUser);
    return res.status(200).send(result);
  },
};

module.exports = userController;
