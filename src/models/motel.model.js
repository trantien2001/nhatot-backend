const sql = require('./db');

const motelModel = {
  getAllInfoMotelActive: async (req, res) => {
    await sql.query(
      `SELECT
        motel.IdMotel,
        Title,
        Price,
        Acreage,
        Deposits,
        Status,
        Description,
        DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
        srcImage,
        Address,
        WardPrefix,
        WardName,
        DistrictPrefix,
        DistrictName,
        ProvinceName
        FROM motel, image, ward, district, province
    WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND Active = true
    AND image.IdMotel = Motel.IdMotel
    GROUP by Motel.IdMotel
    ORDER by CreateDay DESC
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

  getMotel: async (req, res) => {
    const IdMotel = req.params.IdMotel;
    await sql.query(
      `SELECT 
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
        ProvinceName
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

  FilterMotel: async (req, res) => {
    const { IdProvince, IdDistrict } = req.params;
    await sql.query(
      `SELECT 
      Title,
      Price,
      Acreage,
      Deposits,
      Status,
      Description,
      DATE_FORMAT(CreateDay, '%Y-%m-%d %H:%i:%s') as CreateDay,
      srcImage,
      Address,
      WardPrefix,
      WardName,
      DistrictPrefix,
      DistrictName,
      ProvinceName
      FROM motel, image, ward, district, province
      WHERE motel.IdWard = ward.IdWard
    AND ward.IdDistrict = district.IdDistrict
    AND district.IdProvince = province.IdProvince
    AND Active = true
    AND image.IdMotel = Motel.IdMotel
    AND Province.IdProvince = ${IdProvince}
    AND District.IdDistrict = ${IdDistrict}
    GROUP by Motel.IdMotel 
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

  addMotel: async (req, res) => {
    const IdMotel = (await sql.query('SELECT COUNT(IdMotel) FROM Motel')) + 1;
    const {
      Title,
      Price,
      Acreage,
      Address,
      Deposits,
      Status,
      Description,
      IdUser,
      IdWard,
    } = req.body;
    const srcImage = req.files['srcImage'][0].filename;
    var date = new Date();
    const CreateDay = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let queryImage = `INSERT INTO image(srcImage, IdMotel) value ('${srcImage}', ${IdMotel})`;

    await sql.query(
      `INSERT INTO 
    Motel(Title, Price, Acreage, Address, Deposits, Status, Description, CreateDay, IdUser, IdWard, Active)
    VALUE('${Title}', ${Price}, ${Acreage}, '${Address}', ${Deposits}, ${Status}, ${Description}, ${CreateDay}, ${IdUser}, ${IdWard}, true)`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'add motel in successfully!',
          motel: result,
        });
      },
    );
    await sql.query(queryImage, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get image in successfully!',
        motel: result,
      });
    });
  },

  updateImage: async (req, res) => {
    const { IdMotel, srcImage, IdImage } = req.body;
    sql.query(
      `
    UPDATE image SET srcImage = '${srcImage}', IdMotel = ${IdMotel} WHERE IdImage = ${IdImage}
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Update image in successfully!',
          motel: result,
        });
      },
    );
  },

  updateMotel: async (req, res) => {
    const {
      Title,
      Price,
      Acreage,
      Address,
      Deposits,
      Status,
      Description,
      CreateDay,
      IdUser,
      IdWard,
      Active,
      IdMotel,
    } = req.body;
    sql.query(
      `
        UPDATE motel SET 
        Title = '${Title}',
        Price = '${Price}',
        Acreage = '${Acreage}',
        Address = '${Address}',
            Deposits = '${Deposits}',
            Status = '${Status}',
            Description = '${Description}',
            CreateDay = '${CreateDay}',
            IdUser = ${IdUser},
            IdWard = ${IdWard},
            Active = ${Active}
        WHERE IdMotel = ${IdMotel}
        `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Update Motel in successfully!',
          motel: result,
        });
      },
    );
  },

  ActiveMotel: (req, res) => {
    const { IdMotel, Active } = req.body;
    sql.query(
      `UPDATE motel SET Active = ${Active} WHERE IdMotel = ${IdMotel}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Update active Motel in successfully!',
          motel: result,
        });
      },
    );
  },
};

module.exports = motelModel;
