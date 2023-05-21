import connection from './db.js';
import uniqid from 'uniqid';

const userModel = {
  addFavourite: async (data) => {
    const { IdUser, IdMotel } = data;
    const IdFavourite = uniqid('IdFavourite_');
    const sqlAddFavourite = 'INSERT INTO favourite(IdFavourite, IdUser, IdMotel, CreateDay) VALUE(?, ?, ?, NOW())';
    const favourite = await connection.query(sqlAddFavourite, [IdFavourite, IdUser, IdMotel]);
    return { favourite, msg: 'Yêu thích thành công' };
  },

  deleteFavourite: async (data) => {
    const { IdUser, IdMotel } = data;

    const sqlDeleteFavourite = 'DELETE FROM favourite WHERE IdUser = ? AND IdMotel = ?';
    const favourite = await connection.query(sqlDeleteFavourite, [IdUser, IdMotel]);
    return { favourite, msg: 'Hủy yêu thích thành công' };
  },

  deleteNotifi: async (data) => {
    const { IdNotifi, IdUser } = data;
    console.log(data);
    const sqlDelete = `DELETE FROM notifi WHERE IdNotifi = ?`;
    await connection.query(sqlDelete, [IdNotifi]);
    const sqlSelectNotifi = `SELECT 
      timestampdiff(month, CreateDay, now()) as month,
      timestampdiff(week, CreateDay, now()) as week,
      timestampdiff(day, CreateDay, now()) as day,
      timestampdiff(hour, CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Content, IdReceiver, IdNotifi, Avatar
      FROM notifi, user WHERE IdReceiver = ? AND user.IdUser = notifi.IdSender
      ORDER BY CreateDay DESC
      `;
    const notifi = await connection.query(sqlSelectNotifi, [IdUser]);
    return { notifi, msg: 'get notifi in successfully!' };
  },
  getAllNotifiByIdUser: async (data) => {
    const { IdUser } = data;
    const sql = `SELECT 
      timestampdiff(month, CreateDay, now()) as month,
      timestampdiff(week, CreateDay, now()) as week,
      timestampdiff(day, CreateDay, now()) as day,
      timestampdiff(hour, CreateDay, now()) as hour,
      timestampdiff(minute, CreateDay, now()) as minute,
      timestampdiff(second, CreateDay, now()) as second,
      Content, IdReceiver, IdNotifi, Avatar
      FROM notifi, user WHERE IdReceiver = ? AND user.IdUser = notifi.IdSender
      ORDER BY CreateDay DESC
      `;
    const notifi = await connection.query(sql, [IdUser]);
    return { notifi, msg: 'get notifi in successfully!' };
  },
  getUser: async (data) => {
    const { IdUser, IdFollowers } = data;

    const sql1 = `SELECT 
      timestampdiff(month, operatingTime, now()) as monthOperatingTime,
      timestampdiff(week, operatingTime, now()) as weekOperatingTime,
      timestampdiff(day, operatingTime, now()) as dayOperatingTime,
      timestampdiff(hour, operatingTime, now()) as hourOperatingTime,
      timestampdiff(minute, operatingTime, now()) as minuteOperatingTime,
      timestampdiff(second, operatingTime, now()) as secondOperatingTime,
      user.*
      FROM user WHERE user.IdUser = ?
    `;
    const sql2 = `SELECT 
      timestampdiff(month, CreateDay, now()) as monthCreateDay,
      timestampdiff(week, CreateDay, now()) as weekCreateDay,
      timestampdiff(day, CreateDay, now()) as dayCreateDay,
      timestampdiff(hour, CreateDay, now()) as hourCreateDay,
      timestampdiff(minute, CreateDay, now()) as minuteCreateDay,
      timestampdiff(second, CreateDay, now()) as secondCreateDay,
      motel.*, media.*
      FROM motel, media WHERE IdUser = ? AND motel.IdMotel = media.IdMotel
      GROUP BY motel.IdMotel ORDER BY CreateDay DESC
    `;

    const checkFolow = `SELECT * FROM follow WHERE IdFollowers = ? AND IdFollowing = ?`;
    const resultCheck = await connection.query(checkFolow, [IdFollowers, IdUser]);
    const follow = resultCheck[0] ? 'Đang theo dõi' : 'Theo dõi';

    const sqlFollowers = `SELECT COUNT(*) AS followers FROM follow WHERE IdFollowing = ?`;
    const followers = await connection.query(sqlFollowers, [IdUser]);
    const sqlFollowing = `SELECT COUNT(*) AS following FROM follow WHERE IdFollowers = ?`;
    const following = await connection.query(sqlFollowing, [IdUser]);

    const result1 = await connection.query(sql1, [IdUser]);
    const result2 = await connection.query(sql2, [IdUser]);
    return {
      msg: 'Get user in successfully!',
      motel: result2,
      user: result1,
      follow,
      followers: followers[0].followers,
      following: following[0].following,
    };
  },
  getInfoUser: async ({ IdRoom, IdUser }) => {
    const sql = `SELECT
        timestampdiff(month, operatingTime, now()) as monthOperatingTime,
        timestampdiff(week, operatingTime, now()) as weekOperatingTime,
        timestampdiff(day, operatingTime, now()) as dayOperatingTime,
        timestampdiff(hour, operatingTime, now()) as hourOperatingTime,
        timestampdiff(minute, operatingTime, now()) as minuteOperatingTime,
        timestampdiff(second, operatingTime, now()) as secondOperatingTime,
        user.* FROM user WHERE IdUser IN (
          (CASE
            WHEN (SELECT IdAuthority FROM user WHERE IdUser = ?) = 3 THEN (SELECT IdHost FROM room WHERE IdRoom = ?)
            WHEN (SELECT IdAuthority FROM user WHERE IdUser = ?) = 2 THEN (SELECT IdRenter FROM room WHERE IdRoom = ?)
          END)
        )
        `;
    const result = await connection.query(sql, [IdUser, IdRoom, IdUser, IdRoom]);
    return {
      msg: 'Get user in successfully!',
      user: result,
    };
  },

  getAllUser: async () => {
    const sql = 'SELECT IdUser, Address, BirthDay, Email, Gender, Name, PhoneNumber FROM user';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get user in successfully!',
      user: result,
    };
  },

  getAdmin: async () => {
    const sql = 'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 1';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get admin in successfully!',
      admin: result,
    };
  },

  getHost: async () => {
    const sql = `SELECT * FROM user, authority
      WHERE user.IdAuthority = authority.IdAuthority
      AND user.IdAuthority = 2`;
    const result = await connection.query(sql, []);
    return {
      msg: 'Get host in successfully!',
      host: result,
    };
  },

  getHostById: async (IdUser) => {
    const sql = `SELECT * FROM user, authority
      WHERE user.IdAuthority = authority.IdAuthority
      AND user.IdAuthority = 2
      AND IdUser = ?
      `;
    const result = await connection.query(sql, [IdUser]);
    return {
      msg: 'Get host in successfully!',
      host: result,
    };
  },

  getRenter: async () => {
    const sql = 'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 3';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get renter in successfully!',
      renter: result,
    };
  },

  getRenterById: async (IdUser) => {
    const sql = `SELECT * FROM user, authority 
      WHERE user.IdAuthority = authority.IdAuthority 
      AND user.IdAuthority = 3 
      AND IdUser = ${IdUser}`;
    const result = await connection.query(sql, []);
    return {
      msg: 'Get renter in successfully!',
      renter: result,
    };
  },

  follow: async (data) => {
    const { IdFollowers, IdFollowing } = data;
    // console.log('model: ', data);

    const checkFolow = `SELECT * FROM follow WHERE IdFollowers = ? AND IdFollowing = ?`;
    const resultCheck = await connection.query(checkFolow, [IdFollowers, IdFollowing]);
    const sql = `SELECT Name from user WHERE IdUser = ?`;
    const userFollow = await connection.query(sql, [IdFollowers]);

    if (resultCheck[0]) {
      // console.log('Đã follow');
      const sqlUnfollow = `DELETE FROM follow WHERE IdFollowers = ? AND IdFollowing = ?`;
      await connection.query(sqlUnfollow, [IdFollowers, IdFollowing]);
      const sqlDeleteNotifi = 'DELETE FROM notifi WHERE IdReceiver = ? AND Content = ?';
      await connection.query(sqlDeleteNotifi, [IdFollowing, `${userFollow[0].Name} đã theo dõi bạn`]);
      return { msg: 'Hủy theo dõi thành công', nameFollow: `${userFollow[0].Name} đã theo dõi bạn` };
    } else {
      // console.log('chưa follow');
      
      const sqlFollow = `INSERT INTO follow (IdFollowers, IdFollowing, FollowDay) VALUES(?, ?, NOW())`;
      await connection.query(sqlFollow, [IdFollowers, IdFollowing]);
      const IdNotifi = uniqid('IdNotifi_')
      const sqlAddNotifi = 'INSERT INTO notifi(IdNotifi, IdSender, IdReceiver, Content, CreateDay) VALUES(?, ?, ?, ?, NOW())';
      await connection.query(sqlAddNotifi, [IdNotifi, IdFollowers, IdFollowing, `${userFollow[0].Name} đã theo dõi bạn`]);
      return { msg: 'Theo dõi thành công', nameFollow: `${userFollow[0].Name} đã theo dõi bạn` };
    }
  },

  // getAllUserActive: () => {
  //   sql.query('SELECT * FROM user WHERE active = 1', (err, result) => {
  //     if (err) {
  //       return res.status(400).send({ msg: err });
  //     }
  //     return res.status(200).send({
  //       msg: 'Get user in successfully!',
  //       user: result,
  //     });
  //   });
  // },
};

export default userModel;
