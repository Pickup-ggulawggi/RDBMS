const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : 'Green301@',
  database : 'newschema'
});

module.exports = db;