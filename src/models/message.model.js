import connection from './db.js';
import uniqid from 'uniqid';

const messageModel = {
  createRoom: async ({ IdHost, IdRenter, IdMotel }) => {
    const sqlCheckRoom = 'SELECT * FROM room WHERE IdHost = ? AND IdRenter = ? AND IdMotel = ?';
    const checkRoom = await connection.query(sqlCheckRoom, [IdHost, IdRenter, IdMotel]);
    if (checkRoom.length > 0) {
      return { IdRoom: checkRoom[0].IdRoom };
    } else {
      const IdRoom = uniqid('IdRoom_');
      const sqlCreateRoom = `INSERT INTO room(IdRoom, IdHost, IdRenter, IdMotel) VALUES(?, ?, ?, ?)`;
      await connection.query(sqlCreateRoom, [IdRoom, IdHost, IdRenter, IdMotel]);
      return { IdRoom };
    }
    // const sqlSelectIdRoom = `SELECT IdRoom FROM room WHERE IdHost = ? AND IdRenter = ? AND IdMotel = ?`;
    // const result = await connection.query(sqlSelectIdRoom, [IdHost, IdRenter, IdMotel]);
  },

  // SUBMIT MESSAGE
  addMessage: async ({ Content, IdRoom, IdUser }) => {
    const IdMessage = uniqid('IdMessage_');
    const sql1 = `INSERT INTO message(IdMessage, Content, CreateDay ,IdUser, IdRoom) VALUES(?, ? ,NOW() , ?, ?)`;
    const sql2 = `
      SELECT Content, user.IdUser, IdRoom, 
      hour(message.CreateDay) as hour, minute(message.CreateDay) as minute 
      FROM user, message 
      WHERE user.IdUser = message.IdUser
      AND message.IdRoom = ?
      `;
    await connection.query(sql1, [IdMessage, Content, IdUser, IdRoom]);
    const result = await connection.query(sql2, [IdRoom]);
    return result;
  },

  // deleteMessage: async () => {
  //   const sql = `UPDATE message SET Active = 0 WHERE IdMessage = `;
  //   const result = await connection.query(sql, [IdMessage]);
  //   return result;
  // },

  // CHAT BOX
  getAllMessagesUserInMotel: async (IdRoom) => {
    const sql = `SELECT Content, user.IdUser, 
        hour(message.CreateDay) as hour, minute(message.CreateDay) as minute,
        year(message.CreateDay) as year, 
        month(message.CreateDay) as month,
        day(message.CreateDay) as day,
        message.CreateDay
      FROM user, message, room
      WHERE user.IdUser = message.IdUser 
      and room.IdRoom = message.IdRoom
      AND message.IdRoom = ?
      GROUP BY message.CreateDay ASC
    `;
    const result = await connection.query(sql, [IdRoom]);
    return result;
  },

  getMessageByNameUser: async (data) => {
    const { nameUser, IdUser } = data;
    console.log(nameUser);

    const sql = `SELECT * FROM user, motel, message
      WHERE motel.IdMotel IN
        (SELECT message.IdMotel
          FROM message, motel
          WHERE message.IdUser = ?
          OR motel.IdMotel = message.IdMotel
          AND motel.IdUser = ?)
      AND message.IdMotel = motel.IdMotel AND
      (CASE
        WHEN (SELECT IdAuthority FROM user WHERE IdUser = ?) = 3 THEN user.IdUser = motel.IdUser
        WHEN (SELECT IdAuthority FROM user WHERE IdUser = ?) = 2 THEN user.IdUser = message.IdUser
      END)
      AND user.Name like '% ? %'
      GROUP BY motel.IdMotel
      ORDER BY message.CreateDay DESC`;
    const result = await connection.query(sql, [IdUser, IdUser, IdUser, IdUser, nameUser]);
    return result;
  },

  // LIST MESSAGE SIDEBAR
  getUserMessageList: async (IdUser) => {
    // const sqlRooms = `SELECT IdMotel FROM message WHERE message.IdUser = ${IdUser} GROUP BY IdMotel`;
    // const rooms = await connection.query(sqlRooms, []);
    // let sqlss = '';
    // if (rooms[0]) {
    //   for (let i = 0; i < rooms.length; i++) {
    //     const sqlIdUser = `SELECT IdUser FROM message
    //       WHERE IdMotel = ${rooms[i].IdMotel}
    //       AND IdUser != ${IdUser}
    //       GROUP BY IdUser `;
    //     const result = await connection.query(sqlIdUser, []);
    //     if (result[0]) {
    //       sqlss += `message.IdMotel = ${rooms[i].IdMotel} AND user.IdUser = ${result[0].IdUser} OR `;
    //     }
    //   }
    //   sqlss = sqlss.slice(0, -3);
    // }

    const sql = `
        SELECT message.*, user.*, room.*, motel.*,
        timestampdiff(month, message.CreateDay, now()) as month,
        timestampdiff(week, message.CreateDay, now()) as week,
        timestampdiff(day, message.CreateDay, now()) as day,
        timestampdiff(hour, message.CreateDay, now()) as hour,
        timestampdiff(minute, message.CreateDay, now()) as minute,
        timestampdiff(second, message.CreateDay, now()) as second
        FROM message, user, room, motel
        WHERE message.IdRoom in (SELECT IdRoom FROM room WHERE IdRenter = ? OR IdHost = ?) 
        and message.IdRoom = room.IdRoom
        and motel.IdMotel = room.IdMotel
        and (CASE
          when (SELECT IdAuthority FROM user WHERE IdUser = ?) = 3 THEN room.IdHost = user.IdUser
          when (SELECT IdAuthority FROM user WHERE IdUser = ?) = 2 then room.IdRenter = user.IdUser
        END)
        ORDER BY message.CreateDay DESC
      `;

    // const sql = `SELECT user.Name, motel.IdMotel, message.Content,
    // const sql = `SELECT user.*, motel.*, message.*,
    // timestampdiff(month, message.CreateDay, now()) as month,
    // timestampdiff(week, message.CreateDay, now()) as week,
    // timestampdiff(day, message.CreateDay, now()) as day,
    // timestampdiff(hour, message.CreateDay, now()) as hour,
    // timestampdiff(minute, message.CreateDay, now()) as minute,
    // timestampdiff(second, message.CreateDay, now()) as second
    // FROM user, motel, message
    // WHERE motel.IdMotel IN (SELECT message.IdMotel FROM message WHERE message.IdUser = ${IdUser})
    // AND (CASE
    //   WHEN (SELECT IdAuthority FROM user WHERE IdUser = ${IdUser}) = 3
    //   THEN user.IdUser = motel.IdUser AND message.IdMotel = motel.IdMotel
    //   WHEN (SELECT IdAuthority FROM user WHERE IdUser = ${IdUser}) = 2
    //   THEN ${sqlss || '123'} END)
    // ORDER BY message.CreateDay DESC`;
    const message = await connection.query(sql, [IdUser, IdUser, IdUser, IdUser]);
    return { message };
  },

  getAllMessageInMotel: async ({ IdMotel, IdUser }) => {
    const sql = `SELECT * FROM message, user 
      WHERE message.active = 1 
      AND IdMotel = ? 
      AND message.IdUser=user.IdUser
      AND message.IdUser = ?
      `;
    const result = await connection.query(sql, [IdMotel, IdUser]);
    return result;
  },
};
export default messageModel;
