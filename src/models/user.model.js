const sql = require('./db');

const getAllUser = (req, res) => {
  sql.query('SELECT * FROM user', (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    return res.status(200).send({
      msg: 'Get user in successfully!',
      user: result,
    });
  });
};

const getAdmin = (req, res) => {
  sql.query(
    'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 1',
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get admin in successfully!',
        admin: result,
      });
    },
  );
};

const getHost = (req, res) => {
  sql.query(
    'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 2',
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get host in successfully!',
        admin: result,
      });
    },
  );
};

const getRenter = (req, res) => {
  sql.query(
    'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 3',
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get renter in successfully!',
        admin: result,
      });
    },
  );
};

const getAllUserActive = (req, res) => {
  sql.query('SELECT * FROM user WHERE active = 1', (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    return res.status(200).send({
      msg: 'Get user in successfully!',
      user: result,
    });
  });
};

module.exports = {
  getAllUser,
  getAllUserActive,
  getAdmin,
  getHost,
  getRenter,
};
