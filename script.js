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

//Temp to Fahrenheit
function changeUnitF(event) {
  event.preventDefault();
  let far = 77;
  let currentemp = document.querySelector(".temperature");
  currentemp.innerHTML = far;
}

let convertFar = document.querySelector("#far-unit");
convertFar.addEventListener("click", changeUnitF);

//Temp to Celsius
function changeUnitC(event) {
  event.preventDefault();
  let celunit = 25;
  let cel = document.querySelector(".temperature");
  cel.innerHTML = celunit;
}

let convertCel = document.querySelector("#celsius-unit");
convertCel.addEventListener("click", changeUnitC);

//Display live Weather feed when city search is submitted via API
function currentT(event) {
  event.preventDefault();

  let apiID = "58a6775f97527351bf6c6966e209be39";
  let cityInput = document.querySelector("#city-input");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiID}`;

  function displayTemperature(response) {
    let cityInput = document.querySelector("#city-input");
    if (cityInput.value.length > 0) {
      let city = document.querySelector("h1");
      city.innerHTML = response.data.name;
    }

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

    function displayTemperature(response) {
      let city = response.data.name;
      let cityName = document.querySelector("h1");
      cityName.innerHTML = city;

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
    axios.get(apiURL).then(displayTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let showLocation = document.querySelector("#current-location");
showLocation.addEventListener("click", currentLoc);

//Setting a deafult city displaying live weather feed on load
function search(city) {
  let apiID = "58a6775f97527351bf6c6966e209be39";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;

  function displayTemperature(response) {
    let city = document.querySelector("h1");
    city.innerHTML = response.data.name;

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

  axios.get(apiURL).then(displayTemperature);
}
search("Lagos");
