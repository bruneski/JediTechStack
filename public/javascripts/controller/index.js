/**
 * Created by mbrune on 2/12/15.
 */

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('testing', server);

db.open(function(err, db) {
    if(!err) {
        //console.log("Connected to 'TestDB' database");
        db.collection('raidTeam', {strict:true}, function(err, collection) {
            if (err) {
                console.log("the 'test' collection does not exist. Creating it with sample data...");
            }
        });
    }
});

console.log(db.collection('raidTeam'));

var restController = {
    findById: function(req, res) {
        var id = req.id;
        console.log('Retrieving raider: ' + id);
        db.collection('raidTeam', function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
                res.send(item);
            });
        });
    },
    findAll: function(req, res) {
        db.collection('raidTeam', function (err, collection) {
            collection.find().toArray(function (err, items) {
                res.send(items);
            });
        });
    }
}

module.exports = restController;