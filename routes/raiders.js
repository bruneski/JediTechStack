/**
 * Created by mbrune on 2/12/15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
//exports.findAll = function(req, res) {
//    res.send([{name:'raider1'}, {name:'raider2'}, {name:'raider3'}]);
//};
//
//exports.findById = function(req, res) {
//    res.send({id:req.params.id, name: "The Name", description: "description"});
//};

router.get('/', function(req, res) {
    res.json({message: 'hooray! welcome to our api!'})
})

router.get('/raiders', function(req, res) {
    res.send([{name:'raider1'}, {name:'raider2'}, {name:'raider3'}]);
})

router.get('/raiders/:id', function(req, res) {
    res.send({id:req.params.id, name: req.params.name});
})

module.exports = router;
