let stateName;
let actualTemp;
let minTemp;
let maxTemp;
let sunrise;
let sunset;
let percentageRain;
let literRainSquareMeters;
let windDirection;
let windSpeed;
let moonphase;


async function getStateList() {
    return getStateData();
}

async function setData(shortStatePar){
    
    console.log(shortStatePar);
    const states = await getStateList();
    console.log(states);
    let index = states.findIndex(x => x.shortState === shortStatePar);
    if(index === -1){
        index = 0;
    }

    document.getElementById("stateName").innerHTML = states[index].state;
    document.getElementById("livestream-link").innerHTML = 'Zum Wetterlivestream von '+ states[index].state;
    document.getElementById("livestream-link").setAttribute('href', '/webcam.html?state='+ states[index].shortState)
    
    setDate();
    
    



    const stateWeatherInfo = await getWeatherState(states[index].lat, states[index].long);
    
    document.getElementById('moon-phase').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['astro'].moon_phase;
    document.getElementById('sunrise').innerHTML = convertTimeToTwentyFourHFormat(stateWeatherInfo['forecast']['forecastday'][0]['astro'].sunrise)+' Uhr';
    document.getElementById('sunset').innerHTML = convertTimeToTwentyFourHFormat(stateWeatherInfo['forecast']['forecastday'][0]['astro'].sunset)+' Uhr';
    document.getElementById('minTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].mintemp_c + ' °C';
    document.getElementById('minTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].mintemp_c + ' °C';
    document.getElementById('maxTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].maxtemp_c + ' °C';
    document.getElementById('weatherText').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day']['condition'].text;
    document.getElementById('weather-icon').setAttribute('src', stateWeatherInfo['forecast']['forecastday'][0]['day']['condition'].icon) 
    document.getElementById('rainAmount').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['day'].totalprecip_in + ' Liter/m<sup>2</sup>';
    const hour = new Date().getHours();
    document.getElementById('windspeed').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_kph + ' km/h';
    document.getElementById('actualTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].temp_c + ' °C';
    document.getElementById('feelTemp').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].feelslike_c + ' °C';
    document.getElementById('rainPercentage').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].will_it_rain + ' %';
    document.getElementById('windDirection').innerHTML = stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour].wind_dir;
    console.log(stateWeatherInfo['forecast']['forecastday'][0]['hour'][hour]);
    console.log()
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