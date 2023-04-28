import connection from './db.js';

const bannerModel = {
  getAllBanner: async () => {
    try {
      const sql = 'SELECT * FROM banner';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get banner in successfully!',
        banner: result,
      };
    } catch (error) {
      return error;
    }
  },

  getAllBannerActive: async () => {
    try {
      const sql = 'SELECT * FROM banner WHERE active = 1';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get banner active in successfully!',
        banner: result,
      };
    } catch (error) {
      return error;
    }
  },

  addBanner: async ({}) => {
    try {
      const sql = `INSERT INTO banner (img, active) VALUES (?,?)`;
      const result = await connection.query(sql, []);
    } catch (error) {
      return error;
    }
  },
};

export default bannerModel;
