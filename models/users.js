const getConnection = require('./connect');

class User {
    async getUsers() {
        const conn = await getConnection();
        let [rows, fields] = await conn.execute('SELECT * FROM Users');

        console.log('The users are: ', rows)

        return rows
    }

    async createUser(user) {
        console.log('Creating user: ', user)
        const conn = await getConnection();
        try {
            await conn.query(
                'INSERT INTO Users (email, pass) VALUES (?, ?)',
                [user.email, user.password]);
        } catch (error) {
            console.error("DB error: " + error)
            return error
        }
        return null
    }
}

var userInstance = new User()

module.exports = userInstance
