require('dotenv').config();

const config = {
  db: {
    host: 'sql7.freemysqlhosting.net',
    user: process.env.user,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
  },
};

module.exports = config;
