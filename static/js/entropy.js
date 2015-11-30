var MAX_POINTS = 600;
var UPDATE_INTERVAL = 100;

var entropy_data = [];
var plot = null;

var updatePlot = function() {
    $.ajax({
        url: "api/entropy",
        success: function(data) {
            entropy = data.entropy;

            data_date = new Date(data.timestamp)

            while (entropy_data.length > MAX_POINTS) {
                entropy_data.shift();
            }

            entropy_data.push([data_date, entropy]);
            plot.setData([entropy_data])
            plot.setupGrid();
            plot.draw();
        }
    });

    setTimeout(updatePlot, UPDATE_INTERVAL);
};

$(document).ready(function () {
    plot = $.plot("#plot-container", [entropy_data], {
        series: {
            shadowSize: 0,
            lines: {
                show: true
            }
        },
        xaxis: {
            mode: "time"
        },
        yaxis: {
            min: 0
        }
    });
    
    setTimeout(updatePlot, UPDATE_INTERVAL);
});

