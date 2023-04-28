import connection from './db.js';

const mediaModel = {
  getMediaMotel: async (IdMotel) => {
    try {
      const sql = `SELECT * FROM media WHERE IdMotel = ${IdMotel} ORDER BY Type DESC`;
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getAllMedia: async () => {
    try {
      const sql = 'SELECT * FROM media';
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getAllMediaActive: async () => {
    try {
      const sql = 'SELECT * FROM media WHERE active = 1';
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default mediaModel;
