const connection = require('./db');

const motelModel = {
  // Thành công
  getMotel: async (IdMotel) => {
    try {
      const sql = `SELECT 
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, motel.CreateDay, now()) as minute,
      timestampdiff(second, motel.CreateDay, now()) as second,
      timestampdiff(month, operatingTime, now()) as monthOperatingTime,
      timestampdiff(week, operatingTime, now()) as weekOperatingTime,
      timestampdiff(day, operatingTime, now()) as dayOperatingTime,
      timestampdiff(hour, operatingTime, now()) as hourOperatingTime,
      timestampdiff(minute, operatingTime, now()) as minuteOperatingTime,
      timestampdiff(second, operatingTime, now()) as secondOperatingTime,
      Avatar, motel.IdMotel, motel.IdUser, Name,
      Title, Price, Acreage, Deposits,Status,Description,
      DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcImage, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName, activeStatus
      FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND user.IdUser = motel.IdUser
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND image.IdMotel = motel.IdMotel
      AND motel.IdMotel = ${IdMotel}
      GROUP by motel.IdMotel
      `;
      const result = await connection.query(sql, []);
      return { motel: result, msg: 'Get motel in successfully!' };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getMotelsByIdWard: async ({ IdWard, start, quantity, priceMin, priceMax }) => {
    try {
      const sql1 = `SELECT Name FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Motel.IdWard = ${IdWard}
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `;
      const sql2 = `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar, Name, motel.IdMotel, Title, Price, Acreage,
        Deposits, Status, Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage, motel.Address, WardPrefix,  WardName,
        DistrictPrefix, DistrictName, ProvinceName
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Motel.IdWard = ${IdWard}
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      LIMIT ${start}, ${quantity}
      `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length };
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  },

  getMotelsByIdDistrict: async ({ IdDistrict, start, quantity, priceMin, priceMax }) => {
    try {
      const sql1 = `SELECT Name FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ${IdDistrict}
    AND Price BETWEEN ${priceMin} AND ${priceMax}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    `;
      const sql2 = `SELECT
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Avatar, Name, motel.IdMotel, Title, Price, Acreage,
      Deposits, Status, Description,
      DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcImage, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ${IdDistrict}
    AND Price BETWEEN ${priceMin} AND ${priceMax}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ${start}, ${quantity}
    `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getMotelsByIdProvince: async ({ IdProvince, start, quantity, priceMin, priceMax }) => {
    try {
      const sql1 = `SELECT Name FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND province.IdProvince = ${IdProvince}
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `;
      const sql2 = `SELECT
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Avatar, Name, motel.IdMotel, Title, Price,
      Acreage, Deposits, Status, Description,
      DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcImage, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    AND province.IdProvince = ${IdProvince}
    AND Price BETWEEN ${priceMin} AND ${priceMax}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ${start}, ${quantity}
    `;

      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getAllInfoMotelActive: async (data) => {
    const { start, quantity, priceMin, priceMax } = data;
    try {
      const sql1 = `SELECT Name FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
      `;
      const sql2 = `SELECT
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Avatar, Name, motel.IdMotel, Title, Price, Acreage,
      Deposits, Status, Description,
      DATE_FORMAT(motel.CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcImage, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
      LIMIT ${start}, ${quantity}
      `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length };
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Thành công

  add: async (data) => {
    const { acreage, address, deposits, description, idUser, interiorStatus, price, province, title, ward, image } =
      data;

    try {
      const sql =
        'SELECT IdWard from ward, province WHERE ward.IdProvince = province.IdProvince AND WardName = ? AND ProvinceName = ?';
      const result = await connection.query(sql, [ward, province]);
      console.log(result[0].IdWard);

      const sql1 = `INSERT INTO motel (Title, Price, Acreage, Address, Deposits,Status, Description, CreateDay, IdUser, IdWard)
        VALUES(?,?,?,?,?,?,?,NOW(),?,?)
        `;

      await connection.query(sql1, [
        title,
        price,
        acreage,
        address,
        deposits,
        interiorStatus,
        description,
        idUser,
        result[0].IdWard,
      ]);

      const sql2 = 'SELECT COUNT(*) as count FROM motel';
      const countMotel = await connection.query(sql2);

      let sql3 = `INSERT INTO image (srcImage, IdMotel) VALUES `;

      for (let i = 0; i < image?.length; i++) {
        sql3 += `('${image[i]?.filename}', ${countMotel[0]?.count}),`;
      }

      sql3 = sql3.slice(0, -1);
      console.log(sql3);
      await connection.query(sql3);

      // const result2 = await connection.query(sql2, []);
      // const sql3 = ``;
      // const result3 = await connection.query(sql3, []);
      return { msg: 'Đăng nhà trọ thành công' };
    } catch (error) {
      return error;
    }
  },

  getMotelsByPriceRangeInDistrict: async ({ begin, end, start, IdDistrict, quantity }) => {
    try {
      const sql1 = `SELECT Name FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ${IdDistrict}
    AND Price BETWEEN ${begin} AND ${end}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    `;
      const sql2 = `SELECT
    timestampdiff(month, motel.CreateDay, now()) as month,
    timestampdiff(week, motel.CreateDay, now()) as week,
    timestampdiff(day, motel.CreateDay, now()) as day,
    timestampdiff(hour, motel.CreateDay, now()) as hour,
    timestampdiff(minute, CreateDay, now()) as minute,
    timestampdiff(second, CreateDay, now()) as second,
    Avatar, Name, motel.IdMotel, Title, Acreage, Deposits,
    Status, Description,
    DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
    srcImage, motel.Address, WardPrefix, WardName,
    DistrictPrefix, DistrictName, ProvinceName, Price
    FROM motel, image, ward, district, province, user
  WHERE motel.IdWard = ward.IdWard
  AND ward.IdDistrict = district.IdDistrict
  AND district.IdProvince = province.IdProvince
  AND motel.Active = true
  AND user.IdUser = motel.IdUser
  AND image.IdMotel = Motel.IdMotel
  AND district.IdDistrict = ${IdDistrict}
  AND Price BETWEEN ${begin} AND ${end}
  GROUP by Motel.IdMotel
  ORDER by motel.CreateDay DESC
  LIMIT ${start}, ${quantity}
  `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getMotelsByPriceRangeInProvince: async (start, end, IdProvince, begin, quantity) => {
    try {
      const sql1 = `SELECT Name FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    AND province.IdProvince = ${IdProvince}
    AND Price BETWEEN ${begin} AND ${end}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    `;
      const sql2 = `SELECT
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Avatar, Name, motel.IdMotel, Title, Price, Acreage,
      Deposits, Status, Description,
      DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcImage, motel.Ad DistrictName, ProvinceName
      FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    AND province.IdProvince = ${IdProvince}
    AND Price BETWEEN ${begin} AND ${end}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ${start}, ${quantity}
    `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length };
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = motelModel;
