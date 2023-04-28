import connection from './db.js';

const userModel = {
  getUser: async (data) => {
    const { IdUser, IdFollowers } = data;
    console.log({ IdUser, IdFollowers });
    try {
      const sql1 = `SELECT 
      timestampdiff(month, operatingTime, now()) as monthOperatingTime,
      timestampdiff(week, operatingTime, now()) as weekOperatingTime,
      timestampdiff(day, operatingTime, now()) as dayOperatingTime,
      timestampdiff(hour, operatingTime, now()) as hourOperatingTime,
      timestampdiff(minute, operatingTime, now()) as minuteOperatingTime,
      timestampdiff(second, operatingTime, now()) as secondOperatingTime,
      user.*
      FROM user WHERE user.IdUser = ${IdUser}
    `;
      const sql2 = `SELECT 
      timestampdiff(month, CreateDay, now()) as monthCreateDay,
      timestampdiff(week, CreateDay, now()) as weekCreateDay,
      timestampdiff(day, CreateDay, now()) as dayCreateDay,
      timestampdiff(hour, CreateDay, now()) as hourCreateDay,
      timestampdiff(minute, CreateDay, now()) as minuteCreateDay,
      timestampdiff(second, CreateDay, now()) as secondCreateDay,
      motel.*
      FROM motel WHERE IdUser = ${IdUser} ORDER BY CreateDay DESC
    `;

      const checkFolow = `SELECT * FROM follow WHERE IdFollowers = ? AND IdFollowing = ?`;
      const resultCheck = await connection.query(checkFolow, [IdFollowers, IdUser]);
      const follow = resultCheck[0] ? 'Đang theo dõi' : 'Theo dõi';

      const sqlFollowers = `SELECT COUNT(*) AS followers FROM follow WHERE IdFollowing = ?`;
      const followers = await connection.query(sqlFollowers, [IdUser]);
      const sqlFollowing = `SELECT COUNT(*) AS following FROM follow WHERE IdFollowers = ?`;
      const following = await connection.query(sqlFollowing, [IdUser]);

      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return {
        msg: 'Get user in successfully!',
        motel: result2,
        user: result1,
        follow,
        followers: followers[0].followers,
        following: following[0].following,
      };
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  },
  getInfoUser: async ({ IdMotel, IdUser }) => {
    try {
      const sql = `SELECT 
        timestampdiff(month, operatingTime, now()) as monthOperatingTime,
        timestampdiff(week, operatingTime, now()) as weekOperatingTime,
        timestampdiff(day, operatingTime, now()) as dayOperatingTime,
        timestampdiff(hour, operatingTime, now()) as hourOperatingTime,
        timestampdiff(minute, operatingTime, now()) as minuteOperatingTime,
        timestampdiff(second, operatingTime, now()) as secondOperatingTime,
        user.* FROM user WHERE IdUser IN
        (SELECT IdUser FROM message WHERE IdMotel = ${IdMotel} 
        AND IdUser != ${IdUser} OR IdUser IN
        (SELECT IdUser FROM motel WHERE IdMotel = ${IdMotel}) 
        AND IdUser != ${IdUser} GROUP BY IdUser)
      `;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get user in successfully!',
        user: result,
      };
    } catch (error) {
      return error;
    }
  },

  getAllUser: async () => {
    try {
      const sql = 'SELECT IdUser, Address, BirthDay, Email, Gender, Name, PhoneNumber FROM user';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get user in successfully!',
        user: result,
      };
    } catch (error) {
      return error;
    }
  },

  getAdmin: async () => {
    try {
      const sql =
        'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 1';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get admin in successfully!',
        admin: result,
      };
    } catch (error) {
      return error;
    }
  },

  getHost: async () => {
    try {
      const sql = `SELECT * FROM user, authority
      WHERE user.IdAuthority = authority.IdAuthority
      AND user.IdAuthority = 2`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get host in successfully!',
        host: result,
      };
    } catch (error) {
      return error;
    }
  },

  getHostById: async (IdUser) => {
    try {
      const sql = `SELECT * FROM user, authority
      WHERE user.IdAuthority = authority.IdAuthority
      AND user.IdAuthority = 2
      AND IdUser = ${IdUser}
      `;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get host in successfully!',
        host: result,
      };
    } catch (error) {
      return error;
    }
  },

  getRenter: async () => {
    try {
      const sql =
        'SELECT * FROM user, authority WHERE user.IdAuthority = authority.IdAuthority AND user.IdAuthority = 3';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get renter in successfully!',
        renter: result,
      };
    } catch (error) {
      return error;
    }
  },

  getRenterById: async (IdUser) => {
    try {
      const sql = `SELECT * FROM user, authority 
      WHERE user.IdAuthority = authority.IdAuthority 
      AND user.IdAuthority = 3 
      AND IdUser = ${IdUser}`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get renter in successfully!',
        renter: result,
      };
    } catch (error) {
      return error;
    }
  },

  follow: async (data) => {
    const { IdFollowers, IdFollowing } = data;
    console.log('model: ', data);
    try {
      const checkFolow = `SELECT * FROM follow WHERE IdFollowers = ? AND IdFollowing = ?`;
      const resultCheck = await connection.query(checkFolow, [IdFollowers, IdFollowing]);
      if (resultCheck[0]) {
        console.log('Đã follow');
        const sqlUnfollow = `DELETE FROM follow WHERE IdFollowers = ? AND IdFollowing = ?`;
        await connection.query(sqlUnfollow, [IdFollowers, IdFollowing]);
        return { msg: 'Hủy theo dõi thành công' };
      } else {
        console.log('chưa follow');
        const sqlFollow = `INSERT INTO follow (IdFollowers, IdFollowing, FollowDay) VALUES(?, ?, NOW())`;
        await connection.query(sqlFollow, [IdFollowers, IdFollowing]);
        return { msg: 'Theo dõi thành công' };
      }
    } catch (error) {
      return error;
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
