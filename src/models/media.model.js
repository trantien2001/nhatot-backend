import connection from './db.js';

const mediaModel = {
  getMediaMotel: async (IdMotel) => {
    const sql = `SELECT * FROM media WHERE IdMotel = ? ORDER BY Type DESC`;
    const result = await connection.query(sql, [IdMotel]);
    return result;
  },
  getAllMedia: async () => {
    const sql = 'SELECT * FROM media';
    const result = await connection.query(sql, []);
    return result;
  },

  getAllMediaActive: async () => {
    const sql = 'SELECT * FROM media WHERE active = 1';
    const result = await connection.query(sql, []);
    return result;
  },
};

export default mediaModel;
