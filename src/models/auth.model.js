const bcrypt = require('bcrypt');
const sql = require('./db');
const tokenModel = require('./token.model');
const saltRounds = 10;

const authModel = {
  login: async (req, res) => {
    const { phoneNumber, password } = req.body;
    await sql.query(
      `SELECT * FROM user WHERE PhoneNumber = ${phoneNumber}`,
      (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          if (
            bcrypt.compareSync(password, String(result[0]?.Password).trim())
          ) {
            const { Active, Password, ...users } = result[0];
            const { accessToken } = tokenModel.generateToken(users);
            return res
              .status(200)
              .send({ users, accessToken, message: 'Logged in successfully' });
          } else {
            return res.status(400).send({ message: 'Login failed' });
          }
        }
      },
    );
  },

  register: async (req, res) => {
    const { fullName, phoneNumber, password } = req.body;
    const user = await sql.query(
      `SELECT * FROM user WHERE PhoneNumber = ${phoneNumber}`,
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        if (result.length > 0) {
          return res
            .status(200)
            .send({ message: 'This phone number is already in use' });
        }
      },
    );

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const rows = await sql.query(
      `INSERT INTO user(Name, PhoneNumber, Password) VALUES ('${fullName}', "${phoneNumber}", '${hashPassword}')`,
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.status(200).json('User has been created');
      },
    );
  },
};

module.exports = authModel;
