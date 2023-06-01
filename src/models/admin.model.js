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

const adminModel = {
  // ADMIN
  getAllUser: async () => {
    const sql = 'SELECT IdUser, Address, BirthDay, Email, Gender, Name, PhoneNumber, Active FROM user';
    const result = await connection.query(sql, []);
    return {
      msg: 'Lấy danh sách người dùng thành công',
      user: result,
    };
  },

  adminAddUser: async (data) => {
    const { fullName, phoneNumber, password, permission } = data;
    const sql1 = `SELECT * FROM user WHERE PhoneNumber = ?`;
    const result1 = await connection.query(sql1, [phoneNumber]);
    if (!result1[0]) {
      const IdUser = uniqid('IdUser_');
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const sqlAdminAddUser = `INSERT INTO user(IdUser, Name, PhoneNumber, Password, IdAuthority) VALUES(?, ?, ?, ?, ?) `;
      await connection.query(sqlAdminAddUser, [IdUser, fullName, phoneNumber, hashPassword, permission]);
      return { msg: 'Thêm người dùng thành công' };
    } else return { msg: 'Số điện thoại này đã đăng ký' };
  },

  adminUpdateUser: async (data) => {
    const { fullName, phoneNumber, password, permission, IdUser } = data;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const sqlAdminUpdateUser = `UPDATE user SET Name = ?, PhoneNumber = ?, Password = ?, IdAuthority = ? WHERE IdUser = ?`;
    await connection.query(sqlAdminUpdateUser, [fullName, phoneNumber, hashPassword, permission, IdUser]);
    return { msg: 'Chỉnh sửa người dùng thành công' };
  },

  adminChangeStatusUser: async (data) => {
    const { id, status } = data;

    let Active = '';
    let msg = '';
    if (status == 0) {
      Active = 1;
      msg = 'Mở khóa người dùng thành công';
    } else {
      Active = 0;
      msg = 'Khóa người dùng thành công';
    }
    const sqlAdminChangeStatusUser = `UPDATE user SET Active = ? WHERE IdUser = ?`;
    await connection.query(sqlAdminChangeStatusUser, [Active, id]);
    const sql = 'SELECT IdUser, Address, BirthDay, Email, Gender, Name, PhoneNumber, Active FROM user';
    const user = await connection.query(sql, []);
    return { msg, user };
  },

  // ADMIN

  adminGetDataDashboard: async () => {
    const motel_by_province = await connection.query(
      `
      SELECT province.ProvinceName, count(IdMotel) AS countMotel 
      FROM motel, ward, province WHERE motel.IdWard = ward.IdWard 
      AND province.IdProvince = ward.IdProvince GROUP BY province.IdProvince
    `,
      [],
    );
    const motel_by_district = await connection.query(
      `
      SELECT count(IdMotel) AS countMotel, district.DistrictName 
      FROM motel, ward, district WHERE motel.IdWard = ward.IdWard AND district.IdDistrict = ward.IdDistrict 
      GROUP BY district.IdDistrict
    `,
      [],
    );
    const motel_by_ward = await connection.query(
      `
      SELECT count(IdMotel) AS countMotel, ward.WardName 
      FROM motel, ward WHERE motel.IdWard = ward.IdWard GROUP BY ward.IdWard
    `,
      [],
    );
    const motel_by_host = await connection.query(
      `
      SELECT count(IdMotel) as countMotel, user.Name
      FROM motel, user WHERE motel.IdUser = user.IdUser GROUP BY user.IdUser
      `,
      [],
    );

    const total_motel = await connection.query(`SELECT COUNT(IdMotel) as total_motel FROM motel`, []);

    const total_motel_month = await connection.query(
      `
      SELECT CONCAT('Tháng ', MONTH(CreateDay)) as month, COUNT(IdMotel) as total_motel FROM motel GROUP BY month
    `,
      [],
    );

    return {
      motel_by_province,
      motel_by_district,
      motel_by_ward,
      motel_by_host,
      total_motel,
      total_motel_month,
    };
  },

  // BANNER
  adminGetAllBanner: async () => {
    console.log('lấy danh sách banner');
    const sql = 'SELECT * FROM banner';
    const result = await connection.query(sql, []);
    return {
      msg: 'Lấy danh sách banner thành công',
      banner: result,
    };
  },
  adminRemoveBanner: async ({ IdBanner }) => {
    console.log('Id remove', IdBanner);
    const sqlDelete = `DELETE FROM banner WHERE IdBanner = ?`;
    await connection.query(sqlDelete, [IdBanner]);
    const sql = 'SELECT * FROM banner';
    const banner = await connection.query(sql, []);
    return {
      msg: 'Xóa banner thành công',
      banner,
    };
  },

  adminAddBanner: async (data) => {
    const { banner, active } = data;
    let sqlIsertBanner = `INSERT INTO banner(IdBanner, srcBanner, Active) VALUES `;
    for (let i = 0; i < banner?.length; i++) {
      const IdBanner = uniqid('IdBanner_');
      sqlIsertBanner += `('${IdBanner}', '${banner[i]?.filename}', 1),`;
    }
    sqlIsertBanner = sqlIsertBanner.slice(0, -1);
    console.log(sqlIsertBanner);
    await connection.query(sqlIsertBanner, []);
    return {
      msg: 'Thêm banner thành công',
    };
  },
  adminUpdateBanner: async (data) => {
    const { id, banner, active } = data;
    if (!banner[0]) {
      const sqlUpdateBanner = `UPDATE banner SET Active = ? WHERE IdBanner = ?`;
      await connection.query(sqlUpdateBanner, [active, id]);
    } else {
      const sqlSelectBannerOld = `SELECT srcBanner FROM banner WHERE IdBanner = ?`;
      const srcBannerOld = await connection.query(sqlSelectBannerOld, [id]);
      if (srcBannerOld[0]) {
        const oldFile = srcBannerOld[0].srcBanner;
        const imagePath = `${__dirname}\\public\\images\\banners\\${oldFile}`;
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
      }

      const sqlUpdateBanner = `UPDATE banner SET srcBanner = ?, Active = ? WHERE IdBanner = ?`;
      await connection.query(sqlUpdateBanner, [banner[0]?.filename, active, id]);
    }
    return { msg: 'Cập nhật banner thành công' };
  },
  adminGetBanner: async (IdBanner) => {
    console.log(IdBanner);
    const sql = `SELECT * FROM banner WHERE IdBanner = ?`;
    const banner = await connection.query(sql, [IdBanner]);
    return { banner };
  },
};

export default adminModel;
