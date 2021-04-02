const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// 登录建权方案1-cookie-session
const cookieSession = require('cookie-session')

const usersRouter = require('./routes/users');

const app = express();

// cors解决跨域
// app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 登录建权方案1-cookie-session
// use cookie-session
app.set('trust proxy', 1)
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

//use log4j
app.use(logger('dev'));

// use body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
