const connection = require('./db');
const sql = require('./db');

const userModel = {
  getUser: async (IdUser) => {
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

      const result1 = await connection.query(sql1, []);
      const result2 = await connection.query(sql2, []);
      return { msg: 'Get user in successfully!', motel: result2, user: result1 };
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

module.exports = userModel;
