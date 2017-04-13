var express = require('express');//express框架
var path = require('path');//path 模块 node集成
var favicon = require('serve-favicon');//获取网站favicon
var logger = require('morgan');//node.js的HTTP请求记录器中间件
var cookieParser = require('cookie-parser');//解析cookies
var bodyParser = require('body-parser');
var flash = require('connect-flash'); /* session中存储信息的位置*/
var crytpo = require('crypto');
var session = require('express-session');
var connect = require('connect');
var MongoStore = require('connect-mongo')(session);

var settings = require('./settings');
var routers = require('./routes/index');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// app.use(session({
//   secret: settings.cookieSecret,
//   store: new MongoStore({
//     db: settings.db
//   })
// }));


routers(app);

app.use('/', routers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
