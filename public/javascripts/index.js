/**
 * Created by mbrune on 2/10/15.
 */
define(['text!../index.html'], function(indexTemplate) {
    var indexView = Backbone.View.extend ({
        el: $('#raidTeamSection'),

        initialize: function(){
            console.log('View created');
        },

        render: function(){
            this.$el.html(indexTemplate);
        },

        alertBook: function(e){
            alert('Book clicked');
        }

    });

    return new indexView;
});



