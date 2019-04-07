var form = document.querySelector("form");
var searchImg = document.querySelector("#searchImg");
var input = document.querySelector("#input");
var searchBtn = document.querySelector("#searchBtn");
var infoContainer = document.querySelector("#infoContainer");
var infoBar = document.querySelector("#info");
var toggleImg = document.querySelector("#toggleImg");
var userPosImg = document.querySelector("#userPosImg");
var housePosImg = document.querySelector("#housePosImg");
var errorMsg = document.querySelector("#errorMsg");
var okayBtn = document.querySelector("#okay");
var list = document.querySelector("#gethah");

var toggle = false;
var searchClicked = false;
var locationHide = false;
var houseLocationHide = false;
var geInfoSet = false;
var markerHidden = false;
var uMarkerHidden = false;
var matchFound = false;
var listArray = [];

searchImg.addEventListener("click", function() {
  if(searchClicked == false) {
    form.classList.remove("hidden");
    searchImg.classList.remove("initPos");
    searchImg.classList.add("clickPos");
    userPosImg.classList.add("img-hidden");
    housePosImg.classList.add("img-hidden");
    searchClicked = true;
  } else {
    form.classList.add("hidden");
    searchImg.classList.remove("clickPos");
    searchImg.classList.add("initPos");
    userPosImg.classList.remove("img-hidden");
    housePosImg.classList.remove("img-hidden");
    searchClicked = false;
  }
});

toggleImg.addEventListener("click", function() {
  if(toggle == false) {
    infoContainer.classList.remove("hidden");
    infoContainer.classList.add("info-bar");
    toggleImg.classList.remove("toggleUp");
    toggleImg.classList.add("toggleDown");
    toggleImg.setAttribute("src", "img/toggleDown.png");
    toggle = true;
  } else {
    infoContainer.classList.remove("info-bar");
    infoContainer.classList.add("hidden");
    toggleImg.classList.remove("toggleDown");
    toggleImg.classList.add("toggleUp");
    toggleImg.setAttribute("src", "img/toggleUp.png");
    toggle = false;
  }
});

housePosImg.addEventListener("click", function() {
  if (houseLocationHide === false) {
    geArray[0].setMap(null);
    housePosImg.setAttribute("src", "img/housePosHide.png");
    houseLocationHide = true;
    map.setZoom(16);
    } else {
    geArray[0].setMap(map);
    if(matchFound == true) {
      housePosImg.setAttribute("src", "img/housePosFound.png");
    } else {
      housePosImg.setAttribute("src", "img/housePos.png");
    }
    houseLocationHide = false;
  }
});

userPosImg.addEventListener("click", function() {

  if (locationHide == true) {
      for(let i = 0; i < posArray.length; i++) {
        posArray[i].setMap(null);
      }
    userPosImg.setAttribute("src", "img/userPosHide.png");
    locationHide = false;
  } else {
    getLocation();
    var marker = new google.maps.Marker({position: cPos, map: map, icon: userIcon, animation: google.maps.Animation.DROP});
    posArray.push(marker);

    map.setZoom(14);

    if (posArray.length > 1) {
      posArray[0].setMap(null);
      posArray.shift();
    }
    userPosImg.setAttribute("src", "img/userPos.png");
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
  let infoBarR = document.createElement("p");
  infoBarR.classList.add("pRoad");
  let infoBarNo = document.createElement("p");
  infoBarNo.classList.add("pHouse")
  let infoBarBNo = document.createElement("p");
  infoBarBNo.classList.add("pBlock");

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

  geInfoSet = true;
}

searchBtn.addEventListener("click", function() {
  getAddress();
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  getAddress();
});

okayBtn.addEventListener("click", function() {
  errorMsg.classList.remove("error");
  errorMsg.classList.add("hidden");
});
