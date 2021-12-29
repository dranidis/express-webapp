// db connection
const mysql = require('mysql2/promise');

async function getConnection() {
  const conn = await mysql.createConnection({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'my_db',
  });
  return conn;
}

module.exports = getConnection;
