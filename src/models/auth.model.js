const bcrypt = require('bcrypt');
const sql = require('./db');
const tokenModel = require('./token.model');
const saltRounds = 10;

const authModel = {
  logout: async (req, res) => {
    const { phoneNumber } = req.body;
    await sql.query(
      `UPDATE user SET activeStatus = 0, operatingTime = NOW() 
      WHERE PhoneNumber = ${phoneNumber}`,
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.status(200).send({ message: 'Logout in successfully' });
      },
    );
  },
  login: async (req, res) => {
    const { phoneNumber, password } = req.body;
    await sql.query(
      `SELECT * FROM user, ward, district, province 
      WHERE PhoneNumber = ${phoneNumber}
      AND user.IdWard = ward.IdWard 
      AND ward.IdDistrict = district.IdDistrict 
      AND district.IdProvince = province.IdProvince
      `,
      (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          if (
            bcrypt.compareSync(password, String(result[0]?.Password).trim())
          ) {
            result[0].activeStatus = 1;
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
    await sql.query(
      `UPDATE user SET activeStatus = 1 WHERE PhoneNumber = ${phoneNumber}`,
      (err, result) => {
        if (err) {
          return res.json(err);
        }
      },
    );
  },

  register: async (req, res) => {
    const { fullName, phoneNumber, password } = req.body;
    await sql.query(
      `SELECT * FROM user WHERE PhoneNumber = ${phoneNumber}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ message: 'Đăng ký không thành công' });
        }
        if (result.length > 0) {
          return res
            .status(400)
            .send({ message: 'This phone number is already in use' });
        }
      },
    );

    const hashPassword = await bcrypt.hash(password, saltRounds);
    await sql.query(
      `INSERT INTO user(Name, PhoneNumber, Password) VALUES ('${fullName}', '${phoneNumber}', '${hashPassword}')`,
      (err, result) => {
        if (err) {
          return res
            .status(400)
            .send({ message: 'This phone number is already in use' });
        }
      },
    );
    await sql.query(
      `SELECT * FROM user WHERE PhoneNumber = ${phoneNumber}`,
      (err, result) => {
        if (err) {
          return res
            .status(400)
            .send({ message: 'This phone number is already in use' });
        }
        const { Active, Password, ...users } = result[0];
        return res
          .status(200)
          .send({ users, message: 'User has been created' });
      },
    );
  },
};

module.exports = authModel;
