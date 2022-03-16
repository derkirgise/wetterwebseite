
/**
 * Speichert Ortsdaten im localStorage 
 */
function saveCoords(lat, long,cityname,state) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
    localStorage.setItem('cityname', cityname);
    localStorage.setItem('state', state);
}

/**
 * Ruft die gespeicherten Ortskoordinaten aus dem localStorage ab
 * @returns 
 */
function getCoords() {
    let lat = localStorage.getItem('lat');
    let long = localStorage.getItem('long');

    return {
        lat: lat,
        lon: long
    }
}

// Liefert auf Basis des Wettercodes (liefert der weatherapi-fetch) den Path und den Alt-Text des entsprechenden Wetters
// Benutzt hierfür eine eigens erstellte JSON

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

/**
 * Sobald der DOM geladen wurde, wird die Klasse "no-js" entfernt, sodass wenn kein Javascript aktiviert ist
 * eine Hinweismeldung statt des Seiteninhalts angezeigt wird. Bei deaktiviertem Javascript wird diese Methode nicht aufgerufen
 * => Javascript-Deaktiviert-Meldung erscheint
 */
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