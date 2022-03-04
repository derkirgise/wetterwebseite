document.addEventListener("DOMContentLoaded", function(event) {

    new CircleProgress('.progress', {
        max: 100,
        value: 60,
    });

    var options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Temp',
            data: [
                ['1.1.2020', 10],
                ['2.1.2020', 20],
                ['3.1.2020', 22],
                ['4.1.2020', 20],
                ['5.1.2020', 21],
                ['6.1.2020', 18],
                ['7.1.2020', 22],
                ['8.1.2020', 22],
                ['9.1.2020', 15],
            ]
        }],
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        }
    }

    var chart = new ApexCharts(document.querySelector("#statsChart"), options);

    chart.render();
});