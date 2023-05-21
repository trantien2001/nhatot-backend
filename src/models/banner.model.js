import connection from './db.js';

const bannerModel = {
  getAllBanner: async () => {
    const sql = 'SELECT * FROM banner';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get banner in successfully!',
      banner: result,
    };
  },

  getAllBannerActive: async () => {
    const sql = 'SELECT * FROM banner WHERE active = 1';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get banner active in successfully!',
      banner: result,
    };
  },

  addBanner: async ({}) => {
    //
    //   const sql = `INSERT INTO banner (img, active) VALUES (?,?)`;
    //   const result = await connection.query(sql, []);
  },
};

export default bannerModel;
