function saveCoords(lat, long,cityname,state) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
    localStorage.setItem('cityname', cityname);
    localStorage.setItem('state', state);
}

function getCoords() {
    let lat = localStorage.getItem('lat');
    let long = localStorage.getItem('long');

    return {
        lat: lat,
        lon: long
    }
}

async function getIconInformation(conditionId) {
    let response = await fetch("data/weather_conditions.json", {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    let data = await response.json();
    let condition = data.find(x => x.code == conditionId);

    if (condition && condition.iconPath) {
        return condition;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.body.classList.remove("no-js");
});


// Setzt den Default LocalStorage auf Heidenheim bei erstem Seitenaufruf
function checkLocalStorage(){
    if (!localStorage.cityname){
        let lat, long, cityname, state;
        lat = "48.67611";
        long = "10.15444";
        cityname = "Heidenheim an der Brenz";
        state = "Baden-Württemberg";
        saveCoords(lat, long,cityname,state);
    }
}

checkLocalStorage();