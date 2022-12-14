import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  leaflet: window.L,
  jumpPointsList: null,
  onlyOneMatchedBefore: false,
  map: null,
});

function addPoints() {
  Object.keys(store.jumpPointsList).forEach((name) => {
    var singlepoint = store.jumpPointsList[name];
    var text = `<div class="popupheader">${name}</div>`;
    // check if the jumppoint data contains all the info required to display in the popup
    if (Object.keys(singlepoint).length > 2) {
      // add info to popup
      text += `Veter piha v smeri ${singlepoint["windDirection"]} s hitrostjo ${singlepoint["windSpeed"]} m/s, ter sunki do ${singlepoint["windGust"]} m/s`;
      text += `<br/>Temperatura na vzletišču: ${singlepoint["temperature"]}°C`;
      text += `<br/>Trenutno vreme: ${singlepoint["detailedWeather"]}`;
    } else {
      text += "<br/>Podatkov ni bilo mogoče pridobiti.";
    }

    var x = store.jumpPointsList[name].lat;
    var y = store.jumpPointsList[name].lon;

    // create weather info popup
    // TODO: make it pretty
    store.leaflet.marker([x, y]).addTo(store.map).bindPopup(`${text}`);
  });
}

/*
function zoomOnPoint(toFind) {
  Object.keys(store.jumpPointsList).forEach((name) => {
    if (toFind.getAttribute("name") == name) {
      var point = store.jumpPointsList[name];
      map.flyTo([point.lat, point.lon], 14);
    }
  });
}

// Searchbar filter for sites
// This function automatically selects the jumppoint if there is only 1 jumppoint left with that name
// TODO: make this work with VueJS
var onlyOneMatchedBefore = false;
function searchElements(inputElement) {
  var toFind = inputElement.value;
  var jumpPoints = document.getElementsByClassName("jumppoint");
  var matching = [];
  // if we find a matching part (of the searched jumppoint name), display="", else display="none"
  for (let i = 0; i < jumpPoints.length; i++) {
    var current = jumpPoints[i].getAttribute("name");
    if (current.toLowerCase().indexOf(toFind) > -1) {
      jumpPoints[i].setAttribute("style", "");
      matching.push(jumpPoints[i]);
    } else {
      jumpPoints[i].setAttribute("style", "display:none");
    }
  }
  if (matching.length == 1 && !onlyOneMatchedBefore) {
    onlyOneMatchedBefore = true;
    zoomOnPoint(matching[0]);
  } else if (matching.length > 1) {
    onlyOneMatchedBefore = false;
  }
  if (matching.length == 1 && !onlyOneMatchedBefore) {
    onlyOneMatchedBefore = true;
    zoomOnPoint(matching[0]);
  } else if (matching.length > 1) {
    onlyOneMatchedBefore = false;
  }
}*/

async function getAllData() {
  await axios
    .get(`http://${window.location.hostname}:30000/full`)
    .then((resFromAPI) => {
      store.jumpPointsList = resFromAPI.data;
      console.log(resFromAPI.data);
      if (Object.keys(resFromAPI.data).length == 0) {
        // TODO: if response != 200, error
        // there has been an error
        alert("There was an error loading jump point data.");
      }
    })
    .then(addPoints)
    .catch((e) => {
      console.error(e);
    });
}

getAllData();
