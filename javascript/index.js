async function getData() {
    let coords = getCoords();
    getRealTimeData(coords.lat, coords.lon)
        .then((data) => {
            console.log(data.current.condition);
        })
        .catch((error) => {
            console.error("Error occured: ", error);
        });
    }

autocomplete(document.getElementById("myInput"), cities, function(){getData()});