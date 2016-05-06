var express = require('express'),
  app = express();
var path = require('path');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var multer = require("multer");
var compress = require('compression');
var apiRouter = require('./app/routes/api')();

// connect to our database (hosted locally)
mongoose.connect(config.database);
//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,x-access-token');
  res.setHeader('X-Powered-By', 'The tears of children');
  next();
});

app.use(compress({level: 7}));

app.use(multer());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.get("/", function(req, res){
  res.send("Hello World");
});

app.get('/form', function(req, res){
  //res.send("Hello World");
  res.sendFile(path.join(__dirname, '/public/app/views/index.html'));
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
    console.log('OJError: ' + err.stack);
  });
}

var server = app.listen(config.port);

server.timeout = 3600000;
console.log(app.get('env'));
console.log('Running on port' + config.port);
