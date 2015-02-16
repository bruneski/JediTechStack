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

router.post('/raidlist/#addRaider', function(req, res) {
    console.log("Add Raider Route Trigger");
    var newRaider = req.body;
    console.log('Adding raider: ' + JSON.stringify(newRaider));
    db.collection('raidTeam', function(err, collection) {
        collection.insert(newRaider, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
});

router.put('/raidlist/#updateRaider',  function(req, res) {
    var id = req.params.id;
    var raider = req.body;
    delete raider.name;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(raider));
    db.collection('raidTeam', function(err, collection) {
        collection.update({'name': req.params.name}, raider, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(raider);
            }
        });
    });
});

router.delete('/raidlist/#deleteRaider',  function(req, res) {
    var name = req.params.name;
    console.log('Deleting raider: ' + id);
    db.collection('raidTeam', function(err, collection) {
        collection.remove({'name' : name}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
});

// DOM Ready =============================================================
//$(document).ready(function() {
//
//    // Populate the user table on initial page load
//    populateTable();
//
//});

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

// Fill table with data
var populateTable = function() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/raiders/raidlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.lvl + '</td>';
            tableContent += '<td>' + this.class + '</td>';
            tableContent += '<td>' + this.spec + '</td>';
            tableContent += '<td>Delete</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#raidList table tbody').html(tableContent);
    });
};
