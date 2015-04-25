/**
 * Created by mbrune on 2/15/15.
 */
define(['../index.html'], function(indexView) {
    var initialize = function() {
        indexView.render();
        runApplication();
    }

    var runApplication = function() {
        Backbone.history.start();
    }
    return {
        initialize: initialize
    };
});