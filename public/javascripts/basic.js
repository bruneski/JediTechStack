/**
 * Created by mbrune on 1/26/15.
 */

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "testview"
    },

    initialize: function () {
        this.mainView = new TestView();
        $('#raidTeamSection').html(this.mainView.el);
    }
});

global.loadTemplate(['TestView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
