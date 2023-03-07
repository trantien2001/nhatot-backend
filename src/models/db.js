const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORK,
    database: dbConfig.DB
});

connection.connect(error =>{
    if(error) throw error;
    console.log("Successfully connected to the database name:", dbConfig.DB);
})

module.exports = connection;