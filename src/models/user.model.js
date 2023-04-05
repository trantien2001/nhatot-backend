const sql = require('./db');

const userModel = {
  getInfoUser: (req, res) => {
    sql.query(
      `
    SELECT * FROM user WHERE IdUser IN
    (SELECT IdUser FROM message WHERE IdMotel = ${req.body.IdMotel} 
    AND IdUser != ${req.body.IdUser} OR IdUser IN
    (SELECT IdUser FROM motel WHERE IdMotel = ${req.body.IdMotel}) AND IdUser != ${req.body.IdUser} GROUP BY IdUser)
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get user in successfully!',
          user: result,
        });
      },
    );
  },
  getAllUser: (req, res) => {
    sql.query(
      'SELECT IdUser, Address, BirthDay, Email, Gender, Name, PhoneNumber FROM user',
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get user in successfully!',
          user: result,
        });
      },
    );
  },

  getAdmin: (req, res) => {
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
  },

  getHost: (req, res) => {
    sql.query(
      `SELECT * FROM user, authority
      WHERE user.IdAuthority = authority.IdAuthority
      AND user.IdAuthority = 2`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get host in successfully!',
          host: result,
        });
      },
    );
  },
  getHostById: (req, res) => {
    sql.query(
      `SELECT * FROM user, authority
      WHERE user.IdAuthority = authority.IdAuthority
      AND user.IdAuthority = 2
      AND IdUser = ${req.params.IdUser}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get host in successfully!',
          host: result,
        });
      },
    );
  },

  getRenter: (req, res) => {
    sql.query(
      'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 3',
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get renter in successfully!',
          renter: result,
        });
      },
    );
  },

  getRenterById: (req, res) => {
    sql.query(
      `SELECT * FROM user, authority 
      WHERE user.IdAuthority = authority.IdAuthority 
      AND user.IdAuthority = 3 
      AND IdUser = ${req.params.IdUser}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get renter in successfully!',
          renter: result,
        });
      },
    );
  },

  getAllUserActive: (req, res) => {
    sql.query('SELECT * FROM user WHERE active = 1', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get user in successfully!',
        user: result,
      });
    });
  },
};

module.exports = userModel;
