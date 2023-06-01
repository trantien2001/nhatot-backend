import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';
import { generateToken } from '../middlewares/JWT.js';
import ApiError from '../utils/ApiError.js';
import connection from './db.js';
const __dirname = path.resolve();
const saltRounds = 10;

const authModel = {
  login: async ({ phoneNumber, password }) => {
    console.log('login auth model');
    const sqlLogin = `SELECT Active, Address, Avatar,
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
    const result = await connection.query(sqlLogin, [phoneNumber]);

    if (!result[0]) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Số điện thoại này chưa đăng ký');
    }
    if (result[0]?.Active == 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Tài khoản của bạn đã bị khóa');
    }
    const sqlUpdateStatus = `UPDATE user SET activeStatus = 1 WHERE PhoneNumber = ?`;
    await connection.query(sqlUpdateStatus, [phoneNumber]);
    console.log(bcrypt.compareSync(password, String(result[0]?.Password).trim()));
    if (bcrypt.compareSync(password, String(result[0]?.Password))) {
      result[0].activeStatus = 1;
      const { Active, Password, ...user } = result[0];
      const { accessToken } = generateToken(user);
      return { user, accessToken, msg: 'Đăng nhập thành công' };
    } else throw new ApiError(httpStatus.BAD_REQUEST, 'Mật khẩu không chính xác');
  },

  changePassword: async ({ IdUser, oldPassword, newPassword }) => {
    const sqlCheckPassword = `SELECT Password FROM user WHERE IdUser = ?`;
    const checkPassWord = await connection.query(sqlCheckPassword, [IdUser]);

    if (bcrypt.compareSync(oldPassword, String(checkPassWord[0]?.Password).trim())) {
      const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
      const sqlChangePassword = `UPDATE user SET Password = "${hashNewPassword}" WHERE IdUser = '${IdUser}'`;
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
      const { accessToken } = generateToken(users);
      return { users, accessToken, msg: 'Thay đổi mật khẩu thành công' };
    }
    return { msg: 'Mật khẩu hiện tại không đúng' };
  },
  changeAvatar: async ({ IdUser, filename }) => {
    console.log(filename);
    const sqlSelectAvatar = `SELECT Avatar FROM user WHERE IdUser = ?`;
    const avatar = await connection.query(sqlSelectAvatar, [IdUser]);
    const oldFile = avatar[0].Avatar;
    const imagePath = `${__dirname}\\public\\images\\avatars\\${oldFile}`;
    console.log(imagePath);

    if (fs.existsSync(imagePath)) {
      // Sử dụng phương thức unlink để xóa tập tin
      await fs.unlink(imagePath, (err) => {
        if (err) {
          return {
            message: err,
          };
        }
      });
      console.log('Xóa ảnh trong thư mục thành công');
    } else {
      console.log('Không tìm thấy ảnh trong ' + imagePath);
    }
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
    const { accessToken } = generateToken(users);

    return { users, accessToken, message: 'Update info user in successfully' };
  },

  logout: async (phoneNumber) => {
    const sql = `UPDATE user SET activeStatus = 0, operatingTime = NOW() 
      WHERE PhoneNumber = ?`;
    const result = await connection.query(sql, [phoneNumber]);
    return { message: 'Đăng xuất thành công' };
  },

  register: async ({ fullName, phoneNumber, password }) => {
    const sql1 = `SELECT * FROM user WHERE PhoneNumber = ?`;
    const result1 = await connection.query(sql1, [phoneNumber]);
    if (!result1[0]) {
      const IdUser = uniqid('IdUser_');
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const sql2 = `INSERT INTO user(IdUser, Name, PhoneNumber, Password) VALUES (?, ?, ?, ?)`;
      await connection.query(sql2, [IdUser, fullName, phoneNumber, hashPassword]);
    } else throw new ApiError(httpStatus.BAD_REQUEST, 'Số điện thoại này đã đăng ký');
    // return { message: 'Số điện thoại này đã đăng ký' };
    const sql3 = `SELECT * FROM user WHERE PhoneNumber = ?`;
    const result = await connection.query(sql3, [phoneNumber]);
    return { msg: 'Đăng ký tài khoản thành công', result };
  },
};

export default authModel;
