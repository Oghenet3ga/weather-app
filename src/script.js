//Date and Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = String(now.getHours()).padStart(2, "0");
let mins = String(now.getMinutes()).padStart(2, "0");
let current = document.querySelector("#currentdt");
current.innerHTML = `<strong>${day} ${hours}:${mins}</strong>`;

//Display live Weather feed when city search is submitted via API
function displayTemperature(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  celunit = Math.round(response.data.main.temp);

  let currentTemp = Math.round(response.data.main.temp);
  let Temp = document.querySelector("#ctemp");
  Temp.innerHTML = currentTemp;

  let descrip = document.querySelector("#description");
  descrip.innerHTML = response.data.weather[0].description;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function currentT(event) {
  event.preventDefault();

  let apiID = "58a6775f97527351bf6c6966e209be39";
  let cityInput = document.querySelector("#city-input");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiID}`;

  axios.get(apiURL).then(displayTemperature);
}

let showTemp = document.querySelector("#search-button");
showTemp.addEventListener("click", currentT);

//Display live weather feed based on current location via lon&lat using API
function currentLoc(event) {
  event.preventDefault();

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiID = "58a6775f97527351bf6c6966e209be39";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiID}`;

    axios.get(apiURL).then(displayTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let showLocation = document.querySelector("#current-location");
showLocation.addEventListener("click", currentLoc);

//Temp Conversion
function showUnitF(event) {
  event.preventDefault();
  let currentemp = document.querySelector(".temperature");
  //remove the active class from Cel
  convertCel.classList.remove("active");
  //add the active class to Far
  convertFar.classList.add("active");

  let far = (celunit * 9) / 5 + 32;
  currentemp.innerHTML = Math.round(far);
}

function showUnitC(event) {
  event.preventDefault();
  let currentemp = document.querySelector(".temperature");
  //remove the active class from Far
  convertFar.classList.remove("active");
  //add the active class to Cel
  convertCel.classList.add("active");

  currentemp.innerHTML = celunit;
}

let celunit = null;

let convertFar = document.querySelector("#far-unit");
convertFar.addEventListener("click", showUnitF);

let convertCel = document.querySelector("#celsius-unit");
convertCel.addEventListener("click", showUnitC);

//Setting a default city displaying live weather feed on load
function search(city) {
  let apiID = "58a6775f97527351bf6c6966e209be39";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;

  axios.get(apiURL).then(displayTemperature);
}
search("Lagos");
