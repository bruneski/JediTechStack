/**
 * Created by mbrune on 1/26/15.
 */

var express = require('express')
var app = express.Router();

// middleware specific to this router
app.use(function timeLog(req, res, next) {
    console.log('Time in Basic: ', Date.now());
    next();
})

app.get('/', function (req, res) {
    res.send('Hello World!')
})

//var server = app.listen(3000, function () {
//
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log('Example app listening at http://%s:%s', host, port)
//
//})

module.exports = app;
