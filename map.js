var form = document.querySelector("form");
var input = document.querySelector("#geygeNan");
var sButton = document.querySelector("#hodhaa");
var hideMarker = document.querySelector("#hideMarker");
var uLocation = document.querySelector("#uLocation");

var funadhoo = {lat: 6.1487733, lng: 73.2882523};

var cGe, cPos, map, geMark, popup, Popup;

var geArray = [];
var posArray = [];

var markerHidden = false;
var uMarkerHidden = false;

function initMap() {
  getLocation();
  map = new google.maps.Map(
      document.getElementById("map"), {zoom: 14,
        center: funadhoo,
        disableDefaultUI: true});
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var clat = position.coords.latitude;
  var clng = position.coords.longitude;

    cPos = {lat: clat, lng: clng};
}

sButton.addEventListener("click", function() {

  for (let i = 0; i < geygeList.length; i++) {
    if (input.value.toUpperCase() === geygeList[i].name.toUpperCase()) {
      cGe = {lat: geygeList[i].lat, lng: geygeList[i].lng}
      break;
    }
  }

  if (geArray.length > 0) {
    geArray[0].setMap(null);
    geArray.shift();
  }

  var marker = new google.maps.Marker({
    position: cGe,
    map: map,
    animation: google.maps.Animation.DROP});

    geArray.push(marker);

    geMarker = marker;
    map.setZoom(18);
    map.setCenter(geMarker.getPosition());


    geMarker.addListener('click', function() {
    map.setZoom(18);
    map.setCenter(geMarker.getPosition());
  });


  input.value = "";
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  for (let i = 0; i < geygeList.length; i++) {
    if (input.value.toUpperCase() === geygeList[i].name.toUpperCase()) {
      cGe = {lat: geygeList[i].lat, lng: geygeList[i].lng}
      break;
    }
  }

  if (geArray.length > 0) {
    geArray[0].setMap(null);
    geArray.shift();
  }

  var marker = new google.maps.Marker({
    position: cGe,
    map: map,
    animation: google.maps.Animation.DROP});

    geArray.push(marker);

    geMarker = marker;
    map.setZoom(18);
    map.setCenter(geMarker.getPosition());


    geMarker.addListener('click', function() {
    map.setZoom(18);
    map.setCenter(geMarker.getPosition());
  });


  input.value = "";
});

uLocation.addEventListener("click", function() {
  if (uMarkerHidden === true) {
      for(let i = 0; i < posArray.length; i++) {
        posArray[i].setMap(null);
      }
    uMarkerHidden = false;
    uLocation.innerHTML = "Show My Location";
  } else {
    getLocation();
    var marker = new google.maps.Marker({position: cPos, map: map});
    posArray.push(marker);

    map.setZoom(16);

    if (posArray.length > 1) {
      posArray[0].setMap(null);
      posArray.shift();
    }
    uMarkerHidden = true;
    uLocation.innerHTML = "Hide My Location";
  }
});

hideMarker.addEventListener("click", function() {
  if (markerHidden === false) {
    geArray[0].setMap(null);
    markerHidden = true;
    map.setZoom(16);
    hideMarker.innerHTML = "Show Marker";
  } else {
    geArray[0].setMap(map);
    markerHidden = false;
    hideMarker.innerHTML = "Hide Marker";
  }
});
