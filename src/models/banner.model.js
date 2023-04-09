const sql = require('./db');

const bannerModel = {
  getAllBanner: (req, res) => {
    sql.query('SELECT * FROM banner', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get banner in successfully!',
        banner: result,
      });
    });
  },

  getAllBannerActive: (req, res) => {
    sql.query('SELECT * FROM banner WHERE active = 1', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get banner active in successfully!',
        banner: result,
      });
    });
  },
  getBanner: (req, res) => {
    // sql.query(`SELECT * FROM banner WHERE id = ${req.params.Id}`, (err, result) => {
    //   if (err) {
    //     return res.status(400).send({ msg: err });
    //   }
    //   return res.status(200).send({
    //     msg: 'Get banner active in successfully!',
    //     banner: result,
    //   });
    // });
  },
  addBanner: (req, res) => {
    console.log(req.body);
    // if (!req.body.file) {
    //   console.log('No file upload');
    // } else {
    //   var imgsrc = 'http://127.0.0.1:3000/assets/images/banners/' + req.body.fileName;
    // console.log(imgsrc);
    // var insertData = 'INSERT INTO users_file(file_src)VALUES(?)';
    // db.query(insertData, [imgsrc], (err, result) => {
    //   if (err) throw err;
    //   console.log('file uploaded');
    // });
    // }
    // sql.query(
    //   `INSERT INTO banner(img, active) VALUES(${req.file},${req.body.active})`,
    //   (err, result) => {
    //     if (err) {
    //       return res.status(400).send({ msg: err });
    //     }
    //     return res.status(200).send({
    //       msg: 'Add banner in successfully!',
    //       banner: result,
    //     });
    //   },
    // );
  },

  updateBanner: () => {},

  deleteBanner: (req, res) => {
    sql.query(`UPDATE banner SET active=0 WHERE id = ${req.body.IdBanner}`, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Delete banner in successfully!',
        banner: result,
      });
    });
  },
};

module.exports = bannerModel;
