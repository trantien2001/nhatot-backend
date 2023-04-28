import connection from './db.js';

const motelModel = {
  getMotelByIdUser: async (data) => {
    try {
      const { IdUser } = data;
      const sqlMotel = `SELECT * FROM motel WHERE IdUser = ?`;
      const motel = await connection.query(sqlMotel, [IdUser]);
      const sqlMedia = `SELECT * FROM media WHERE IdMotel IN (SELECT IdMotel FROM motel WHERE IdUser = ?)`;
      const media = await connection.query(sqlMedia, [IdUser]);
      return { motel, media, msg: 'Lấy thành công danh sách nhà trọ' };
    } catch (error) {
      return false;
    }
  },
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
      Avatar, motel.IdMotel, motel.IdUser, Name, Type,
      Title, Price, Acreage, Deposits,Status,Description,
      DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcMedia, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName, activeStatus
      FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND user.IdUser = motel.IdUser
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND media.IdMotel = motel.IdMotel
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

  getMotelsByIdWard: async ({ IdWard, start, quantity, priceMin, priceMax, acreageMin, acreageMax }) => {
    try {
      const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND Motel.IdWard = ${IdWard}
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
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
        srcMedia, motel.Address, WardPrefix,  WardName,
        DistrictPrefix, DistrictName, ProvinceName
        FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND Motel.IdWard = ${IdWard}
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      LIMIT ${start}, ${quantity}
      `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length, msg: 'Get motel in successfully!' };
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  },

  getMotelsByIdDistrict: async ({ IdDistrict, start, quantity, priceMin, priceMax, acreageMin, acreageMax }) => {
    try {
      const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ${IdDistrict}
    AND Price BETWEEN ${priceMin} AND ${priceMax}
      AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
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
      srcMedia, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ${IdDistrict}
    AND Price BETWEEN ${priceMin} AND ${priceMax}
    AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ${start}, ${quantity}
    `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length, msg: 'Get motel in successfully!' };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getMotelsByIdProvince: async ({ IdProvince, start, quantity, priceMin, priceMax, acreageMin, acreageMax }) => {
    try {
      const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND province.IdProvince = ${IdProvince}
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
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
      srcMedia, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
    AND province.IdProvince = ${IdProvince}
    AND Price BETWEEN ${priceMin} AND ${priceMax}
    AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ${start}, ${quantity}
    `;

      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length, msg: 'Get motel in successfully!' };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getLimitInfoMotelActive: async (data) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax } = data;
    try {
      const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
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
      srcMedia, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND Price BETWEEN ${priceMin} AND ${priceMax}
      AND Acreage BETWEEN ${acreageMin} AND ${acreageMax}
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
      LIMIT ${start}, ${quantity}
      `;
      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { motel: result2, count: result1.length, msg: 'Get motel in successfully!' };
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getAllInfoMotelActive: async (data) => {
    // const { start, quantity, priceMin, priceMax } = data;
    try {
      const sql = `SELECT
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Avatar, Name, motel.IdMotel, Title, Price, Acreage,
      Deposits, Status, Description,
      DATE_FORMAT(motel.CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcMedia, motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName
      FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
      `;
      const result = await connection.query(sql, []);
      return { motel: result };
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Thành công

  add: async (data) => {
    const { acreage, address, deposits, description, idUser, interiorStatus, price, province, title, ward, media } =
      data;
    // console.log({ acreage, address, deposits, description, idUser, interiorStatus, price, province, title, ward, media });
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

      let sql3 = `INSERT INTO media (srcMedia, Type, IdMotel) VALUES `;

      for (let i = 0; i < media?.length; i++) {
        sql3 += `('${media[i]?.filename}', 
        '${
          media[i]?.filename.split('.')[1] == 'jpg' || media[i]?.filename.split('.')[1] == 'png'
            ? 'image'
            : media[i]?.filename.split('.')[1] == 'mp4'
            ? 'video'
            : ''
        }', 
        ${countMotel[0]?.count}),`;
      }

      sql3 = sql3.slice(0, -1);
      console.log(sql3);
      await connection.query(sql3);

      return { msg: 'Đăng nhà trọ thành công' };
    } catch (error) {
      console.log('error');
      return error;
    }
  },

  getMotelsByPriceRangeInDistrict: async ({ begin, end, start, IdDistrict, quantity }) => {
    try {
      const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
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
    srcMedia, motel.Address, WardPrefix, WardName,
    DistrictPrefix, DistrictName, ProvinceName, Price
    FROM motel, media, ward, district, province, user
  WHERE motel.IdWard = ward.IdWard
  AND ward.IdDistrict = district.IdDistrict
  AND district.IdProvince = province.IdProvince
  AND motel.Active = true
  AND user.IdUser = motel.IdUser
  AND media.IdMotel = Motel.IdMotel
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
      const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
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
      srcMedia, motel.Ad DistrictName, ProvinceName
      FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
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

export default motelModel;