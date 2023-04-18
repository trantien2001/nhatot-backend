const mysql = require('mysql');
const dbConfig = require('../config/db.config');

// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORK,
//   database: dbConfig.DB,
// });

function Database() {
  this.connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORK,
    database: dbConfig.DB,
    multipleStatements: true,
  });

  this.query = (sql, args) => {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  this.close = () => {
    return async () => {
      try {
        this.connection.end((err) => {
          if (err) throw err;
          return;
        });
      } catch (e) {
        return e;
      }
    };
  };
}
var connection = new Database();

// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database name:', dbConfig.DB);
// });

module.exports = connection;
