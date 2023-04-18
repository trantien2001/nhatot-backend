const bcrypt = require('bcrypt');
const connection = require('./db');
const tokenModel = require('./token.model');
const saltRounds = 10;

const authModel = {
  login: async ({ phoneNumber, password }) => {
    try {
      const sql1 = `SELECT Active, Address, Avatar,
      DATE_FORMAT(BirthDay, '%Y-%m-%d') as BirthDay,
      DistrictName, DistrictPrefix, Email, Followers,
      Following, Gender, IdAuthority, province.IdProvince,
      district.IdDistrict, user.IdUser, ward.IdWard, Name,
      Password, PhoneNumber, ProvinceName,  WardName,
      WardPrefix, operatingTime, activeStatus
      FROM user, ward, district, province 
      WHERE PhoneNumber = ${phoneNumber}
      AND user.IdWard = ward.IdWard 
      AND ward.IdDistrict = district.IdDistrict 
      AND district.IdProvince = province.IdProvince
      `;
      const sql2 = `UPDATE user SET activeStatus = 1 WHERE PhoneNumber = ${phoneNumber}`;
      await connection.query(sql2, []);
      const result = await connection.query(sql1, []);
      if (bcrypt.compareSync(password, String(result[0]?.Password).trim())) {
        result[0].activeStatus = 1;
        const { Active, Password, ...users } = result[0];
        const { accessToken } = tokenModel.generateToken(users);
        return { users, accessToken, message: 'Logged in successfully' };
      } else return false;
    } catch (err) {
      return false;
    }
  },

  changePassword: async ({ IdUser, oldPassword, newPassword }) => {
    try {
      const sqlCheckPassword = `SELECT Password FROM user WHERE IdUser = ?`;
      const checkPassWord = await connection.query(sqlCheckPassword, [IdUser]);

      if (bcrypt.compareSync(oldPassword, String(checkPassWord[0]?.Password).trim())) {
        const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
        const sqlChangePassword = `UPDATE user SET Password = "${hashNewPassword}" WHERE IdUser = ${IdUser}`;
        await connection.query(sqlChangePassword, []);
        const sqlSelect = `SELECT Active, Address, Avatar,
          DATE_FORMAT(BirthDay, '%Y-%m-%d') as BirthDay,
          DistrictName, DistrictPrefix, Email, Followers,
          Following, Gender, IdAuthority, province.IdProvince,
          district.IdDistrict, user.IdUser, ward.IdWard,
          Name, Password, PhoneNumber, ProvinceName, WardName,
          WardPrefix, operatingTime, activeStatus
          FROM user, ward, district, province 
          WHERE user.IdUser = ${IdUser}
          AND user.IdWard = ward.IdWard 
          AND ward.IdDistrict = district.IdDistrict 
          AND district.IdProvince = province.IdProvince
        `;
        const result = await connection.query(sqlSelect, []);
        result[0].activeStatus = 1;
        const { Active, Password, ...users } = result[0];
        const { accessToken } = tokenModel.generateToken(users);
        return { users, accessToken, msg: 'Thay đổi mật khẩu thành công' };
      }
      return { msg: 'Mật khẩu hiện tại không đúng' };
    } catch (error) {
      return false;
    }
  },
  changeAvatar: async ({ IdUser, filename }) => {
    try {
      const sql = `UPDATE user SET Avatar = "${filename}" WHERE IdUser = ${IdUser}`;
      const result = await connection.query(sql, []);
      return { file: filename };
    } catch (error) {
      return false;
    }
  },
  changeInfoUser: async ({ IdUser, name, email, phoneNumber, road, gender, birthDay, ward, province }) => {
    try {
      const sql1 = `
      (SELECT IdWard FROM ward, province
        WHERE ward.IdProvince = province.IdProvince
      AND province.ProvinceName = "${province}" And ward.WardName = "${ward}")
      `;
      const result1 = await connection.query(sql1, []);
      const IdWard = result1[0].IdWard;
      const sql2 = `UPDATE user SET 
      Name = "${name}", 
      Email = "${email}",
      PhoneNumber = "${phoneNumber}",
      Address = "${road}",
      Gender = "${gender}",
      BirthDay = "${birthDay}",
      IdWard = ${IdWard}
      WHERE IdUser = ${IdUser}`;

      await connection.query(sql2, []);

      const sql3 = `SELECT Active, Address, Avatar,
      DATE_FORMAT(BirthDay, '%Y-%m-%d') as BirthDay,
      DistrictName, DistrictPrefix, Email, Followers,
      Following, Gender, IdAuthority, province.IdProvince,
      district.IdDistrict, user.IdUser, ward.IdWard, Name,
      Password, PhoneNumber, ProvinceName, WardName,
      WardPrefix, operatingTime, activeStatus
      FROM user, ward, district, province 
      WHERE user.IdUser = ${IdUser}
      AND user.IdWard = ward.IdWard 
      AND ward.IdDistrict = district.IdDistrict 
      AND district.IdProvince = province.IdProvince
      `;
      const result3 = await connection.query(sql3, []);

      result3[0].activeStatus = 1;
      const { Active, Password, ...users } = result3[0];
      const { accessToken } = tokenModel.generateToken(users);
      return { users, accessToken, message: 'Update info user in successfully' };
    } catch (error) {
      return false;
    }
  },

  logout: async (phoneNumber) => {
    try {
      const sql = `UPDATE user SET activeStatus = 0, operatingTime = NOW() 
      WHERE PhoneNumber = ${phoneNumber}`;
      const result = await connection.query(sql, []);
      return { message: 'Logout in successfully' };
    } catch (error) {
      return false;
    }
  },

  register: async ({ fullName, phoneNumber, password }) => {
    try {
      const sql1 = `SELECT * FROM user WHERE PhoneNumber = ${phoneNumber}`;
      const result1 = await connection.query(sql1, []);
      if (!result1) {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const sql2 = `INSERT INTO user(Name, PhoneNumber, Password) VALUES ('${fullName}', '${phoneNumber}', '${hashPassword}')`;
        const result2 = await connection.query(sql2, []);
      } else return { message: 'This phone number is already in use' };
      const sql3 = `SELECT * FROM user WHERE PhoneNumber = ${phoneNumber}`;
      const result3 = await connection.query(sql3, []);
      return result3;
    } catch (error) {
      return false;
    }
  },
};

module.exports = authModel;
