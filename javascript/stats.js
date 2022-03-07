let historyData;
let locationInfo;
let chart;
let chartData = [];
let dateSelection;
let humidityProgressCircle;

async function getData() {
    console.log('HEY');
    let coords = getCoords();
    getHistoryData(coords.lat, coords.lon, dateSelection)
        .then((data) => {
            locationInfo = data.location;
            historyData = data.forecast.forecastday[0];
            setData();
        })
        .catch((error) => {
            console.error("Error occured: ", error);
        });
}

async function setData() {
    // Chart Data
    let locationLabel = document.getElementById("locationName");
    locationLabel.innerHTML = locationInfo.name + ",";

    let hour = historyData.hour;
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

    // Title-Data

    let weatherCondition = historyData.day.condition;
    document.getElementById("weatherCondition").innerHTML = weatherCondition.text;

    document.getElementById("historyDate").innerHTML = new Date(historyData.date).toLocaleDateString("de-DE");

    let weatherConditionIcon = document.getElementById("conditionIcon");
    weatherConditionIcon.src = await getIconPath(weatherCondition.code);

    // SideStats
    document.getElementById("minTemp").innerText = `MIN: ${historyData.day.mintemp_c}°C`;
    document.getElementById("maxTemp").innerText = `MAX: ${historyData.day.maxtemp_c}°C`;
    document.getElementById("avgTemp").innerText = `AVG: ${historyData.day.avgtemp_c}°C`;

    setTemperature(historyData.day.avgtemp_c);

    document.getElementById("sunrise").innerText = convertTimeToTwentyFourHFormat(historyData.astro.sunrise);
    document.getElementById("sunset").innerText = convertTimeToTwentyFourHFormat(historyData.astro.sunset);
    document.getElementById("moonrise").innerText = convertTimeToTwentyFourHFormat(historyData.astro.moonrise);
    document.getElementById("moonset").innerText = convertTimeToTwentyFourHFormat(historyData.astro.moonset);

    // Bottom Stats
    humidityProgressCircle.value = historyData.day.avghumidity;

    document.getElementById("uvIndex").innerText = historyData.day.uv;
    setUvIndexColor(historyData.day.uv);
    document.getElementById("precipitationSum").innerText = `${historyData.day.totalprecip_mm} mm`;

    if (calcFrostHours() == 0) {
        document.getElementById("frostHoursCard").display = "none";
    } else {
        document.getElementById("frostHours").innerText = `${calcFrostHours()} h`;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    humidityProgressCircle = new CircleProgress('.progress', { max: 100, textFormat: "percent" });
    var options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            animations: {
                enabled: false
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
    autocomplete(document.getElementById("myInput"), cities, function(){getData()});
});

function showTemperature() {
    chart.showSeries("Temperature");
    chart.hideSeries("Pressure");
    chart.hideSeries("Humidity");

    document.querySelectorAll(".c-temperature").forEach((item) => item.classList.add("active"));
    document.querySelectorAll(".c-pressure").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".c-humidity").forEach((item) => item.classList.remove("active"));
}

function showPressure() {
    chart.hideSeries("Temperature");
    chart.showSeries("Pressure");
    chart.hideSeries("Humidity");

    document.querySelectorAll(".c-temperature").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".c-pressure").forEach((item) => item.classList.add("active"));
    document.querySelectorAll(".c-humidity").forEach((item) => item.classList.remove("active"));
}

function showHumidity() {
    chart.hideSeries("Temperature");
    chart.hideSeries("Pressure");
    chart.showSeries("Humidity");

    document.querySelectorAll(".c-temperature").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".c-pressure").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".c-humidity").forEach((item) => item.classList.add("active"));;
}

function setTemperature(temp) {
    // Color
    let color;

    if (temp < 15) {
        color = '#90D2EA';
    } else if (temp >= 15 && temp < 30) {
        color = '#FF7748';
    } else if (temp >= 30) {
        color = '#ED5448';
    }

    // calculates height dependent on temperature

    const height = 191.344;
    const rectAngleY = 69.118;

    let rectHeight;

    if (temp >= 0) {
        rectHeight = 60 + temp * (131 / 40);
    } else {
        rectHeight = (25 + temp) * (60 / 25);
    }
    let yCoords = rectAngleY + (height - rectHeight);

    let tempRectangle = document.getElementById("varTemp");
    let clipPath = document.getElementById("round-corner-rect");

    // Animate
    const animationDuration = 500;
    document.querySelectorAll(".temp-color").forEach((el) => el.animate([{
        fill: "#90D2EA"
    }, {
        fill: color
    }], {
        duration: animationDuration,
        iterations: 1,
        fill: 'forwards'
    }));

    tempRectangle.animate(
        [{
            height: '0px',
            y: rectAngleY + height,
        }, {
            height: rectHeight + 'px',
            y: yCoords,
        }], {
            duration: animationDuration,
            iterations: 1,
            fill: 'forwards'
        });

    clipPath.animate([{
        y: rectAngleY + height
    }, {
        y: yCoords
    }], {
        duration: animationDuration,
        iterations: 1,
        fill: 'forwards'
    })
}

function onChangeTimeSelection(event) {
    let offset = 0;

    if (event) {
        offset = event.target.dataset.dayoffset
    }
    dateSelection = new Date();
    dateSelection.setDate(dateSelection.getDate() - Math.abs(offset));

    dateSelection = `${dateSelection.getFullYear()}-${dateSelection.getMonth() + 1}-${dateSelection.getDate()}`;
    getData(dateSelection);
    return dateSelection;
}

function calcFrostHours() {
    return historyData.hour.filter(x => x.temp_c <= 0).length;
}

function setUvIndexColor(uvIndex) {
    let uvIndexElement = document.getElementById("uvIndex");
    let uvIndexColor;
    uvIndex += 1;

    if (uvIndex <= 2) {
        uvIndexColor = "#1E9D4C";
    } else if (uvIndex >= 3 && uvIndex <= 5) {
        uvIndexColor = "#F3BA22";
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        uvIndexColor = "#EA7E26";
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        uvIndexColor = "#E24C27";
    } else if (uvIndex >= 11) {
        uvIndexColor = "#8962A1";
    }

    uvIndexElement.style.backgroundColor = uvIndexColor;
}

onChangeTimeSelection();

function convertTimeToTwentyFourHFormat(timeTwelveH) {
    let [time, addition] = timeTwelveH.split(' ');
    let [hours, minutes] = time.split(":");

    if (hours === '12') {
        hours = '00';
    }

    if (addition === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}