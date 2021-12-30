// db connection
const mysql = require('mysql2/promise');

async function getConnection() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: 'my_db',
    });
    return conn;
  } catch(error) {
    console.error(error);
    throw new Error('Could not connect to database');
  }

}

module.exports = getConnection;
