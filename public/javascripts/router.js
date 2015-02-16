/**
 * Created by mbrune on 2/15/15.
 */

define(['../index.html'], function(IndexView) {
    var RaidRouter = Backbone.extend.Router({
        currentView: null,

        routes: {
            "index" : "index"
        },
        //Stops listening to web page events on the old view
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },

        index: function() {
            this.changeView(new IndexView());
        }
    });

    return new RaidRouter();
});
