function currentDate(date) {
  let now = new Date();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saterday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];
  let currentDate = now.getDate();
  let year = now.getFullYear();

  return `${day}, ${month} ${currentDate}, ${year} ${hour}:${minute}`;
}
let h6 = document.querySelector("h6");
let currentTime = new Date();
h6.innerHTML = currentDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#floatingInput");
  let cityName = cityInput.value;
  cityElement.innerHTML = cityInput.value;

  let apiKey = "05a03039293f2ba6cca771310d6d32ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temp}°C`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels");
  let feels = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like: ${feels}°C`;

  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humid}%`;

  let wind = document.querySelector("#wind");
  let windSpeed = Math.round((response.data.wind.speed * 18) / 5);
  wind.innerHTML = `Wind: ${windSpeed}km/h`;
}

function findLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "05a03039293f2ba6cca771310d6d32ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(findLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
