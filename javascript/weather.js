let locationData;
let currentData;
let forecastData0;
let forecastData1;
let forecastData2;

function convertDate(date) {
    let year = date.substring(0,4);
    let month = date.substring(6,7);
    let day = date.substring(9,10);
    let result = day + month + year;
    return result;
}
function fillHourlyTemp() {
    let time600 = forecastData0.hour[5];

    document.getElementById("time600").innerHTML = time600;
}
function fillDetails() {
    let date = convertDate(locationData.localtime);
    let feltTemperature = currentData.feelslike_c;
    let pressure = currentData.pressure_mb;
    let humidity = currentData.humidity;
    let uvIndex = currentData.uv;
    let currentTemp = currentData.temp_c;

    document.getElementById("currentTemp").innerHTML = currentTemp;
    document.getElementById("weather-date").innerHTML = date;
    document.getElementById("weather-location").innerHTML = locationData.name;
    document.getElementById("pressure").innerHTML = pressure;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("uvIndex").innerHTML = uvIndex;
    document.getElementById("feltTemp").innerHTML = feltTemperature;
}


function getData() {
    let coords = getCoords();
    getForecastData(coords.lat, coords.lon)
        .then((data) => {
            locationData = data.location;
            currentData = data.current;
            forecastData0 = data.forecast.forecastday[0];
            forecastData1 = data.forecast[1];
            forecastData2 = data.forecast[2];
            fillDetails();
            fillHourlyTemp();
        })
        .catch((error) => {
            console.error("Error occured: ", error);
        });
}
getData();
autocomplete(document.getElementById("myInput"), cities, function(){getData()});