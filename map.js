var funadhoo = {lat: 6.1487733, lng: 73.2882523};
var cGe, cPos, map, geMark, title;
var geArray = [];
var posArray = [];
var matchFound;
var gRoad, gNo, gBlock;
var houseIcon = "img/houseMarker.png";
var userIcon = "img/userMarker.png";

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
        animation: google.maps.Animation.DROP,
        icon: houseIcon
      });

        gRoad = geygeList[i].road;
        gNo = geygeList[i].houseNo;
        gBlock = geygeList[i].blockNo;

        geInfoSetter();

        geArray.push(marker);

        geMarker = marker;
        map.setZoom(18);
        map.setCenter(geMarker.getPosition());


        geMarker.addListener('click', function() {
        map.setZoom(18);
        map.setCenter(geMarker.getPosition());
      });


      input.value = "";
      matchFound = true;
      form.classList.add("hidden");
      searchImg.classList.remove("clickPos");
      searchImg.classList.add("initPos");
      userPosImg.classList.remove("img-hidden");
      housePosImg.classList.remove("img-hidden");
      housePosImg.setAttribute("src", "img/housePosFound.png");
      searchClicked = false;
      break;
    } else {
      matchFound = false;
    }
  }
  if (matchFound == false) {
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("error");
  }
  input.value = "";
}

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
