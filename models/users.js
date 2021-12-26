const getConnection = require('./connect');


async function getUsers() {
    const conn = await getConnection();
    let [rows, fields] = await conn.execute('SELECT * FROM Users');
    
    console.log('The users are: ', rows)

    return rows
}

module.exports = getUsers
