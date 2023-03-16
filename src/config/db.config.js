require('dotenv/config');

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORK: process.env.DB_PASSWORK,
    DB: process.env.DB_NAME
}

// const mysql = require('mysql2/promise');
// const { RowDataPacket, createPool } = require('mysql2');
// const config = require('./connectDb');
// const pool = require('./connectDb');

// async function queryDb(sql, params) {
//   const connection = await mysql.createConnection(config.db);
//   const [results] = (await connection.execute) < RowDataPacket > (sql, params);

//   return results;
// }

// module.exports = queryDb;
