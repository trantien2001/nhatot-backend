const sql = require('./db');
const getImageMotel = (req, res) => {
  sql.query(
    `SELECT srcImage FROM image WHERE IdMotel = ${req.params.IdMotel}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get image in successfully!',
        image: result,
      });
    },
  );
};
const getAllImage = (req, res) => {
  sql.query('SELECT * FROM image', (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    return res.status(200).send({
      msg: 'Get image in successfully!',
      image: result,
    });
  });
};

const getAllImageActive = (req, res) => {
  sql.query('SELECT * FROM image WHERE active = 1', (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    return res.status(200).send({
      msg: 'Get image in successfully!',
      image: result,
    });
  });
};

module.exports = {
  getImageMotel,

  getAllImage,
  getAllImageActive,
};
