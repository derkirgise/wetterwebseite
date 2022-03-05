function saveCoords(lat, long) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
}

function getCoords() {
    let lat = localStorage.getItem('lat');
    let long = localStorage.getItem('long');

    return {
        lat: lat,
        lon: long
    }
}

async function getIconPath(conditionId) {
    let response = await fetch("data/weather_conditions.json", {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    let data = await response.json();
    let condition = data.find(x => x.code == conditionId);

    if (condition && condition.iconPath) {
        return condition.iconPath;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.body.classList.remove("no-js");
});