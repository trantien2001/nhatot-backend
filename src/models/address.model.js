import connection from './db.js';

const addressModel = {
  getWard: async (IdDistrict) => {
    const sql = `SELECT * FROM ward WHERE IdDistrict = ?`;
    const result = await connection.query(sql, [IdDistrict]);
    return {
      msg: 'Get ward in successfully!',
      ward: result,
    };
  },

  getDistric: async (IdProvince) => {
    const sql = `SELECT * FROM district WHERE IdProvince = ?`;
    const result = await connection.query(sql, [IdProvince]);
    return {
      msg: 'Get district in successfully!',
      district: result,
    };
  },

  getProvince: async () => {
    const sql = `SELECT * FROM province`;
    const result = await connection.query(sql, []);
    return {
      msg: 'Get province in successfully!',
      province: result,
    };
  },

  getDistrictByProvinceName: async (ProvinceName) => {
    const sql = `SELECT * FROM district, province 
  WHERE district.IdProvince = province.IdProvince AND ProvinceName = ?`;
    const result = await connection.query(sql, [ProvinceName]);
    return {
      msg: 'Get district in successfully!',
      district: result,
    };
  },

  getWardByDistrictName: async (DistrictName) => {
    const sql = `SELECT * FROM district, ward 
      WHERE district.IdDistrict = ward.IdDistrict AND DistrictName = ?`;
    const result = await connection.query(sql, [DistrictName]);
    return {
      msg: 'Get ward in successfully!',
      ward: result,
    };
  },
};

export default addressModel;
