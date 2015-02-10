/**
 * Created by mbrune on 2/10/15.
 */

TestModel = Backbone.Model.extend ({

    initialize: function() {
        console.log("Initializing Model");

        this.on("invalid", function (model, error) {
            console.log("**Validation Error : " + error + "**");
        });
        this.on("change", function () {
            console.log('Model Changes Detected:');
            if (this.hasChanged('name')) {
                console.log('The name has changed from ' + this.previous('name') + ' to ' + this.get('name'));

            }
            if (this.hasChanged('role')) {
                console.log('The role has changed')
            }
            console.log('Changed attributes: ' + JSON.stringify(this.changed));
            console.log('Previous attributes: ' + JSON.stringify(this.previousAttributes()));
        });
        this.on("change:name", function () {
            console.log('The name attribute has changed');
        });
    },

    defaults: {
        name: 'SeymourButts',
        role: 'dps',
        lvl: 100
    },

    printDetails: function(){
        console.log(this.get('name') + ' is a ' + this.get('lvl') + this.get('role'));
    },

    validate: function(attrs){
        if(attrs.lvl < 100){
            return 'You have to be lvl 100 to raid';
        }
        if(!attrs.name){
            return 'You need to have a character name';
        }
    },
    parse: function(response, xhr) {
        response.bookType = 'ebook';
        return response;
    },

});
