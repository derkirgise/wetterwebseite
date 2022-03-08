let cities = [];

function city(name,lat,lon,state)
{
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.state = state;
}

// cities-Array wird mit den Daten aus der lokalen JSON beladen

async function getData() {
    let response = await fetch("../data/germancities.json");
    let data = await response.json();

    for (let id in data)
    {
        cities.push(new city (data[id].name, data[id].coords.lat, data[id].coords.lon, data[id].state));
    }
}

getData();

// Autocomplete-Funktion, die bei Bedienung des Input-Fields aufgerufen wird

function autocomplete(inp, arr, callback) {
    let currentFocus;
    inp.addEventListener("input", function(e) {
        let containerList, elementList, i;
        let val = e.target.value;
        let counterid = 0;
        let searchinfo;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        containerList = document.createElement("DIV");
        containerList.setAttribute("id", this.id + "autocomplete-list");
        containerList.setAttribute("class", "autocomplete-items");
        containerList.setAttribute("style", "position: absolute; z-index: 99; width: 14vw;")
        this.parentNode.appendChild(containerList);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            elementList = document.createElement("DIV");
            elementList.innerHTML = "<strong style='pointer-events:none'>" + arr[i].name.substr(0, val.length) + "</strong>";
            elementList.innerHTML += arr[i].name.substr(val.length);
            elementList.setAttribute('data-searchinformation',JSON.stringify(arr[i]));
            elementList.setAttribute('id',counterid);
            elementList.setAttribute('style','display:none');
            counterid++;
                elementList.addEventListener("click", function(e) {
                searchinfo = JSON.parse(e.target.dataset.searchinformation);
                inp.value=searchinfo.name;
                saveCoords(searchinfo.lat,searchinfo.lon,searchinfo.name,searchinfo.state);
                callback();
                closeAllLists();
            });
            containerList.appendChild(elementList);
          }
        }
      for (i=0; i<3;i++){
        document.getElementById(i).setAttribute('style','display:block');
      }
    });
    inp.addEventListener("keydown", function(e) {
        let containerList = document.getElementById(this.id + "autocomplete-list");
        if (containerList) containerList = containerList.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(containerList);
        } else if (e.keyCode == 38) { //up
          currentFocus--;
          addActive(containerList);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (containerList) containerList[currentFocus].click();
          }
        }
    });
    function addActive(containerList) {
      if (!containerList) return false;
      removeActive(containerList);
      if (currentFocus >= containerList.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (containerList.length - 1);
      containerList[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(containerList) {
      for (let i = 0; i < containerList.length; i++) {
        containerList[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      let elementList = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < elementList.length; i++) {
        if (elmnt != elementList[i] && elmnt != inp) {
          elementList[i].parentNode.removeChild(elementList[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
