function displayWeather(response) {
  let displayedCity = document.querySelector("#displayed-city");
  let dayAndTime = document.querySelector("#time");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let temperature = document.querySelector("#temperature");

  let date = new Date(response.data.time * 1000);

  let weatherIcon = document.querySelector("#weather-icon");

  displayedCity.innerHTML = response.data.city;
  dayAndTime.innerHTML = `${displayDate(date)}, `;
  weatherCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"></img>`;
}

function displayDate(date) {
  let minute = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minute}`;
}

function searchCity(city) {
  let apiKey = "fc07ae9o4bd8db7562f510t9323275bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCity(event) {
  event.preventDefault();
  let searchInputSpace = document.querySelector("#search-input-space");
  searchCity(searchInputSpace.value);
}

function displayForecast() {
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  days.forEach(function (day) {
    let forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-per-day">
    <div class="weather-forecast-day">${day}</div>
    <div><img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
    alt="" width="42px"></div>
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">18°</span>
    <span class="weather-forecast-temperature-min">12°</span>
    </div>
    </div>
    `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
displayForecast();
