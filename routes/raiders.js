/**
 * Created by mbrune on 2/12/15.
 */

var express = require('express');
var router = express.Router();
var controller = require("../public/javascripts/controller/index");

/* GET home page. */
//exports.findAll = function(req, res) {
//    res.send([{name:'raider1'}, {name:'raider2'}, {name:'raider3'}]);
//};
//
//exports.findById = function(req, res) {
//    res.send({id:req.params.id, name: "The Name", description: "description"});
//};



var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('testing', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'TestDB' database");
        db.collection('raidTeam', {strict:true}, function(err, collection) {
            if (err) {
                console.log("the 'test' collection does not exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

/*
 * GET userlist.
 */
router.get('/raidlist', function(req, res) {
    var db = req.db;
    db.collection('raidTeam').find().toArray(function (err, items) {
        res.json(items);
    });
});


router.get('/raidlist/:name', function(req, res) {
    var db = req.db;
    console.log(req);
    db.collection('raidTeam', function(err, collection) {
        collection.findOne({'name':  req.params.name }, function(err, item) {
            res.send(item);
        });
    });
});

//router.get('/', function(req, res) {
//    res.json({message: 'hooray! welcome to our api!'})
//})
//
//router.get('/raiders', function(req, res) {
//    res.send([{name:'raider1'}, {name:'raider2'}, {name:'raider3'}]);
//})
//
//router.get('/raiders/:id', function(req, res) {
//    res.send({id:req.params.id, name: req.params.name});
//})

//router.use('/', routes);
//router.use("/raiders/:id", controller.findAll());
//router.use('/raiders', controller.findAll());

module.exports = router;

var populateDB = function() {

    var raidTeam = [
        {
            id: 1,
            name: "Icecarnage",
            class: "Shaman",
            lvl: 100,
            spec: "Restoration"
        },
        {
            id: 2,
            name: "John",
            class: "Paladin",
            lvl: 90,
            spec: "Retribution"
        },
        {
            id: 3,
            name: "Partycarnage",
            class: "Rager",
            lvl: 15,
            spec: "BroStatus"
        }];

    db.collection('raidTeam', function(err, collection) {
        collection.insert(raidTeam, {safe:true}, function(err, result) {});
    });

};
