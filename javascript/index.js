let localData;
let locationData;

function fillSite() {
    fillCityname();
    fillTemperature();
}

function fillTemperature() {
    let temperature = localData.temp_c;
    let felttemperature = localData.feelslike_c;

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