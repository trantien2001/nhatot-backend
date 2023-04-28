import mysql from 'mysql';
import config from '../config/db.config.js';

function Database() {
  this.connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORK,
    database: config.DB,
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
export default connection;
// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database name:', dbConfig.DB);
// });
