async function getHistoryData(lat, lon, date) {
    return await fetch(`http://api.weatherapi.com/v1/history.json?key=a8a6faad8a9d4a00a22174858220303&q=Amerbach&dt=${date}&lang=de&q=${lat},${lon}`, {
        // return await fetch("https://84c3da77-119d-4bbb-8c66-07ea00e2636b.mock.pstmn.io/v1/history.json?key=a8a6faad8a9d4a00a22174858220303&q=Amerbach&dt=2022-03-02&lang=de", {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json());
}