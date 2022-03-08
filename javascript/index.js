let localData;
let locationData;


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

function fillSite() {
    let elements;
    let i;
    elements = document.getElementsByClassName("locationData");
    for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = localStorage.cityname;

    }
}

getCurrentData();
autocomplete(document.getElementById("myInput"), cities, function () { getCurrentData() });