/**
 * Created by mbrune on 2/15/15.
 */
require.config({
    paths: {
        jquery: './libs/jquery-2.1.3.min',
        Underscore: './libs/underscore-min',
        Backbone: './libs/backbone-min'
        //templates: 'templates'
    },

    shim: {
        'Backbone' : ['Underscore', 'jquery'],
        'RaidAdmin' : ['Backbone']
    }
});

require(['RaidAdmin']), function(RaidAdmin) {
    RaidAdmin.initialize();
}

