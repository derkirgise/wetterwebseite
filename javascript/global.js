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