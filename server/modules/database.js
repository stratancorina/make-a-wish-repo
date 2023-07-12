const mysql = require('mysql2');

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "licenta",
  database: "makeawishdb",
});

module.exports = db;
