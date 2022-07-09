//Display weather description//

function displayWeatherCondition(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  mainTemperature = response.data.main.temp;
  document.querySelector("#main-temperature").innerHTML =
    Math.round(mainTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Search city //
function searchCity(city) {
  let apiKey = `6a0b4c54d0ac0f8372ec53375213a3c8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `6a0b4c54d0ac0f8372ec53375213a3c8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Change Celsius temperature current location//
function convertToCelsius(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#main-temperature");
  heading.innerHTML = `${temperature}`;
}

//change temperature to Farhenheit//
function convertToFahren(event) {
  event.preventDefault();
  let fahrenTemperature = document.querySelector("#main-temperature");
  // remove the active Celsius link when click on Farhenheit//
  celsiusLink.classList.remove("active");
  // add the active on Celsius //
  fahrenLink.classList.add("active");
  let fahrenTemperatureConvert = Math.round((mainTemperature * 9) / 5 + 32);
  fahrenTemperature.innerHTML = `${fahrenTemperatureConvert}`;
}

// Convert back to Celsius//
function convertBackToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenLink.classList.remove("active");
  let celsiusTemperature = Math.round(mainTemperature);
  let heading = document.querySelector("#main-temperature");
  heading.innerHTML = `${celsiusTemperature}`;
}

function retrievePosition(position) {
  console.log(position.coords.latitude);
  ("");
  let apiKey = `6a0b4c54d0ac0f8372ec53375213a3c8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(convertToCelsius);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

//let time//
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thur", "Frid", "Sat"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
            <div class="row weekDay">${day}</div>
            <div class="row row2">
              <img src="images/sun.png" id="icon" alt="">
            </div>
            <div class="row row3">21&deg;</div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// querySelector time //

let time = document.querySelector(".time");
time.innerHTML = `${hour}:${minute}`;

//querySelector day of week//

let dayOfWeek = document.querySelector(".dayOfWeek");
dayOfWeek.innerHTML = `${day}`;

// querySelector city //

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenLink = document.querySelector("#fahren-link");
fahrenLink.addEventListener("click", convertToFahren);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertBackToCelsius);

let mainTemperature = null;

searchCity("Tokyo");
