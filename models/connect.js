// db connection
var mysql = require('mysql2/promise')

async function getConnection() {
    var conn = await mysql.createConnection({
        host: process.env.DB_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: 'my_db'
    })
    return conn;
}

module.exports = getConnection
