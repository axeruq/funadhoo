// get form and input 
var form = document.querySelector("form");
var geygeNan = document.querySelector("#homeName");

// set an empty array for both positions
var cLocation = [];
var houseLocation = [];

// set user location and house location
var userLocation;
var addressLocation;
var map;

// initialise the map

function initMap() {
    getLocation();
    var SHFunadhoo = {lat: 6.148674 , lng: 73.290473 };
    map = new google.maps.Map(
        document.querySelector('#map'), {zoom: 17, center: SHFunadhoo});
}

// get current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  clat = position.coords.latitude;
  clng = position.coords.longitude;
    
    userLocation = {lat: clat, lng: clng};
}

// get adress loation
form.addEventListener("submit", function(e){
    e.preventDefault();
    
    var userInput = geygeNan.value;
    
    for (let i =0; i < geygeList.length; i++) {
        if (userInput === geygeList[i].name) {
            addressLocation = {lat: geygeList[i].lat, lng: geygeList[i].lng};
            break;
        }
    }
    if (houseLocation.length > 0) {
        houseLocation[0].setMap(null);
        houseLocation.shift();
    }
    var marker = new google.maps.Marker({position: addressLocation, map:map, title: userInput});
    houseLocation.push(marker);
    
    geygeNan.value = "";
});

// draw markers 
function drawMarker() {
    getLocation();
    if ( cLocation.length > 1 ) {
        cLocation[0].setMap(null);
        cLocation.shift();
    } else {
        var marker = new google.maps.Marker({position: userLocation, map: map});
        cLocation.push(marker);
    }
    
}

var looper = setInterval(drawMarker, 600);