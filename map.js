var funadhoo = {lat: 6.1487733, lng: 73.2882523};
var cGe, cPos, map, geMark, title;
var geArray = [];
var posArray = [];
var matchFound;
var gRoad, gNo, gBlock;
var houseIcon = "img/houseMarker.png";
var userIcon = "img/userMarker.png";

var navbarToggler = document.querySelector("#navbarToggler");
var togleBtn = document.querySelector("#togleBtn");

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
        animation: google.maps.Animation.DROP,
        icon: houseIcon
      });

        gRoad = geygeList[i].road;
        gNo = geygeList[i].houseNo;
        gBlock = geygeList[i].blockNo;

        // geInfoSetter();

        geArray.push(marker);

        geMarker = marker;
        map.setZoom(18);
        map.setCenter(geMarker.getPosition());


        geMarker.addListener('click', function() {
        map.setZoom(18);
        map.setCenter(geMarker.getPosition());
      });


      input.value = "";
      navbarToggler.classList.remove("show");
      togleBtn.classList.add("collapsed");
      togleBtn.setAttribute("aria-expanded", "false");
      geInfoSetter();
      matchFound = true;
      housePosImg.setAttribute("src", "img/houseActive.png");
      houseLocationHide = false;
      break;
    } else {
      matchFound = false;
    }
  }
  if (matchFound == false) {
    errorMsgDisplay();
  }
  input.value = "";
}
