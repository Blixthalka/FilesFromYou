
var load_colors = {};

load_colors[100] = "#FF0000";
load_colors[90] = "#FF3300";
load_colors[80] = "#ff6600";
load_colors[70] = "#ff9900";
load_colors[60] = "#FFCC00";
load_colors[50] = "#FFFF00";
load_colors[40] = "#ccff00";
load_colors[30] = "#99ff00";
load_colors[20] = "#66ff00";
load_colors[10] = "#33ff00";
load_colors[0] = "#00FF00";

$(document).ready(function() {
    $('#load-table').find('td').filter(":nth-child(2)").each(function () {
        $(this).css('background', makeColor(parseFloat($(this).text())));
    });

    function makeColor(value) {
        value = Math.min(Math.max(0, value), 100);
        value = Math.round(value / 10) * 10;
        return load_colors[value];
    }

    $(function() {
        $( "#slider-range, #slider-range2" ).slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 0.0, 100 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );

                var table = document.getElementById("load-table");
                for (var i = 1, row; row = table.rows[i]; i++) {
                    for (var j = 0, col; col = row.cells[j]; j++) {

                        if (j == 1) {
                            if ($(col).html() >= ui.values[ 0 ] && $(col).html() <= ui.values[ 1 ]) {
                                $(row).show();
                            } else {
                                $(row).hide();
                            }
                        }
                    }
                }
            }
        });

        $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) +
            " - " + $( "#slider-range" ).slider( "values", 1 ) );
    });

    sortTable(1);

});

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("load-table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {

            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}