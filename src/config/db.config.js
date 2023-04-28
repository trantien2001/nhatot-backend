import dotenv from 'dotenv';
dotenv.config();

const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORK: process.env.DB_PASSWORK,
  DB: process.env.DB_NAME,
};

export default config;
