var form = document.querySelector("form");
var input = document.querySelector("#geygeNan");
var sButton = document.querySelector("#hodhaa");
var hideMarker = document.querySelector("#hideMarker");
var uLocation = document.querySelector("#uLocation");
var errorMsg = document.querySelector("#content");
var okayBtn = document.querySelector("#okay");
var toggleBtn = document.querySelector("#toggle");
var infoContent = document.querySelector("#infoTag");

var funadhoo = {lat: 6.1487733, lng: 73.2882523};

var cGe, cPos, map, geMark, popup, Popup, title;

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

function getAddress() {
  if (geArray.length > 0) {
    geArray[0].setMap(null);
    geArray.shift();
  }

  for (let i = 0; i < geygeList.length; i++) {
    if (input.value.toUpperCase() === geygeList[i].name.toUpperCase()) {
      cGe = {lat: geygeList[i].lat, lng: geygeList[i].lng}
      title = geygeList[i].name;
      var marker = new google.maps.Marker({
        position: cGe,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP});

        let gRoad = geygeList[i].road;
        let gNo = geygeList[i].houseNo;
        let gBlock = geygeList[i].blockNo;

        let infoBarN = document.createElement("p");
        let infoBarR = document.createElement("p");
        let infoBarNo = document.createElement("p");
        let infoBarBNo = document.createElement("p");

        let textBarN = document.createTextNode(`House Name: ${title}`);
        let textBarR = document.createTextNode(`Road: ${gRoad}`);
        let textBarNo = document.createTextNode(`House Number: ${gNo}`);
        let textBarBNo = document.createTextNode(`Block Number: ${gBlock}`);

        infoBarN.appendChild(textBarN);
        infoBarR.appendChild(textBarR);
        infoBarNo.appendChild(textBarNo);
        infoBarBNo.appendChild(textBarBNo);

        infoContent.appendChild(infoBarN);
        infoContent.appendChild(infoBarR);
        infoContent.appendChild(infoBarNo);
        infoContent.appendChild(infoBarBNo);

        geArray.push(marker);

        geMarker = marker;
        map.setZoom(18);
        map.setCenter(geMarker.getPosition());


        geMarker.addListener('click', function() {
        map.setZoom(18);
        map.setCenter(geMarker.getPosition());
      });


      input.value = "";
      var matchFound = true;
      break;
    } else {
      var matchFound = false;
    }
  }
  if (matchFound == false) {
    errorMsg.classList.remove("hide");
    errorMsg.classList.add("error");
  }
  input.value = "";
}

sButton.addEventListener("click", function() {
  getAddress();
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  getAddress();
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

    map.setZoom(14);

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

okayBtn.addEventListener("click", function() {
  errorMsg.classList.remove("error");
  errorMsg.classList.add("hide");
});

toggleBtn.addEventListener("click", function(){
  if (toggleBtn.classList == "toggle-up") {
    infoContent.classList.remove("hide");
    infoContent.classList.add("info-bar");
    toggleBtn.classList.remove("toggle-up");
    toggleBtn.classList.add("toggle-down");
    toggleBtn.setAttribute("src", "img/tdown.png");
  } else {
    infoContent.classList.remove("info-bar");
    infoContent.classList.add("hide");
    toggleBtn.classList.remove("toggle-down");
    toggleBtn.classList.add("toggle-up");
    toggleBtn.setAttribute("src", "img/tup.png")
  }
});
