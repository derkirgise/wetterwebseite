async function getHistoryData(lat, lon, date) {
    return await fetch(`http://api.weatherapi.com/v1/history.json?key=a8a6faad8a9d4a00a22174858220303&dt=${date}&lang=de&q=${lat},${lon}`, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}

async function getRealTimeData(lat, lon) {
    return await fetch(`http://api.weatherapi.com/v1/current.json?key=a8a6faad8a9d4a00a22174858220303&lang=de&q=${lat},${lon}`, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}

async function getForecastData(lat, lon) {
    return await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a8a6faad8a9d4a00a22174858220303&lang=de&q=${lat},${lon}`, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}


async function getStateData() {
    return await fetch("data/coordinatesGermanStates.json")
    .then((response) => response.json());
}

async function getWeatherState(lat, lon) {
    const dateToday =  new Date().toISOString().slice(0, 10);
    return fetch("https://api.weatherapi.com/v1/history.json?key=a8a6faad8a9d4a00a22174858220303&q="+lat+","+lon+"&dt="+dateToday+"&lang=de")
    .then(response => response.json())
}