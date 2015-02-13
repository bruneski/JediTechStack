/**
 * Created by mbrune on 2/10/15.
 */

TestView = Backbone.View.extend ({

    initialize: function(){
        console.log('View created');
    },

    render: function(){
        var self = this;

        for(var i =0; i < this.collection.size(); i++){
            self.$el.append('<li id="raider">Raiders Name: ' + self.collection.at(i).get('name') + '</li>');
        }

        return self;
    },
    alertBook: function(e){
        alert('Book clicked');
    }

});

var myRaidingTeamView= new TestView({
    collection: myRaidTeam,
    el: '#raidTeamSection'
});

myRaidingTeamView.render();


