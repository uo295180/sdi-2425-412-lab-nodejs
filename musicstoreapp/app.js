var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const connectionStrings = 'mongodb+srv://admin:sdi@musicstoreapp.lnkqv.mongodb.net/?retryWrites=true&w=majority&appName=musicstoreapp'
const dbClient = new MongoClient(connectionStrings);
let songsRepository = require('./repositories/songsRepository.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

songsRepository.init(app, dbClient);
require("./routes/songs.js")(app, songsRepository);
app.use('/', indexRouter);
app.use('/users', usersRouter);
require('./routes/authors.js')(app);
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

module.exports = app;
