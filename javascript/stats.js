let historyData;
let chart;
let chartData = [];

async function getData() {
    // TODO: Dummy-Daten entfernen
    saveCoords(48.8757833219494, 10.720759934641583);

    let coords = getCoords();
    getHistoryData(coords.lat, coords.lon)
        .then((data) => {
            historyData = data;
            setData();
        })
        .catch((error) => {
            console.error("Error occured: ", error);
        });
}

function setData() {
    let locationLabel = document.getElementById("locationName");
    locationLabel.innerHTML = historyData.location.name + ",";

    let hour = historyData.forecast.forecastday[0].hour;
    let tempData = hour.map(x => [x.time, x.temp_c]);
    let pressureData = hour.map(x => [x.time, x.pressure_mb]);
    let humidityData = hour.map(x => [x.time, x.humidity]);

    chartData.push({
        unit: "°C",
        data: tempData
    });
    chartData.push({
        unit: "hPa",
        data: pressureData
    });
    chartData.push({
        unit: "%",
        data: humidityData
    });

    chart.updateSeries([{
        name: "Temperature",
        data: tempData
    }, {
        name: "Pressure",
        data: pressureData
    }, {
        name: "Humidity",
        data: humidityData
    }]);

    chart.hideSeries("Pressure");
    chart.hideSeries("Humidity");

    let weatherCondition = historyData.forecast.forecastday[0].day.condition;
    document.getElementById("weatherCondition").innerHTML = weatherCondition.text;

    document.getElementById("historyDate").innerHTML = new Date(historyData.forecast.forecastday[0].date).toLocaleDateString("de-DE");
}

getData();

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
        series: [],
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: 'dd.MM.yy HH:mm'
            },
            y: {
                formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                    return value + " " + chartData[seriesIndex].unit;
                }
            }
        },
        legend: {
            show: false
        }
    }

    chart = new ApexCharts(document.querySelector("#statsChart"), options);

    chart.render();
});

function showTemperature() {
    chart.showSeries("Temperature");
    chart.hideSeries("Pressure");
    chart.hideSeries("Humidity");

    document.getElementById("c-temperature").classList.add("active");
    document.getElementById("c-pressure").classList.remove("active");
    document.getElementById("c-humidity").classList.remove("active");
}

function showPressure() {
    chart.hideSeries("Temperature");
    chart.showSeries("Pressure");
    chart.hideSeries("Humidity");

    document.getElementById("c-temperature").classList.remove("active");
    document.getElementById("c-pressure").classList.add("active");
    document.getElementById("c-humidity").classList.remove("active");
}

function showHumidity() {
    chart.hideSeries("Temperature");
    chart.hideSeries("Pressure");
    chart.showSeries("Humidity");

    document.getElementById("c-temperature").classList.remove("active");
    document.getElementById("c-pressure").classList.remove("active");
    document.getElementById("c-humidity").classList.add("active");
}