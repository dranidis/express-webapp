// db connection
var mysql = require('mysql2/promise')

async function getConnection() {
    var conn = await mysql.createConnection({
        host: 'localhost',
        user: 'dbuser',
        password: 'dbpassword#1234',
        database: 'my_db'
    })
    return conn;
}

module.exports = getConnection
