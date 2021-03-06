const localSotrageStates = ["Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse","Mecklenburg-Western Pomerania","Lower Saxony","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"]

async function getStateData() {
    return await fetch("data/coordinatesGermanStates.json")
    .then((response) => response.json());
}

async function getMoonTranslationJSON() {
    return await fetch("data/moon-phase-translation.json")
    .then((response) => response.json());
}

async function setData(shortStatePar){
    const states = await getStateData();
    let index = states.findIndex(x => x.shortState === shortStatePar);
    if(index === -1){
        if (localStorage.state != null){
            index = localSotrageStates.indexOf(localStorage.state);
          }
          else{
              index = 0;
          }
    }

    document.getElementById("stateName").innerHTML = states[index].state;
    document.getElementById("livestream-link").innerHTML = 'Zum Wetterlivestream von '+ states[index].state;
    document.getElementById("livestream-link").setAttribute('href', 'webcam.html?state='+ states[index].shortState)
    document.getElementById("livestream-link1").innerHTML = 'Zum Wetterlivestream von '+ states[index].state;
    document.getElementById("livestream-link1").setAttribute('href', 'webcam.html?state='+ states[index].shortState)
    
    setDate();
    
    


    const dateToday =  new Date().toISOString().slice(0, 10);
    const stateWeatherInfo = await getHistoryData(states[index].lat, states[index].long, dateToday);
    
    document.getElementById('moon-phase').innerHTML = await stateWeatherInfo['forecast']['forecastday'][0]['astro'].moon_phase;


    document.getElementById('sunrise').innerHTML = convertTimeToTwentyFourHFormat(stateWeatherInfo['forecast']['forecastday'][0]['astro'].sunrise)+' Uhr';
    document.getElementById('sunset').innerHTML = convertTimeToTwentyFourHFormat(stateWeatherInfo['forecast']['forecastday'][0]['astro'].sunset)+' Uhr';
    document.getElementById('minTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].mintemp_c + ' °C';
    document.getElementById('minTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].mintemp_c + ' °C';
    document.getElementById('maxTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].maxtemp_c + ' °C';
    document.getElementById('weatherText').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day']['condition'].text;
    document.getElementById('rainAmount').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].totalprecip_in + ' Liter/m<sup>2</sup>';
    const hour = new Date().getHours();
    const image = await getIconInformation(stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour]['condition'].code);
    document.getElementById('weather-icon').setAttribute('src', image.iconPath); 
    document.getElementById('weather-icon').setAttribute('alt', image.alt);
    document.getElementById('windspeed').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_kph + ' km/h';
    document.getElementById('actualTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].temp_c + ' °C';
    document.getElementById('feelTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].feelslike_c + ' °C';
    document.getElementById('rainPercentage').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].will_it_rain + ' %';
    document.getElementById('windDirection').innerHTML = translateWinddirection(stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_dir);
    document.getElementById('windDirection1').innerHTML = translateWinddirection(stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_dir);
    document.getElementById('rainPercentage1').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].will_it_rain + ' %';
    document.getElementById('windspeed1').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_kph + ' km/h';
    document.getElementById('windDirection1').innerHTML = translateWinddirection(stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_dir);
    document.getElementById('rainAmount1').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].totalprecip_in + ' Liter/m<sup>2</sup>';

}

async function setDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    document.getElementById('date').innerHTML = dd + '.' + mm + '.' + yyyy;
}

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

async function translateMoonPhase(moonPhaseEn){
    const json = await getMoonTranslationJSON();
    const index = json.findIndex(x => x.en === moonPhaseEn.toLowerCase());
    return json[index].de;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlState = urlParams.get('state')
setData(urlState);