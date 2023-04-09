const sql = require('./db');

const motelModel = {
  getMotelsByPriceRange: async (req, res) => {
    var count = 0;
    const { begin, end } = { begin: 1, end: 2 };
    await sql.query(
      `SELECT
        Name,
        Price
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Price BETWEEN ${begin} AND ${end}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `
      SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(motel.CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Price BETWEEN ${begin} AND ${end}
      GROUP by Motel.IdMotel
      ORDER by CreateDay DESC
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },

  // getMotelsByPriceRangeInWard: async (req, res) => {
  //   var count = 0;
  //   const { begin, start, end, quantity, IdWard } = req.body;
  //   await sql.query(
  //     `SELECT
  //       Name
  //       FROM motel, image, ward, district, province, user
  //     WHERE motel.IdWard = ward.IdWard
  //     AND ward.IdDistrict = district.IdDistrict
  //     AND district.IdProvince = province.IdProvince
  //     AND motel.Active = true
  //     AND user.IdUser = motel.IdUser
  //     AND image.IdMotel = Motel.IdMotel
  //     AND Motel.IdWard = ${IdWard}
  //     AND Price BETWEEN ${begin} AND ${end}
  //     GROUP by Motel.IdMotel
  //     ORDER by motel.CreateDay DESC
  //     `,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).send({ msg: err });
  //       }
  //       count = result.length;
  //     },
  //   );
  //   await sql.query(
  //     `SELECT
  //       timestampdiff(month, motel.CreateDay, now()) as month,
  //       timestampdiff(week, motel.CreateDay, now()) as week,
  //       timestampdiff(day, motel.CreateDay, now()) as day,
  //       timestampdiff(hour, motel.CreateDay, now()) as hour,
  //       timestampdiff(minute, CreateDay, now()) as minute,
  //       timestampdiff(second, CreateDay, now()) as second,
  //       Avatar,
  //       Name,
  //       motel.IdMotel,
  //       Title,
  //       Price,
  //       Acreage,
  //       Deposits,
  //       Status,
  //       Description,
  //       DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
  //       srcImage,
  //       motel.Address,
  //       WardPrefix,
  //       WardName,
  //       DistrictPrefix,
  //       DistrictName,
  //       ProvinceName
  //       FROM motel, image, ward, district, province, user
  //     WHERE motel.IdWard = ward.IdWard
  //     AND ward.IdDistrict = district.IdDistrict
  //     AND district.IdProvince = province.IdProvince
  //     AND motel.Active = true
  //     AND user.IdUser = motel.IdUser
  //     AND image.IdMotel = Motel.IdMotel
  //     AND Motel.IdWard = ${IdWard}
  //     AND Price BETWEEN ${begin} AND ${end}
  //     GROUP by Motel.IdMotel
  //     ORDER by motel.CreateDay DESC
  //     LIMIT ${start}, ${quantity}
  //     `,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).send({ msg: err });
  //       }

  //       return res.status(200).send({
  //         msg: 'Get motel in successfully!',
  //         count,
  //         motel: result,
  //       });
  //     },
  //   );
  // },

  getMotelsByIdWard: async (req, res) => {
    var count = 0;
    await sql.query(
      `SELECT
        Name
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Motel.IdWard = ${req.params.IdWard}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND Motel.IdWard = ${req.params.IdWard}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      LIMIT ${req.body.start}, ${req.body.quantity}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }

        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },

  getMotelsByPriceRangeInDistrict: async (req, res) => {
    var count = 0;
    const { begin, end, start, IdDistrict, quantity } = req.body;
    await sql.query(
      `SELECT
        Name
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
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month,
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day,
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        Price
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
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },
  getMotelsByIdDistrict: async (req, res) => {
    var count = 0;
    await sql.query(
      `SELECT
        Name
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND district.IdDistrict = ${req.params.IdDistrict}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND district.IdDistrict = ${req.params.IdDistrict}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      LIMIT ${req.body.start}, ${req.body.quantity}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },
  getMotelsByPriceRangeInProvince: async (req, res) => {
    var count = 0;
    const { start, end, IdProvince, begin, quantity } = req.body;
    await sql.query(
      `SELECT
        Name
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
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
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
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },
  getMotelsByIdProvince: async (req, res) => {
    var count = 0;
    await sql.query(
      `SELECT
        Name
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND province.IdProvince = ${req.params.IdProvince}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        FROM motel, image, ward, district, province, user
      WHERE motel.IdWard = ward.IdWard
      AND ward.IdDistrict = district.IdDistrict
      AND district.IdProvince = province.IdProvince
      AND motel.Active = true
      AND user.IdUser = motel.IdUser
      AND image.IdMotel = Motel.IdMotel
      AND province.IdProvince = ${req.params.IdProvince}
      GROUP by Motel.IdMotel
      ORDER by motel.CreateDay DESC
      LIMIT ${req.body.start}, ${req.body.quantity}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },

  getAllInfoMotelActive: async (req, res) => {
    var count = 0;
    await sql.query(
      `SELECT
        Name
        FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    GROUP by Motel.IdMotel
    ORDER by CreateDay DESC
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        count = result.length;
      },
    );
    await sql.query(
      `SELECT
        timestampdiff(month, motel.CreateDay, now()) as month, 
        timestampdiff(week, motel.CreateDay, now()) as week,
        timestampdiff(day, motel.CreateDay, now()) as day, 
        timestampdiff(hour, motel.CreateDay, now()) as hour,
        timestampdiff(minute, CreateDay, now()) as minute,
        timestampdiff(second, CreateDay, now()) as second,
        Avatar,
        Name,
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(motel.CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND user.IdUser = motel.IdUser
    AND image.IdMotel = Motel.IdMotel
    GROUP by Motel.IdMotel
    ORDER by CreateDay DESC
    LIMIT ${req.body.start}, ${req.body.quantity}
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }

        return res.status(200).send({
          msg: 'Get motel in successfully!',
          count,
          motel: result,
        });
      },
    );
  },

  getMotel: async (req, res) => {
    const IdMotel = req.params.IdMotel;
    await sql.query(
      `SELECT 
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
        Avatar,
        motel.IdMotel,
        motel.IdUser,
        Name,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        motel.Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName,
        activeStatus
    FROM motel, image, ward, district, province, user
    WHERE motel.IdWard = ward.IdWard
    AND user.IdUser = motel.IdUser
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND motel.Active = true
    AND image.IdMotel = motel.IdMotel
    AND motel.IdMotel = ${IdMotel}
    GROUP by motel.IdMotel
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get motel in successfully!',
          motel: result,
        });
      },
    );
  },

  // addMotel: async (req, res) => {
  //   const IdMotel = (await sql.query('SELECT COUNT(IdMotel) FROM Motel')) + 1;
  //   const { Title, Price, Acreage, Address, Deposits, Status, Description, IdUser, IdWard } =
  //     req.body;
  //   const srcImage = req.files['srcImage'][0].filename;
  //   var date = new Date();
  //   const CreateDay = `${date.getFullYear()}-${
  //     date.getMonth() + 1
  //   }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  //   let queryImage = `INSERT INTO image(srcImage, IdMotel) value ('${srcImage}', ${IdMotel})`;

  //   await sql.query(
  //     `INSERT INTO
  //   Motel(Title, Price, Acreage, Address, Deposits, Status, Description, CreateDay, IdUser, IdWard, Active)
  //   VALUE('${Title}', ${Price}, ${Acreage}, '${Address}', ${Deposits}, ${Status}, ${Description}, ${CreateDay}, ${IdUser}, ${IdWard}, true)`,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).send({ msg: err });
  //       }
  //       return res.status(200).send({
  //         msg: 'add motel in successfully!',
  //         motel: result,
  //       });
  //     },
  //   );
  //   await sql.query(queryImage, (err, result) => {
  //     if (err) {
  //       return res.status(400).send({ msg: err });
  //     }
  //     return res.status(200).send({
  //       msg: 'Get image in successfully!',
  //       motel: result,
  //     });
  //   });
  // },

  // updateImage: async (req, res) => {
  //   const { IdMotel, srcImage, IdImage } = req.body;
  //   sql.query(
  //     `
  //   UPDATE image SET srcImage = '${srcImage}', IdMotel = ${IdMotel} WHERE IdImage = ${IdImage}
  //   `,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).send({ msg: err });
  //       }
  //       return res.status(200).send({
  //         msg: 'Update image in successfully!',
  //         motel: result,
  //       });
  //     },
  //   );
  // },

  // updateMotel: async (req, res) => {
  //   const {
  //     Title,
  //     Price,
  //     Acreage,
  //     Address,
  //     Deposits,
  //     Status,
  //     Description,
  //     CreateDay,
  //     IdUser,
  //     IdWard,
  //     Active,
  //     IdMotel,
  //   } = req.body;
  //   sql.query(
  //     `
  //       UPDATE motel SET
  //       Title = '${Title}',
  //       Price = '${Price}',
  //       Acreage = '${Acreage}',
  //       Address = '${Address}',
  //           Deposits = '${Deposits}',
  //           Status = '${Status}',
  //           Description = '${Description}',
  //           CreateDay = '${CreateDay}',
  //           IdUser = ${IdUser},
  //           IdWard = ${IdWard},
  //           Active = ${Active}
  //       WHERE IdMotel = ${IdMotel}
  //       `,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).send({ msg: err });
  //       }
  //       return res.status(200).send({
  //         msg: 'Update Motel in successfully!',
  //         motel: result,
  //       });
  //     },
  //   );
  // },

  // ActiveMotel: (req, res) => {
  //   const { IdMotel, Active } = req.body;
  //   sql.query(`UPDATE motel SET Active = ${Active} WHERE IdMotel = ${IdMotel}`, (err, result) => {
  //     if (err) {
  //       return res.status(400).send({ msg: err });
  //     }
  //     return res.status(200).send({
  //       msg: 'Update active Motel in successfully!',
  //       motel: result,
  //     });
  //   });
  // },
};

module.exports = motelModel;
