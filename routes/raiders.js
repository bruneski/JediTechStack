/**
 * Created by mbrune on 2/10/2015.
 */

var express = require('express');
var router = express.Router();

exports.findAll = function(req, res) {
    res.send([{name:'raider1'}, {name:'raider2'}, {name:'raider3'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

module.exports = router;
