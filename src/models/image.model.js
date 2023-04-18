const connection = require('./db');
const imageModel = {
  getImageMotel: async (IdMotel) => {
    try {
      const sql = `SELECT IdImage, srcImage FROM image WHERE IdMotel = ${IdMotel}`;
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getAllImage: async () => {
    try {
      const sql = 'SELECT * FROM image';
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getAllImageActive: async () => {
    try {
      const sql = 'SELECT * FROM image WHERE active = 1';
      const result = await connection.query(sql, []);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

module.exports = imageModel;
