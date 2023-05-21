import connection from './db.js';
import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';
const __dirname = path.resolve();

const motelModel = {
  getMotelFavourite: async (data) => {
    const { IdUser } = data;
    const sqlGetMotelFavourite = `SELECT user.*, motel.*, favourite.*, media.*, ward.*, district.*, province.*, 
      timestampdiff(month, motel.CreateDay, now()) as month, 
      timestampdiff(week, motel.CreateDay, now()) as week,
      timestampdiff(day, motel.CreateDay, now()) as day, 
      timestampdiff(hour, motel.CreateDay, now()) as hour,
      timestampdiff(minute, motel.CreateDay, now()) as minute,
      timestampdiff(second, motel.CreateDay, now()) as second
      FROM user, motel, favourite, media, ward, district, province
        WHERE user.IdUser = motel.IdUser 
        AND motel.IdMotel = favourite.IdMotel 
        AND favourite.IdUser = ? 
        AND media.IdMotel = motel.IdMotel
        AND motel.IdWard = ward.IdWard
        AND ward.IdDistrict = district.IdDistrict
        AND district.IdProvince = province.IdProvince
        GROUP BY motel.IdMotel
      `;
    const motel = await connection.query(sqlGetMotelFavourite, [IdUser]);
    return { motel, msg: 'Lấy thành công danh sách nhà trọ' };
  },
  getMotelByIdUser: async (data) => {
    const { IdUser } = data;
    const sqlMotel = `SELECT * FROM motel WHERE IdUser = ?`;
    const motel = await connection.query(sqlMotel, [IdUser]);
    const sqlMedia = `SELECT * FROM media WHERE IdMotel IN (SELECT IdMotel FROM motel WHERE IdUser = ?)`;
    const media = await connection.query(sqlMedia, [IdUser]);
    return { motel, media, msg: 'Lấy thành công danh sách nhà trọ' };
  },
  // Thành công
  // Lấy trọ chỉnh sửa
  getMotel: async ({ IdMotel, IdUser }) => {
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
      motel.Address, WardPrefix, WardName,
      DistrictPrefix, DistrictName, ProvinceName, activeStatus, PhoneNumber
      FROM motel, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND user.IdUser = motel.IdUser
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.IdMotel = ?
      GROUP by motel.IdMotel
      `;
    const motel = await connection.query(sql, [IdMotel]);

    const sqlFavourite = 'SELECT IdMotel FROM favourite WHERE IdUser = ? AND IdMotel = ?';
    const favourite = await connection.query(sqlFavourite, [IdUser, IdMotel]);

    const sqlMedia = `SELECT * FROM media WHERE IdMotel = ?`;
    const media = await connection.query(sqlMedia, [IdMotel]);
    return { motel, media, favourite, msg: 'Get motel in successfully!' };
  },

  getInfoMotelByIdRoom: async (IdRoom) => {
    const sqlGetIdMotel = `SELECT IdMotel FROM room WHERE IdRoom = ?`;
    const idMotel = await connection.query(sqlGetIdMotel, [IdRoom]);
    console.log(idMotel);
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
        DistrictPrefix, DistrictName, ProvinceName, activeStatus, PhoneNumber
        FROM motel, media, ward, district, province, user
        WHERE motel.IdWard = ward.IdWard
        AND user.IdUser = motel.IdUser
        AND ward.IdDistrict = district.IdDistrict
        AND district.IdProvince = province.IdProvince
        AND media.IdMotel = motel.IdMotel
        AND motel.IdMotel = ?
        GROUP by motel.IdMotel
        `;
    const motel = await connection.query(sql, [idMotel[0].IdMotel]);

    const sqlMedia = `SELECT * FROM media WHERE IdMotel = ?`;
    const media = await connection.query(sqlMedia, [idMotel[0].IdMotel]);
    return { motel, media, msg: 'Get motel in successfully!' };
  },
  getMotelsByIdWard: async ({ IdWard, start, quantity, priceMin, priceMax, acreageMin, acreageMax, IdUser }) => {
    const sqlCountMotel = `SELECT Name FROM motel, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND Motel.IdWard = ?
      AND Price BETWEEN ? AND ?
      AND Acreage BETWEEN ? AND ?
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `;
    const sqlSelectLimitMotel = `SELECT
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
      AND Motel.IdWard = ?
      AND Price BETWEEN ? AND ?
      AND Acreage BETWEEN ? AND ?
      AND media.IdMotel = Motel.IdMotel
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      LIMIT ?, ?
      `;
    const sqlFavourite = 'SELECT IdMotel FROM favourite WHERE IdUser = ?';
    const favourite = await connection.query(sqlFavourite, [IdUser]);
    // const sqlMedia = 'SELECT * media'
    const count = await connection.query(sqlCountMotel, [IdWard, priceMin, priceMax, acreageMin, acreageMax]);
    const motel = await connection.query(sqlSelectLimitMotel, [
      IdWard,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
      start,
      quantity,
    ]);
    return { motel, count: count.length, msg: 'Get motel in successfully!', favourite };
  },

  getMotelsByIdDistrict: async ({
    IdDistrict,
    start,
    quantity,
    priceMin,
    priceMax,
    acreageMin,
    acreageMax,
    IdUser,
  }) => {
    const sqlCountMotel = `SELECT Name FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ?
    AND Price BETWEEN ? AND ?
      AND Acreage BETWEEN ? AND ?
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    `;
    const sqlSelectLimitMotel = `SELECT
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
    AND district.IdDistrict = ?
    AND Price BETWEEN ? AND ?
    AND Acreage BETWEEN ? AND ?
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ?, ?
    `;
    const sqlFavourite = 'SELECT IdMotel FROM favourite WHERE IdUser = ?';
    const favourite = await connection.query(sqlFavourite, [IdUser]);
    const count = await connection.query(sqlCountMotel, [IdDistrict, priceMin, priceMax, acreageMin, acreageMax]);
    const motel = await connection.query(sqlSelectLimitMotel, [
      IdDistrict,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
      start,
      quantity,
    ]);
    return { motel, count: count.length, msg: 'Get motel in successfully!', favourite };
  },

  getMotelsByIdProvince: async ({
    IdProvince,
    start,
    quantity,
    priceMin,
    priceMax,
    acreageMin,
    acreageMax,
    IdUser,
  }) => {
    const sqlCountMotel = `SELECT Name FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND province.IdProvince = ?
      AND Price BETWEEN ? AND ?
      AND Acreage BETWEEN ? AND ?
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `;
    const sqlSelectLimitMotel = `SELECT
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
    AND province.IdProvince = ?
    AND Price BETWEEN ? AND ?
    AND Acreage BETWEEN ? AND ?
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ?, ?
    `;
    const sqlFavourite = 'SELECT IdMotel FROM favourite WHERE IdUser = ?';
    const favourite = await connection.query(sqlFavourite, [IdUser]);
    const count = await connection.query(sqlCountMotel, [IdProvince, priceMin, priceMax, acreageMin, acreageMax]);
    const motel = await connection.query(sqlSelectLimitMotel, [
      IdProvince,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
      start,
      quantity,
    ]);
    return { motel, count: count.length, msg: 'Get motel in successfully!', favourite };
  },

  getLimitInfoMotelActive: async (data) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax, IdUser } = data;
    console.log({ start, quantity, priceMin, priceMax, acreageMin, acreageMax, IdUser });
    const sqlCountMotel = `SELECT Name FROM motel, media, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND media.IdMotel = Motel.IdMotel
      AND Price BETWEEN ? AND ?
      AND Acreage BETWEEN ? AND ?
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
      `;

    
    
    const sqlSelectLimitMotel = `SELECT
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
      AND Price BETWEEN ? AND ?
      AND Acreage BETWEEN ? AND ?
      OR media.IdMotel = Motel.IdMotel
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
      LIMIT ?, ?
      `;
    
    const sqlFavourite = 'SELECT IdMotel FROM favourite WHERE IdUser = ?';
    const favourite = await connection.query(sqlFavourite, [IdUser]);
    const count = await connection.query(sqlCountMotel, [priceMin, priceMax, acreageMin, acreageMax]);
    const motel = await connection.query(sqlSelectLimitMotel, [
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
      start,
      quantity,
    ]);
    return { motel, count: count.length, msg: 'Get motel in successfully!', favourite };
  },

  getAllInfoMotelActive: async (data) => {
    // const { start, quantity, priceMin, priceMax } = data;

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
  },

  // Thêm trọ
  add: async (data) => {
    const {
      acreage,
      address,
      deposits,
      description,
      IdUser,
      interiorStatus,
      price,
      province,
      title,
      ward,
      media,
      notifi,
    } = data;
    console.log({ acreage, address, deposits, description, IdUser, interiorStatus, price, province, title, ward });

    const sql =
      'SELECT IdWard from ward, province WHERE ward.IdProvince = province.IdProvince AND WardName = ? AND ProvinceName = ?';
    const result = await connection.query(sql, [ward, province]);
    const IdMotel = uniqid('IdMotel_');
    const sql1 = `INSERT INTO motel (IdMotel, Title, Price, Acreage, Address, Deposits,Status, Description, CreateDay, IdUser, IdWard)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
        `;

    await connection.query(sql1, [
      IdMotel,
      title,
      price,
      acreage,
      address,
      deposits,
      interiorStatus,
      description,
      IdUser,
      result[0].IdWard,
    ]);

    const sql2 = 'SELECT COUNT(*) as count FROM motel';
    const countMotel = await connection.query(sql2, []);

    let sql3 = `INSERT INTO media (IdMedia, srcMedia, Type, IdMotel) VALUES `;

    for (let i = 0; i < media?.length; i++) {
      const IdMedia = uniqid('IdMedia_');
      sql3 += `('${IdMedia}', '${media[i]?.filename}',
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
    await connection.query(sql3, []);

    const sqlFollowers = `SELECT IdFollowers FROM follow WHERE IdFollowing = ?`;
    const followers = await connection.query(sqlFollowers, [IdUser]);

    let sqlAddNotifi = `INSERT INTO notifi(IdNotifi, IdSender, IdReceiver, Content, CreateDay) VALUES`;
    for (let i = 0; i < followers.length; i++) {
      const IdNotifi = uniqid('IdNotifi_');
      sqlAddNotifi += `('${IdNotifi}', ${IdUser}, ${followers[i].IdFollowers}, '${notifi}', NOW()),`;
    }
    sqlAddNotifi = sqlAddNotifi.slice(0, -1);
    await connection.query(sqlAddNotifi, []);
    return { msg: 'Đăng nhà trọ thành công', followers, notifi };
  },
  // Cập nhật trọ
  update: async (data) => {
    const {
      acreage,
      address,
      deposits,
      description,
      // IdUser,
      interiorStatus,
      price,
      province,
      title,
      ward,
      // notifi,
      IdMotel,
      media,
      mediaDelete,
    } = data;
    console.log(data);
    const selectIdWard =
      'SELECT IdWard from ward, province WHERE ward.IdProvince = province.IdProvince AND WardName = ? AND ProvinceName = ?';
    const result = await connection.query(selectIdWard, [ward, province]);

    const updateMotel = `UPDATE motel 
      SET Title = ?, Price = ?, Acreage = ?, Address = ?, 
      Deposits = ?, Status = ?, Description = ?,
      CreateDay = NOW(), IdWard = ?, Active = ? WHERE IdMotel = ?
      `;
    await connection.query(updateMotel, [
      title,
      price,
      acreage,
      address,
      deposits,
      interiorStatus,
      description,
      result[0].IdWard,
      1,
      IdMotel,
    ]);
    console.log(mediaDelete.length);
    console.log(media.length);
    if (mediaDelete?.length > 0) {
      for (let i = 0; i < mediaDelete.length; i++) {
        const oldFile = mediaDelete[i];
        console.log(oldFile);
        console.log('dirname', __dirname);
        // const imagePath = path.join(__dirname, 'public\images\motels', oldFile.media_link);
        const imagePath = `${__dirname}\\public\\images\\motels\\${oldFile}`;
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
          console.log('delete success!');
        } else {
          console.log("can't find out file in server " + ' in ' + imagePath);
        }
      }

      let strDeleteMedia = '"';
      strDeleteMedia += mediaDelete.join('", "');
      strDeleteMedia += '"';
      const deleteMedia = `DELETE FROM media WHERE srcMedia IN (${strDeleteMedia})`;
      console.log(deleteMedia);
      await connection.query(deleteMedia, []);
    }
    if (media?.length > 0) {
      let addMedia = `INSERT INTO media (IdMedia, srcMedia, Type, IdMotel) VALUES `;

      for (let i = 0; i < media?.length; i++) {
        const IdMedia = uniqid('IdMedia_');
        addMedia += `('${IdMedia}', '${media[i]?.filename}',
    '${
      media[i]?.filename.split('.')[1] == 'jpg' || media[i]?.filename.split('.')[1] == 'png'
        ? 'image'
        : media[i]?.filename.split('.')[1] == 'mp4'
        ? 'video'
        : ''
    }',
    ${IdMotel}),`;
      }
      addMedia = addMedia.slice(0, -1);
      console.log(addMedia);
      await connection.query(addMedia, []);
    }
  },

  getMotelsByPriceRangeInDistrict: async ({ begin, end, start, IdDistrict, quantity }) => {
    const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
    AND district.IdDistrict = ?
    AND Price BETWEEN ? AND ?
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
  AND district.IdDistrict = ?
  AND Price BETWEEN ? AND ?
  GROUP by Motel.IdMotel
  ORDER by motel.CreateDay DESC
  LIMIT ?, ?
  `;
    const result1 = await connection.query(sql1, [IdDistrict, begin, end]);
    const result2 = await connection.query(sql2, [IdDistrict, begin, end, start, quantity]);
    return { motel: result2, count: result1.length };
  },

  getMotelsByPriceRangeInProvince: async (start, end, IdProvince, begin, quantity) => {
    const sql1 = `SELECT Name FROM motel, media, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND media.IdMotel = Motel.IdMotel
    AND province.IdProvince = ?
    AND Price BETWEEN ? AND ?
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
    AND province.IdProvince = ?
    AND Price BETWEEN ? AND ?
    GROUP by Motel.IdMotel
    ORDER by motel.CreateDay DESC
    LIMIT ?, ?
    `;
    const result1 = await connection.query(sql1, [IdProvince, begin, end]);
    const result2 = await connection.query(sql2, [IdProvince, begin, end, start, quantity]);
    return { motel: result2, count: result1.length };
  },
};

export default motelModel;
