let locationData;
let currentData;
let forecastData0;
let forecastData1;
let forecastData2;


//Date.getday() liefert Zahl zwischen 0-6
function getWeekday(day) {
    let date = new Date(locationData.localtime);
    let weekday = translateWeekday((date.getDay()+day)%7);
    return weekday;
}

//int von 0-6 in Wochentag
function translateWeekday(weekday) {
    switch (weekday) {
        case 0: return "Sonntag";
        case 1: return "Montag";
        case 2: return "Dienstag";
        case 3: return "Mittwoch";
        case 4: return "Donnerstag";
        case 5: return "Freitag";
        case 6: return "Samstag";
    }
}

//Format: YYYY-MM-DD zu DD.MM.YYYY
function convertDate(date) {
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let result = day + '.' + month + '.' + year;
    console.log(year, month, day)
    return result;
}

//3-stündige Temperatur einfügen
async function fillHourlyTemp() {
    let time600 = forecastData0.hour[6].temp_c;
    let time600iconInformation = await getIconInformation(forecastData0.hour[6].condition.code);
    let time600icon =  document.getElementById("time600icon");
    if (forecastData0.hour[6].is_day==1){
        time600icon.src = time600iconInformation.iconPath;
        time600icon.alt = time600iconInformation.alt;
    }
    else{
        time600icon.src = "images/Icons/moon.png";
        time600icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time600").innerHTML = time600 + "°";

    let time900 = forecastData0.hour[9].temp_c;
    let time900iconInformation = await getIconInformation(forecastData0.hour[9].condition.code);
    let time900icon =  document.getElementById("time900icon");
    if (forecastData0.hour[9].is_day==1){
        time900icon.src = time900iconInformation.iconPath;
        time900icon.alt = time900iconInformation.alt;
    }
    else{
        time900icon.src = "images/Icons/moon.png";
        time900icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time900").innerHTML = time900 + "°";

    let time1200 = forecastData0.hour[12].temp_c;
    let time1200iconInformation = await getIconInformation(forecastData0.hour[12].condition.code);
    let time1200icon =  document.getElementById("time1200icon");
    if (forecastData0.hour[12].is_day==1){
        time1200icon.src = time1200iconInformation.iconPath;
        time1200icon.alt = time1200iconInformation.alt;
    }
    else{
        time1200icon.src = "images/Icons/moon.png";
        time1200icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time1200").innerHTML = time1200 + "°";

    let time1500 = forecastData0.hour[15].temp_c;
    let time1500iconInformation = await getIconInformation(forecastData0.hour[15].condition.code);
    let time1500icon =  document.getElementById("time1500icon");
    if (forecastData0.hour[15].is_day==1){
        time1500icon.src = time1500iconInformation.iconPath;
        time1500icon.alt = time1500iconInformation.alt;
    }
    else{
        time1500icon.src = "images/Icons/moon.png";
        time1500icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time1500").innerHTML = time1500 + "°";

    let time1800 = forecastData0.hour[18].temp_c;
    let time1800iconInformation = await getIconInformation(forecastData0.hour[18].condition.code);
    let time1800icon =  document.getElementById("time1800icon");
    if (forecastData0.hour[18].is_day==1){
        time1800icon.src = time1800iconInformation.iconPath;
        time1800icon.alt = time1800iconInformation.alt;
    }
    else{
        time1800icon.src = "images/Icons/moon.png";
        time1800icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time1800").innerHTML = time1800 + "°";

    let time2100 = forecastData0.hour[21].temp_c;
    let time2100iconInformation = await getIconInformation(forecastData0.hour[21].condition.code);
    let time2100icon =  document.getElementById("time2100icon");
    if (forecastData0.hour[21].is_day==1){
        time2100icon.src = time2100iconInformation.iconPath;
        time2100icon.alt = time2100iconInformation.alt;
    }
    else{
        time2100icon.src = "images/Icons/moon.png";
        time2100icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time2100").innerHTML = time2100 + "°";

    let time0000 = forecastData1.hour[0].temp_c;
    let time0000iconInformation = await getIconInformation(forecastData0.hour[0].condition.code);
    let time0000icon =  document.getElementById("time0000icon");
    if (forecastData1.hour[0].is_day==1){
        time0000icon.src = time0000iconInformation.iconPath;
        time0000icon.alt = time0000iconInformation.alt;
    }
    else{
        time0000icon.src = "images/Icons/moon.png";
        time0000icon.alt = "Der Icon des Mondes.";
    }
    document.getElementById("time0000").innerHTML = time0000 + "°";
}

//Daten für Vorhersage einfügen
async function fillForecastDetails() {
    let weekdayTomorrow = getWeekday(1);
    let weekdayTheDayAfterTomorrow = getWeekday(2);
    let dateTomorrow = convertDate(forecastData1.date)
    let dateTheDayAfterTomorrow = convertDate(forecastData2.date)

    let forecast1 = forecastData1.day.avgtemp_c;
    let forecast1iconInformation = await getIconInformation(forecastData1.day.condition.code);
    let forecast1icon =  document.getElementById("forecast1icon");
    forecast1icon.src = forecast1iconInformation.iconPath;
    forecast1icon.alt = forecast1iconInformation.alt;
    document.getElementById("temp-tomorrow").innerHTML = forecast1 + "°";

    let forecast2 = forecastData2.day.avgtemp_c;
    let forecast2iconInformation = await getIconInformation(forecastData2.day.condition.code);
    let forecast2icon =  document.getElementById("forecast2icon");
    forecast2icon.src = forecast2iconInformation.iconPath;
    forecast2icon.alt = forecast2iconInformation.alt;
    document.getElementById("temp-day-after-tomorrow").innerHTML = forecast2 + "°";

    document.getElementById("weekday-tomorrow").innerHTML = weekdayTomorrow + ", der " + dateTomorrow;
    document.getElementById("weekday-day-after-tomorrow").innerHTML = weekdayTheDayAfterTomorrow + ", der " + dateTheDayAfterTomorrow;
}

//restliche Daten, wie Ort, aktuelle Temperatur etc. einfügen
function fillDetails() {
    let date = convertDate(locationData.localtime);
    let weather = currentData.condition.text;
    let pressure = currentData.pressure_mb;
    let humidity = currentData.humidity;
    let uvIndex = currentData.uv;
    let feltTemperature = currentData.feelslike_c;
    let currentTemp = currentData.temp_c;
    let weekdayToday = getWeekday(0);

    document.getElementById("weather-date").innerHTML = date;
    document.getElementById("weather").innerHTML = weather;
    document.getElementById("weather-location").innerHTML = localStorage.cityname;
    document.getElementById("pressure").innerHTML = pressure + ' hPa';
    document.getElementById("humidity").innerHTML = humidity + '%';
    document.getElementById("uvIndex").innerHTML = uvIndex;
    document.getElementById("feltTemp").innerHTML = feltTemperature + '°';
    document.getElementById("currentTemp").innerHTML = currentTemp;
    document.getElementById("weekday-today").innerHTML = weekdayToday;
}

//API-Fetch
function getData() {
    let coords = getCoords();
    getForecastData(coords.lat, coords.lon)
        .then((data) => {
            locationData = data.location;
            currentData = data.current;
            forecastData0 = data.forecast.forecastday[0];
            forecastData1 = data.forecast.forecastday[1];
            forecastData2 = data.forecast.forecastday[2];
            fillDetails();
            fillHourlyTemp();
            fillForecastDetails();
        })
        .catch((error) => {
            console.error("Error occured: ", error);
        });
}
getData();
autocomplete(document.getElementById("myInput"), cities, function(){getData()});