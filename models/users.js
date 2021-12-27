const getConnection = require('./connect');

class UserRepository {
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

    async getUserByEmail(email) {
        const conn = await getConnection();
        let [rows, fields] = await conn.execute('SELECT * FROM Users WHERE email = ?', [email]);
        console.log('The users with email: ' + email + ' are: ', rows)
        if (rows.length == 1) {
            return rows[0]
        }
        return null
    }
}

var userRepository = new UserRepository()

module.exports = userRepository
