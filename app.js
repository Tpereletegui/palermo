const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const programsRouter = require('./src/routes/programsRouter');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);
app.use('/programs', programsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('not found');
  error.status(400);
  next(error);
});

// error handler
app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;
