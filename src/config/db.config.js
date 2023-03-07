require('dotenv/config');

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORK: process.env.DB_PASSWORK,
    DB: process.env.DB_NAME
}