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
  city.innerHTML = response.data.city;

  celunit = Math.round(response.data.temperature.current);

  let currentTemp = Math.round(response.data.temperature.current);
  let Temp = document.querySelector("#ctemp");
  Temp.innerHTML = currentTemp;

  let descrip = document.querySelector("#description");
  descrip.innerHTML = response.data.condition.description;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = response.data.temperature.humidity;

  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = response.data.wind.speed;

  let icon = document.querySelector(".img1");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function currentT(event) {
  event.preventDefault();

  let apiID = "cf2ff9ed45fc3b4odc651t03e545b4da";
  let cityInput = document.querySelector("#city-input");
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiID}&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}

let showTemp = document.querySelector("#search-button");
showTemp.addEventListener("click", currentT);

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
  let apiID = "cf2ff9ed45fc3b4odc651t03e545b4da";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiID}&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}
search("Lagos");
