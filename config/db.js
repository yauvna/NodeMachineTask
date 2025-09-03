const mysql = require('mysql2/promise');
require("dotenv").config({quiet: true});

const db = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME
});

module.exports = db;
