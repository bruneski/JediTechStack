/**
 * Created by mbrune on 2/16/15.
 */
define(['text!../templates/register.html'], function(registerTemplate) {
    var registerView = Backbone.View.extend({
        el: $('#content'),
        events: {
            "submit form" : "register"
        },

        register: function() {
            $.post('/register', {
                characterName: $('input[name=charName]').val(),
                className: $('input[name=className]').val(),
                specialization: $('input[name=classSpec]').val(),
                level: $('input[name=level]').val()
            }, function(data) {
                console.log(data);
            });
            return false;
        },

        render: function() {
            this.$el.html(registerTemplate);
        }
    });

    return registerView;
});