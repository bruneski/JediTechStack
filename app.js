var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Raider = require('./public/javascripts/model/Raider.js')(mongoose);

var raiders = require('./routes/raiders');
//var homePage = require('./public/index.html');
var router = express.Router();

var mongo = require('mongoskin');
//Specify which DB I am going to use
//var db = mongo.db("mongodb://localhost:27017/testing", {native_parser:true});

mongoose.connect("mongodb://localhost:27017/testing");

var app = express();

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/public');

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// view engine setup
//setup.set('html', path.join(__dirname, 'public/markup'));
//app.set('view engine', 'jade');
//app.engine('.html', require('jade').__express);

//EJS
//app.set('views', __dirname + '/public/markup');
//app.engine('index.html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/raiders', raiders);

app.use('/', function(req, res) {
    res.render('index');
});

router.post('/register', function(req, res) {
    console.log(req);
    var charName = req.params('charName', '');
    var className = req.params('className', '');
    var classSpec = req.params('classSpec', '');
    var level = req.params('level', '');

    console.log(Raider);
    Raider.register(charName, className, classSpec, level);
    res.send(200);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

//Implementing REST API for Mongodb

//app.use('/raiders/:id', raiders.findById)();
//app.post('/raiders', raiders.addWine);
//app.put('/raiders/:id', raiders.updateWine);
//app.delete('/raiders/:id', raiders.deleteWine);


app.listen(3000);