const sql = require('./db');

const messageModel = {
  addMessage: async (req, res) => {
    const { Content, IdMotel, IdUser } = req.body;
    await sql.query(
      `INSERT INTO message(Content,CreateDay ,IdUser, IdMotel) VALUES("${Content}" ,NOW() ,${IdUser}, ${IdMotel})`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ message: 'Tin nhắn không hợp lệ' });
        }
        sql.query(
          `
        SELECT *, hour(CreateDay) as hour, minute(CreateDay) as minute FROM user, message 
        WHERE user.IdUser = message.IdUser
        AND message.IdMotel = ${IdMotel}
        `,
          (err, result) => {
            if (err) {
              return res.status(400).send({ msg: err });
            }
            return res.status(200).send({
              msg: 'Post chat in successfully!',
              chat: result,
            });
          },
        );
      },
    );
  },

  deleteMessage: (req, res) => {
    sql.query(
      `UPDATE message SET Active = 0 WHERE IdMessage = ${red.body.IdMessage}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Delete message in successfully!',
          message: result,
        });
      },
    );
  },

  // CHAT BOX
  getAllMessagesUserInMotel: (req, res) => {
    sql.query(
      ` SELECT *, hour(CreateDay) as hour, minute(CreateDay) as minute 
    FROM user, message
    WHERE user.IdUser = message.IdUser 
    AND message.IdMotel = ${req.params.IdMotel}
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get chat in successfully!',
          chat: result,
        });
      },
    );
  },

  getUserMessageList: (req, res) => {
    sql.query(
      `SELECT * FROM message, user, motel WHERE motel.IdMotel IN 
    (SELECT message.IdMotel FROM message 
      WHERE message.IdUser = ${req.params.IdUser})
      AND motel.IdMotel = message.IdMotel 
      AND user.IdUser = message.IdUser
      AND message.IdUser != ${req.params.IdUser})
      GROUP BY message.IdMotel 
      ORDER BY message.CreateDay DESC`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get message in successfully!',
          message: result,
        });
      },
    );
  },

  getAllMessage: (req, res) => {
    sql.query('SELECT * FROM message', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get message in successfully!',
        message: result,
      });
    });
  },

  getAllMessageActive: (req, res) => {
    sql.query('SELECT * FROM message WHERE active = 1', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get message in successfully!',
        message: result,
      });
    });
  },

  getAllMessageInMotel: (req, res) => {
    const { IdMotel, IdUser } = req.body;
    sql.query(
      `SELECT * FROM message, user 
      WHERE message.active = 1 
      AND IdMotel = ${IdMotel} 
      AND message.IdUser=user.IdUser
      AND message.IdUser = ${IdUser}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Get message by motel in successfully!',
          message: result,
        });
      },
    );
  },
};
module.exports = messageModel;
