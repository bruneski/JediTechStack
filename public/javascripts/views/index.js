/**
 * Created by mbrune on 2/10/15.
 */
define(['/../index.html'], function(indexTemplate) {
    var indexView = Backbone.View.extend ({
        el: $('#raidTeamSection'),

        initialize: function(){
            console.log('View created');
        },

        render: function(){
            this.$el.html(indexTemplate);
        }

    });

    return new indexView;
});



