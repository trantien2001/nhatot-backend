const sql = require('./db');
const { io } = require('..');

const messageModel = {
  // SUBMIT MESSAGE
  addMessage: async (req, res) => {
    const { Content, IdMotel, IdUser } = req.body;
    await sql.query(
      `INSERT INTO message(Content,CreateDay ,IdUser, IdMotel) VALUES("${Content}" ,NOW() ,${IdUser}, ${IdMotel})`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ message: 'Tin nhắn không hợp lệ' });
        }
      },
    );
    await sql.query(
      `
    SELECT *, hour(CreateDay) as hour, minute(CreateDay) as minute FROM user, message 
    WHERE user.IdUser = message.IdUser
    AND message.IdMotel = ${IdMotel}
    `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        // io.emit('receive_message', result);
        // io.on('connection', (socket) => {
        //   console.log(socket);
        //   socket.on('send_message', (data) => {
        //     console.log(data);
        //     socket.to().emit('receive_message', result);
        //     console.log(result);
        //   });
        // });
        return res.status(200).send({
          msg: 'Post chat in successfully!',
          chat: result,
        });
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

  // LIST MESSAGE SIDEBAR
  getUserMessageList: (req, res) => {
    sql.query(
      `
      SELECT * FROM user, motel, message 
      WHERE motel.IdMotel IN 
        (SELECT message.IdMotel 
          FROM message, motel 
          WHERE message.IdUser = ${req.params.IdUser}
          OR motel.IdMotel = message.IdMotel 
          AND motel.IdUser = ${req.params.IdUser})
      AND message.IdMotel = motel.IdMotel AND
      (CASE 
      	WHEN (SELECT IdAuthority FROM user WHERE IdUser = ${req.params.IdUser}) = 3 THEN user.IdUser = motel.IdUser 
        WHEN (SELECT IdAuthority FROM user WHERE IdUser = ${req.params.IdUser}) = 2 THEN user.IdUser = message.IdUser
      END)
      
      GROUP BY motel.IdMotel
      ORDER BY message.CreateDay DESC
      `,

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
