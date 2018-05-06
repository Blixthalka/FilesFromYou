
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
                // in this function we can define what happens when a user changes the sliders
                $( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );

                var table = document.getElementById("load-table");
                for (var i = 1, row; row = table.rows[i]; i++) {
                    //iterate through rows (we SKIP the first row: counter starts at 1!)
                    for (var j = 0, col; col = row.cells[j]; j++) {
                        //iterate through columns: if first column not in range: HIDE, else SHOW

                        if (j == 1) {             // if first column
                            if ($(col).html() >= ui.values[ 0 ] && $(col).html() <= ui.values[ 1 ]) {
                                // if in interval
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
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    // If so, mark as a switch and break the loop:
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
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}