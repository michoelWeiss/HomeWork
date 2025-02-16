var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/login', require('./login.js')); 
app.route('/register')
  .get((req, res, next) => {
    res.render('layout', {
      partials: {
        content: 'register'
      }
    });
  })
  .post(require('./register.js'));

app.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

const sessionOnly = (req, res, next) => {
  if (req.session.username) {
    return next();
  }
  res.redirect('/');
};

app.use('/admin', sessionOnly, (req, res, next) => {
  res.render('layout', {
    partials: {
      content: 'admin'
    }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('layout', { partials: { content: 'error' } });
});

module.exports = app;
