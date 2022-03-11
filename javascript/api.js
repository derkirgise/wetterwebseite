async function getHistoryData(lat, lon, date) {
    return await fetch(`https://api.weatherapi.com/v1/history.json?key=a8a6faad8a9d4a00a22174858220303&dt=${date}&lang=de&q=${lat},${lon}`, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}

async function getRealTimeData(lat, lon) {
    return await fetch(`https://api.weatherapi.com/v1/current.json?key=a8a6faad8a9d4a00a22174858220303&lang=de&q=${lat},${lon}`, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}

async function getForecastData(lat, lon) {
    return await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a8a6faad8a9d4a00a22174858220303&lang=de&q=${lat},${lon}&days=3`, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}
