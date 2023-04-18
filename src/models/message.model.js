const connection = require('./db');

const messageModel = {
  // SUBMIT MESSAGE
  addMessage: async ({ Content, IdMotel, IdUser }) => {
    try {
      const sql1 = `INSERT INTO message(Content,CreateDay ,IdUser, IdMotel) VALUES("${Content}" ,NOW() ,${IdUser}, ${IdMotel})`;
      const sql2 = `
      SELECT Content, user.IdUser, IdMotel, 
      hour(CreateDay) as hour, minute(CreateDay) as minute 
      FROM user, message 
      WHERE user.IdUser = message.IdUser
      AND message.IdMotel = ${IdMotel}
      `;
      await connection.query(sql1, []);
      const result = await connection.query(sql2, []);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  deleteMessage: async () => {
    try {
      const sql = `UPDATE message SET Active = 0 WHERE IdMessage = ${IdMessage}`;
      const result = await connection.query(sql, []);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // CHAT BOX
  getAllMessagesUserInMotel: async (IdMotel) => {
    try {
      const sql = ` SELECT Content, user.IdUser, IdMotel, 
      hour(CreateDay) as hour, minute(CreateDay) as minute 
    FROM user, message WHERE user.IdUser = message.IdUser 
    AND message.IdMotel = ${IdMotel}
    `;
      const result = await connection.query(sql, []);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // LIST MESSAGE SIDEBAR
  getUserMessageList: async (IdUser) => {
    try {
      const sql = `
        SELECT * FROM user, motel, message
        WHERE motel.IdMotel IN
          (SELECT message.IdMotel
            FROM message, motel
            WHERE message.IdUser = ${IdUser}
            OR motel.IdMotel = message.IdMotel
            AND motel.IdUser = ${IdUser})
        AND message.IdMotel = motel.IdMotel AND
        (CASE
          WHEN (SELECT IdAuthority FROM user WHERE IdUser = ${IdUser}) = 3 THEN user.IdUser = motel.IdUser
          WHEN (SELECT IdAuthority FROM user WHERE IdUser = ${IdUser}) = 2 THEN user.IdUser = message.IdUser
        END)
        GROUP BY motel.IdMotel
        ORDER BY message.CreateDay DESC
        `;
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getAllMessageInMotel: async ({ IdMotel, IdUser }) => {
    try {
      const sql = `SELECT * FROM message, user 
      WHERE message.active = 1 
      AND IdMotel = ${IdMotel} 
      AND message.IdUser=user.IdUser
      AND message.IdUser = ${IdUser}
      `;
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

module.exports = messageModel;
