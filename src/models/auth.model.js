import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { generateToken } from '../middlewares/JWT.js';
import ApiError from '../utils/ApiError.js';
import connection from './db.js';
const saltRounds = 10;

const authModel = {
  login: async ({ phoneNumber, password }) => {
    console.log(123);
    const sql1 = `SELECT Active, Address, Avatar,
      DATE_FORMAT(BirthDay, '%Y-%m-%d') as BirthDay,
      DistrictName, DistrictPrefix, Email,
      Gender, IdAuthority, province.IdProvince,
      district.IdDistrict, user.IdUser, ward.IdWard, Name,
      Password, PhoneNumber, ProvinceName,  WardName,
      WardPrefix, operatingTime, activeStatus
      FROM user, ward, district, province 
      WHERE PhoneNumber = ?
      AND user.IdWard = ward.IdWard 
      AND ward.IdDistrict = district.IdDistrict 
      AND district.IdProvince = province.IdProvince
      `;
    const sql2 = `UPDATE user SET activeStatus = 1 WHERE PhoneNumber = ?`;
    await connection.query(sql2, [phoneNumber]);
    const result = await connection.query(sql1, [phoneNumber]);
    if (bcrypt.compareSync(password, String(result[0]?.Password).trim())) {
      result[0].activeStatus = 1;
      const { Active, Password, ...users } = result[0];
      const { accessToken} = generateToken(users)
      return { users, accessToken, message: 'Logged in successfully' };
    } else throw new ApiError(httpStatus.BAD_REQUEST, 'Không tìm thấy tài khoản người dùng');
  },

  changePassword: async ({ IdUser, oldPassword, newPassword }) => {
    const sqlCheckPassword = `SELECT Password FROM user WHERE IdUser = ?`;
    const checkPassWord = await connection.query(sqlCheckPassword, [IdUser]);

    if (bcrypt.compareSync(oldPassword, String(checkPassWord[0]?.Password).trim())) {
      const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
      const sqlChangePassword = `UPDATE user SET Password = "${hashNewPassword}" WHERE IdUser = ${IdUser}`;
      await connection.query(sqlChangePassword, []);
      const sqlSelect = `SELECT Active, Address, Avatar,
          DATE_FORMAT(BirthDay, '%Y-%m-%d') as BirthDay,
          DistrictName, DistrictPrefix, Email,
          Gender, IdAuthority, province.IdProvince,
          district.IdDistrict, user.IdUser, ward.IdWard,
          Name, Password, PhoneNumber, ProvinceName, WardName,
          WardPrefix, operatingTime, activeStatus
          FROM user, ward, district, province 
          WHERE user.IdUser = ?
          AND user.IdWard = ward.IdWard 
          AND ward.IdDistrict = district.IdDistrict 
          AND district.IdProvince = province.IdProvince
        `;
      const result = await connection.query(sqlSelect, [IdUser]);
      result[0].activeStatus = 1;
      const { Active, Password, ...users } = result[0];
      const { accessToken} = generateToken(users)
      return { users, accessToken, msg: 'Thay đổi mật khẩu thành công' };
    }
    return { msg: 'Mật khẩu hiện tại không đúng' };
  },
  changeAvatar: async ({ IdUser, filename }) => {
    const sql = `UPDATE user SET Avatar = ? WHERE IdUser = ?`;
    const result = await connection.query(sql, [filename, IdUser]);
    return { file: filename };
  },
  changeInfoUser: async ({ IdUser, name, email, phoneNumber, road, gender, birthDay, ward, province }) => {
    console.log({ IdUser, name, email, phoneNumber, road, gender, birthDay, ward, province });
    const sql1 = `
      (SELECT IdWard FROM ward, province
        WHERE ward.IdProvince = province.IdProvince
      AND province.ProvinceName = ? And ward.WardName = ?)
      `;
    const result1 = await connection.query(sql1, [province, ward]);
    const IdWard = result1[0].IdWard;
    const sql2 = `UPDATE user SET Name = ?, Email = ?, PhoneNumber = ?, Address = ?, Gender = ?, BirthDay = ?, IdWard = ? WHERE IdUser = ?`;

    await connection.query(sql2, [name, email, phoneNumber, road, gender, birthDay, IdWard, IdUser]);

    const sql3 = `SELECT Active, Address, Avatar,
      DATE_FORMAT(BirthDay, '%Y-%m-%d') as BirthDay,
      DistrictName, DistrictPrefix, Email,
      Gender, IdAuthority, province.IdProvince,
      district.IdDistrict, user.IdUser, ward.IdWard, Name,
      Password, PhoneNumber, ProvinceName, WardName,
      WardPrefix, operatingTime, activeStatus
      FROM user, ward, district, province 
      WHERE user.IdUser = ?
      AND user.IdWard = ward.IdWard 
      AND ward.IdDistrict = district.IdDistrict 
      AND district.IdProvince = province.IdProvince
      `;
    const result3 = await connection.query(sql3, [IdUser]);

    result3[0].activeStatus = 1;
    const { Active, Password, ...users } = result3[0];
    const { accessToken} = generateToken(users)
    
    return { users, accessToken, message: 'Update info user in successfully' };
  },

  logout: async (phoneNumber) => {
    const sql = `UPDATE user SET activeStatus = 0, operatingTime = NOW() 
      WHERE PhoneNumber = ?`;
    const result = await connection.query(sql, [phoneNumber]);
    return { message: 'Logout in successfully' };
  },

  register: async ({ fullName, phoneNumber, password }) => {
    const sql1 = `SELECT * FROM user WHERE PhoneNumber = ?`;
    const result1 = await connection.query(sql1, [phoneNumber]);
    if (!result1[0]) {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const sql2 = `INSERT INTO user(Name, PhoneNumber, Password) VALUES (?, ?, ?)`;
      await connection.query(sql2, [fullName, phoneNumber, hashPassword]);
    } else return { message: 'Số điện thoại này đã đăng ký' };
    const sql3 = `SELECT * FROM user WHERE PhoneNumber = ?`;
    const result = await connection.query(sql3, [phoneNumber]);
    return { message: 'Đăng ký tài khoản thành công', result };
  },
};

export default authModel;
