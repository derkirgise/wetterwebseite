let cities = [];

function city(name,lat,lon,state)
{
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.state = state;
}

async function getData() {
    let response = await fetch("../data/germancities.json");
    let data = await response.json();

    for (let id in data)
    {
        cities.push(new city (data[id].name, data[id].coords.lat, data[id].coords.lon, data[id].state));
    }
}

function autocomplete(inp, arr, callback) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        let containerList, elementList, i;
        // a = containerList
        // b = elementList
        let val = e.target.value;
        let counterid = 0;
        let searchinfo;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        containerList = document.createElement("DIV");
        containerList.setAttribute("id", this.id + "autocomplete-list");
        containerList.setAttribute("class", "autocomplete-items");
        containerList.setAttribute("style", "position: absolute; z-index: 99; width: 14vw;")
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(containerList);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            elementList = document.createElement("DIV");
            /*make the matching letters bold:*/
            elementList.innerHTML = "<strong style='pointer-events:none'>" + arr[i].name.substr(0, val.length) + "</strong>";
            elementList.innerHTML += arr[i].name.substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            elementList.setAttribute('data-searchinformation',JSON.stringify(arr[i]));
            elementList.setAttribute('id',counterid);
            elementList.setAttribute('style','display:none');
            counterid++;
            /*execute a function when someone clicks on the item value (DIV element):*/
                elementList.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                //console.log(e.target.dataset.searchinformation);
                searchinfo = JSON.parse(e.target.dataset.searchinformation);
                inp.value=searchinfo.name;
                saveCoords(searchinfo.lat,searchinfo.lon,searchinfo.name,searchinfo.state);
                callback();
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            containerList.appendChild(elementList);
          }
        }
      for (i=0; i<3;i++){
        document.getElementById(i).setAttribute('style','display:block');
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        let containerList = document.getElementById(this.id + "autocomplete-list");
        if (containerList) containerList = containerList.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(containerList);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(containerList);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (containerList) containerList[currentFocus].click();
          }
        }
    });
    function addActive(containerList) {
      /*a function to classify an item as "active":*/
      if (!containerList) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(containerList);
      if (currentFocus >= containerList.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (containerList.length - 1);
      /*add class "autocomplete-active":*/
      containerList[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(containerList) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < containerList.length; i++) {
        containerList[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var elementList = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < elementList.length; i++) {
        if (elmnt != elementList[i] && elmnt != inp) {
          elementList[i].parentNode.removeChild(elementList[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  getData();