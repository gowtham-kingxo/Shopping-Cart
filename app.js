var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars'); 
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect('mongodb://localhost:27017/shopping');
require('./config/passport');



// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//order important for validator
app.use(validator());
app.use(cookieParser());

//Adding session and enabling them with configuration.

//resave - by default it is true, that it everytime a request is made, the session is saved 
//on the server.

//below line sets up the session.
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));

//session needs to be initialised before flash.
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  //this is a global variable that is visible to all the files.
  res.locals.login = req.isAuthenticated();
  next();
});

app.use('/user', userRoutes);
app.use('/', indexRoutes);

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
