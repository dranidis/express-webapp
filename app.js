const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const initializePassport = require('./passport-config');
const userRepository = require('./models/users');

initializePassport(passport, userRepository.getUserByEmail);


const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/auth', authRouter);
app.use('/', checkAuthenticated, indexRouter);
app.use('/users', checkAuthenticated, usersRouter);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));

});

// // error handler
app.use(function (err, req, res, next) { // next argumnet needed HERE!
  console.log('ERROR HANDLER');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
