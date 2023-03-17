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

  addBanner: (req, res) => {
    sql.query(`INSERT INTO banner(img) VALUES(...)`, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Add banner in successfully!',
        banner: result,
      });
    });
  },

  deleteBanner: (req, res) => {
    sql.query(
      `UPDATE banner SET active=0 WHERE id = ${req.body.IdBanner}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Delete banner in successfully!',
          banner: result,
        });
      },
    );
  },
  
};

module.exports = bannerModel;
