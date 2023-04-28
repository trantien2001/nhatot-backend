import connection from './db.js';

const addressModel = {
  getWard: async (IdDistrict) => {
    try {
      const sql = `SELECT * FROM ward WHERE IdDistrict = ${IdDistrict}`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get ward in successfully!',
        ward: result,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getDistric: async (IdProvince) => {
    try {
      const sql = `SELECT * FROM district WHERE IdProvince = ${IdProvince}`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get district in successfully!',
        district: result,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getProvince: async () => {
    try {
      const sql = `SELECT * FROM province`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get province in successfully!',
        province: result,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getDistrictByProvinceName: async (ProvinceName) => {
    try {
      const sql = `SELECT * FROM district, province 
  WHERE district.IdProvince = province.IdProvince AND ProvinceName = "${ProvinceName}"`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get district in successfully!',
        district: result,
      };
    } catch (error) {
      return false;
    }
  },

  getWardByDistrictName: async (DistrictName) => {
    try {
      const sql = `SELECT * FROM district, ward 
      WHERE district.IdDistrict = ward.IdDistrict AND DistrictName = "${DistrictName}"`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get ward in successfully!',
        ward: result,
      };
    } catch (error) {
      return false;
    }
  },
};

export default addressModel;
