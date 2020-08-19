// current date and time

function currentDateTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateTime = document.querySelector("h3");

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

  dateTime.innerHTML = `${day} </br> ${hours}:${minutes}`;
}

// search engine
function displayWeather(response) {
  document.querySelector(".high-temp-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low-temp-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".condition-description").innerHTML =
    response.data.weather[0].description;
}
function searchCity(city) {
  let apiKey = "6feaf6a8d604af91166c8484867322e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//geolocation
function searchLocation(position) {
  let apiKey = "6feaf6a8d604af91166c8484867322e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//current date and time of current location
currentDateTime();
//search engine
let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);
// geolocation
let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
//default location
searchCity("seville");
