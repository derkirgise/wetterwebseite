let localData;
let locationData;
let localTableData;

async function fillSite() {
    fillCityname();
    fillTemperature();
    fillDetails();
    fillDate();
    fillIcons();
    fillTable();
}

function translateDay(todaysDay) {
    if (todaysDay.length = 1) return "0" + todaysDay.toString() + ".";
    else return todaysDay.toString() + ".";
}

function translateMonth(todaysMonth) {
    switch (todaysMonth) {
        case 0: return "Januar";
        case 1: return "Februar";
        case 2: return "März";
        case 3: return "April";
        case 4: return "Mai";
        case 5: return "Juni";
        case 6: return "Juli";
        case 7: return "August";
        case 8: return "September";
        case 9: return "Oktober";
        case 10: return "November";
        case 11: return "Dezember";
    }
}

function translateWeekday(todaysDay) {
    switch (todaysDay) {
        case 0: return "Sonntag";
        case 1: return "Montag";
        case 2: return "Dienstag";
        case 3: return "Mittwoch";
        case 4: return "Donnerstag";
        case 5: return "Freitag";
        case 6: return "Samstag";
    }
}

function translateWinddirection(winddirection) {
    switch (winddirection) {
        case "N": return "Nord";
        case "NE": return "Nordost";
        case "E": return "Ost";
        case "SE": return "Südost";
        case "S": return "Süd";
        case "SW": return "Südwest";
        case "W": return "West";
        case "NW": return "Nordwest";
        case "NNE": return "Nordnordost";
        case "ENE": return "Ostnordost";
        case "ESE": return "Ostsüdost";
        case "SSE": return "Südsüdost";
        case "SSW": return "Südsüdwest";
        case "WSW": return "Westsüdwest";
        case "WNW": return "Westnordwest";
        case "NNW": return "Nordnordwest";
    }
}

function city(name, lat, lon, state) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.state = state;
}

function getStateIcon(state) {

    function stateIcon(path, alt) {
        this.path = path;
        this.alt = alt;
    }

    switch (state) {
        case "Baden-Württemberg": return new stateIcon("images/Icons/states/Baden-Wuerttemberg.png", "Icon von Baden-Württemberg");
        case "Bavaria": return new stateIcon("images/Icons/states/Bavaria.png", "Icon von Bayern");
        case "Berlin": return new stateIcon("images/Icons/states/Berlin.png", "Icon von Berlin");
        case "Brandenburg": return new stateIcon("images/Icons/states/Brandenburg.png", "Icon von Brandenburg");
        case "Bremen": return new stateIcon("images/Icons/states/Bremen.png", "Icon von Bremen");
        case "Hamburg": return new stateIcon("images/Icons/states/Hamburg.png", "Icon von Hamburg");
        case "Hesse": return new stateIcon("images/Icons/states/Hesse.png", "Icon von Hessen");
        case "Lower Saxony": return new stateIcon("images/Icons/states/Lower Saxony.png", "Icon von Niedersachen");
        case "Mecklenburg-Western Pomerania": return new stateIcon("images/Icons/states/Mecklenburg-Western Pomerania.png", "Icon von Mecklenburg-Vorpommern");
        case "North Rhine-Westphalia": return new stateIcon("images/Icons/states/North Rhine-Westphalia.png", "Icon von Nordrhein-Westfalen");
        case "Saarland": return new stateIcon("images/Icons/states/Saarland.png", "Icon vom Saarland");
        case "Saxony": return new stateIcon("images/Icons/states/Saxony.png", "Icon von Sachsen");
        case "Saxony-Anhalt": return new stateIcon("images/Icons/states/Saxony-Anhalt.png", "Icon von Sachsen-Anhalt");
        case "Schleswig-Holstein": return new stateIcon("images/Icons/states/Schleswig-Holstein.png", "Icon von Schleswig-Holstein");
        case "Thuringia": return new stateIcon("images/Icons/states/Thuringia.png", "Icon von Thüringen");
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function fillTable() {
    let tableElements = document.getElementsByClassName("tablecell");
    let tableTemp = document.getElementsByClassName("table_degree");
    let tableIcon = document.getElementsByClassName("table_smallpic");
    let counter;

    for (counter = 0; counter < tableElements.length; counter++) {
        let lat, lon;
        let city = tableElements[counter].innerText;

        let response = await fetch("../data/germancities.json");
        let data = await response.json();

        let germancitiesData = data.find(x => x.name == city);
        lat = germancitiesData.coords.lat;
        lon = germancitiesData.coords.lon;

        await getRealTimeData(lat, lon)
            .then((data) => {
                localTableData = data.current;
            });

        tableTemp[counter].innerText = localTableData.temp_c + "°";
        if (localTableData.is_day==1){
            let code = localTableData.condition.code;
            let iconInfo = await getIconInformation(code)
            tableIcon[counter].innerHTML = "<img src='" + iconInfo.iconPath + "' alt='" + iconInfo.alt + "' width='25px' ></img>";
        }
        else{
            tableIcon[counter].innerHTML = "<img src='images/Icons/moon.png' alt='Der Icon des Mondes' width='25px' ></img>";
        }
    }
}

async function fillIcons() {
    let weatherConditionIcon = document.getElementById("weatherIcon");

    if (localData.is_day==1){
        let iconInfo = await getIconInformation(localData.condition.code);
    
        weatherConditionIcon.src = iconInfo.iconPath;
        weatherConditionIcon.alt = iconInfo.alt;
    }
    else{
        weatherConditionIcon.src = "images/Icons/moon.png";
        weatherConditionIcon.alt = "Der Icon des Mondes.";
    }

    let stateIcon = getStateIcon(localStorage.state);
    let stateIconElement = document.getElementById("stateIcon");
    stateIconElement.src = stateIcon.path;
    stateIconElement.alt = stateIcon.alt;

}


function fillDate() {
    let todaysDate = new Date();

    let todaysYear = todaysDate.getFullYear();
    let todaysMonth = translateMonth(todaysDate.getMonth());
    let todaysDay = translateDay(todaysDate.getDate());

    let fullDateDE = todaysDay + ' ' + todaysMonth + ' ' + todaysYear;
    let todaysWeekDayDE = translateWeekday(todaysDate.getDay());

    let elements = document.getElementsByClassName("weekdayData");
    for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = todaysWeekDayDE;
    }
    elements = document.getElementsByClassName("fulldateData");
    for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = fullDateDE;
    }
}

function fillDetails() {
    let prognosis = localData.condition.text;
    let felttemperature = localData.feelslike_c;
    let pressure = localData.pressure_mb;
    let humidity = localData.humidity;
    let windspeed = localData.wind_kph;
    let winddirection = translateWinddirection(localData.wind_dir);

    document.getElementById("prognosisData").innerHTML = prognosis;
    document.getElementById("felttemperatureData").innerHTML = felttemperature;
    document.getElementById("pressureData").innerHTML = pressure;
    document.getElementById("humidityData").innerHTML = humidity;
    document.getElementById("windspeedData").innerHTML = windspeed;
    document.getElementById("winddirectionData").innerHTML = winddirection;
}

function fillTemperature() {
    let temperature = localData.temp_c;
    document.getElementById("temperatureData").innerHTML = temperature;
}

function fillCityname() {
    let elements;
    let i;
    elements = document.getElementsByClassName("locationData");
    for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = localStorage.cityname;
    }
}


function getCurrentData() {
    let coords = getCoords();
    getRealTimeData(coords.lat, coords.lon)
        .then((data) => {
            locationData = data.location;
            localData = data.current;
            fillSite();
        })
        .catch((error) => {
            console.error("Error occured: ", error);
        });
}

getCurrentData();
autocomplete(document.getElementById("myInput"), cities, function () { getCurrentData() });