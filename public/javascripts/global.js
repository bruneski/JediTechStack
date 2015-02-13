/**
 * Created by mbrune on 2/12/15.
 */

window.global= {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function (views, callback) {

        var deferreds = [];

        $.each(views, function (index, view) {
            if (window[view]) {
                deferreds.push($.get('markup/' + view + '.html', function (data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
}