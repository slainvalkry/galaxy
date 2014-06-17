// dependencies
define(['plugin/charts/jqplot/common/wrapper'], function(Plot) {

// widget
return Backbone.View.extend(
{
    // initialize
    initialize: function(app, options) {
        this.app        = app;
        this.options    = options;
    },
            
    // render
    draw : function(process_id, chart, request_dictionary) {
        var plot = new Plot(this.app, this.options);
        plot.draw({
            process_id          : process_id,
            chart               : chart,
            request_dictionary  : request_dictionary,
            makeConfig          : function(groups, plot_config){
                $.extend(true, plot_config, {
                    seriesDefaults: {
                        renderer    : $.jqplot.BarRenderer
                    }
                });
            }
        });
    }
});

});