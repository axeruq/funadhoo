var searchBtn = document.querySelector("#find");
var form = document.querySelector("#form");
var list = document.querySelector("#gethah");
var errorMsg = document.querySelector("#errorMsg");
var okayBtn = document.querySelector("#okay");
var userPosImg = document.querySelector("#userPosImg");
var housePosImg = document.querySelector("#housePosImg");
var infoBar = document.querySelector("#infoBar");
var infoHeader = document.querySelector("#infoHeader");
var mapImg = document.querySelector("#mapImg");


var houseLocationHide = false;
var locationHide = false;
var geInfoSet = false;
var mapchange = false;

searchBtn.addEventListener("click", function() {
  getAddress();
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  getAddress();
});

function optionListSetter() {
    for(let i =0; i < geygeList.length; i++) {
        if(geygeList[i].name !== "") {
            let listOption = document.createElement("option");
            let listText = document.createTextNode(geygeList[i].name);
            listOption.appendChild(listText);
            list.appendChild(listOption);
        } else {
            continue;
        }
    }
}

optionListSetter();

function errorMsgDisplay() {
  errorMsg.classList.remove("hidden");
  errorMsg.classList.add("error");
}

okayBtn.addEventListener("click", function() {
  errorMsg.classList.remove("error");
  errorMsg.classList.add("hidden");
});

housePosImg.addEventListener("click", function() {
  if (houseLocationHide === false) {
    geArray[0].setMap(null);
    housePosImg.setAttribute("src", "img/house.png");
    houseLocationHide = true;
    map.setZoom(16);
    } else {
      geArray[0].setMap(map);
      housePosImg.setAttribute("src", "img/houseActive.png");
      houseLocationHide = false;
    }
});

userPosImg.addEventListener("click", function() {

  if (locationHide == true) {
      for(let i = 0; i < posArray.length; i++) {
        posArray[i].setMap(null);
      }
    userPosImg.setAttribute("src", "img/location.png");
    locationHide = false;
  } else {
    getLocation();
    var marker = new google.maps.Marker({
      position: cPos,
      map: map,
      icon: userIcon,
      animation: google.maps.Animation.DROP});
    posArray.push(marker);

    map.setZoom(14);

    if (posArray.length > 1) {
      posArray[0].setMap(null);
      posArray.shift();
    }
    userPosImg.setAttribute("src", "img/locationActive.png");
    locationHide = true;
  }
});

function geInfoSetter() {
  if (geInfoSet == true) {
    for(let i = 0; i < 4; i++) {
      infoBar.removeChild(infoBar.childNodes[0]);
    }
  }
  let infoBarN = document.createElement("p");
  infoBarN.classList.add("pName");
  infoBarN.classList.add("list-group-item");
  infoBarN.classList.add("mt-4");
  let infoBarR = document.createElement("p");
  infoBarR.classList.add("pRoad");
  infoBarR.classList.add("list-group-item");
  let infoBarNo = document.createElement("p");
  infoBarNo.classList.add("pHouse")
  infoBarNo.classList.add("list-group-item")
  let infoBarBNo = document.createElement("p");
  infoBarBNo.classList.add("pBlock");
  infoBarBNo.classList.add("list-group-item");
  infoBarBNo.classList.add("mb-5");

  let textBarN = document.createTextNode(title);
  let textBarR = document.createTextNode(gRoad);
  let textBarNo = document.createTextNode(gNo);
  let textBarBNo = document.createTextNode(gBlock);

  infoBarN.appendChild(textBarN);
  infoBarR.appendChild(textBarR);
  infoBarNo.appendChild(textBarNo);
  infoBarBNo.appendChild(textBarBNo);

  infoBar.appendChild(infoBarN);
  infoBar.appendChild(infoBarR);
  infoBar.appendChild(infoBarNo);
  infoBar.appendChild(infoBarBNo);

  infoHeader.classList.remove("text-primary");
  infoHeader.classList.add("text-success");
  infoHeader.innerHTML ="Address Found";

  geInfoSet = true;
}

mapImg.addEventListener("click", function(){
  if(mapchange == false) {
    if(cGe!==[]) {
      map = new google.maps.Map(
          document.getElementById("map"), {
            zoom: 18,
            center: cGe,
            mapTypeId: 'satellite',
            disableDefaultUI: true});
            geArray[0].setMap(map);
            mapchange = true;
            mapImg.setAttribute("src", "img/terrain.png");
    } else {
      map = new google.maps.Map(
          document.getElementById("map"), {
            zoom: 15,
            center: funadhoo,
            mapTypeId: 'satellite',
            disableDefaultUI: true});
            mapchange = true;
            mapImg.setAttribute("src", "img/terrain.png");
    }

  } else {
    if(cGe!==[]) {
      map = new google.maps.Map(
          document.getElementById("map"), {
            zoom: 18,
            center: cGe,
            disableDefaultUI: true});
            geArray[0].setMap(map);
            mapchange = false;
            mapImg.setAttribute("src", "img/sattelite.png");
    } else {
      map = new google.maps.Map(
        document.getElementById("map"), {
        zoom: 15,
        center: funadhoo,
        disableDefaultUI: true});
        mapchange = false;
        mapImg.setAttribute("src", "img/sattelite.png");
    }
  }

});
