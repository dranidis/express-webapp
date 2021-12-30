const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    let user;
    try {
      user = await getUserByEmail(email);
    }
    catch(error) {
      console.error('initialize: ' + error);
      return done(null, false, { message: error.message });
    }
    if (user == null) {
      console.log('Login email does not exist: ');
      return done(null, false, { message: 'No user with that email' });
    }
    console.log('authenticateUser: ', user);
    const match = await bcrypt.compare(password, user.pass);

    if (match) {
      console.log('Login successful, user: ', user);
      return done(null, user);
    } else {
      console.log('Login failed');
      return done(null, false, { message: 'Password incorrect' });
    }

  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.email));
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserByEmail(id));
  });
}

module.exports = initialize;
