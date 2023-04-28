import authModel from '../models/auth.model.js';

const authController = {
  login: async (req, res) => {
    const { phoneNumber, password } = req.body;
    const result = await authModel.login({ phoneNumber, password });
    if (!result) return res.status(400).send({ message: 'Login failed' });
    return res.status(200).send({ ...result });
  },
  register: async (req, res) => {
    const { fullName, phoneNumber, password } = req.body;
    const result = await authModel.register({ fullName, phoneNumber, password });
    return res.status(200).send(result);
  },
  logout: async (req, res) => {
    const { phoneNumber } = req.body;
    const result = await authModel.logout(phoneNumber);
    return res.status(200).send(result);
  },
  changeAvatar: async (req, res) => {
    const { IdUser } = req.body;
    const { filename } = req.file;
    const result = await authModel.changeAvatar({ IdUser, filename });
    return res.status(200).send(result);
  },
  changeInfoUser: async (req, res) => {
    const { IdUser, name, email, phoneNumber, road, gender, birthDay, ward, province } = req.body;
    const result = await authModel.changeInfoUser({
      IdUser,
      name,
      email,
      phoneNumber,
      road,
      gender,
      birthDay,
      ward,
      province,
    });

    return res.status(200).send(result);
  },

  changePassword: async (req, res) => {
    const { IdUser, oldPassword, newPassword } = req.body;
    const result = await authModel.changePassword({ IdUser, oldPassword, newPassword });
    return res.status(200).send(result);
  },
};

export default authController;
