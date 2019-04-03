var form = document.querySelector("form");
var input = document.querySelector("#geygeNan");
var sButton = document.querySelector("#hodhaa");
var hideMarker = document.querySelector("#hideMarker");
var uLocation = document.querySelector("#uLocation");
var errorMsg = document.querySelector("#content");
var okayBtn = document.querySelector("#okay");
var toggleBtn = document.querySelector("#toggle");
var infoContent = document.querySelector("#infoTag");
var list = document.querySelector("#gethah");

var funadhoo = {lat: 6.1487733, lng: 73.2882523};

var cGe, cPos, map, geMark, popup, Popup, title;

var listArray = [];
var geArray = [];
var posArray = [];

var markerHidden = false;
var uMarkerHidden = false;
var geInfoSet = false;

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
    
    if (listArray.length !==0) {
        for ( let k = 0; k < listArray.length; k++) {
            list.removeChild(list.childNodes[0]);
        }
    }
    
    listArray = [];
    
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

        if (geInfoSet == true) {
          for(let i = 0; i < 4; i++) {
            infoContent.removeChild(infoContent.childNodes[0]);
          }
        }
        let infoBarN = document.createElement("p");
        infoBarN.classList.add("pN");
        let infoBarR = document.createElement("p");
        infoBarR.classList.add("pR");
        let infoBarNo = document.createElement("p");
        infoBarNo.classList.add("pNo")
        let infoBarBNo = document.createElement("p");
        infoBarBNo.classList.add("pBNo");

        let textBarN = document.createTextNode(title);
        let textBarR = document.createTextNode(gRoad);
        let textBarNo = document.createTextNode(gNo);
        let textBarBNo = document.createTextNode(gBlock);

        infoBarN.appendChild(textBarN);
        infoBarR.appendChild(textBarR);
        infoBarNo.appendChild(textBarNo);
        infoBarBNo.appendChild(textBarBNo);

        infoContent.appendChild(infoBarN);
        infoContent.appendChild(infoBarR);
        infoContent.appendChild(infoBarNo);
        infoContent.appendChild(infoBarBNo);

        geInfoSet = true;

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

input.addEventListener("keydown", function() {
    
    if (listArray.length !==0) {
        for ( let k = 0; k < listArray.length; k++) {
            list.removeChild(list.childNodes[0]);
        }
    }
    
    listArray = [];
    
    if(input.value.length > 1) {
         for(let i = 0; i < geygeList.length; i++) {
            if(geygeList[i].name.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
            listArray.push(geygeList[i].name);
            }
        }
    }
        for(let j = 0; j < listArray.length; j++) {
            let optionList = document.createElement("option");
            let optionText = document.createTextNode(listArray[j]);
            optionList.appendChild(optionText);
            list.appendChild(optionList);
    }
    
});
