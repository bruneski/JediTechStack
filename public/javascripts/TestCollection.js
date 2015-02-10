/**
 * Created by mbrune on 2/10/15.
 */

TestCollection = Backbone.Collection.extend({
    model: TestModel,
    url: 'http://localhost:3000/raiders/',

    initialize: function(){
        console.log('Creating a new raiding collection');
        this.on("remove", function(removedModel, models, options){
            console.log('element removed  at ' + options.index);
        });
        this.on('reset', function(){
            console.log('Reset detected');
        });
    },
    comparator:  function(a, b) {
        return a.get('name') < b.get('name') ? -1 : 1;
    },
    parse: function(response, xhr) {
        //customisations here
        return response;
    }
});


var raider1 = new TestModel ({name: "LeeroyJenkins", role: "dps", lvl: "100"});
var raider2 = new TestModel ({name: "JediMaster", role: "tank", lvl: "100"});
var failraider = new TestModel ({name: "Failboat", role: "dps", lvl: "15"});

var myRaidTeam = new TestCollection ([raider1, raider2, failraider]);