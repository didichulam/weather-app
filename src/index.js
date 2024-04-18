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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day.getDay()];
}

function getForecast(city) {
  let apiKey = "fc07ae9o4bd8db7562f510t9323275bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-per-day">
          <div class="weather-forecast-day">${formatDay(day.time)}</div>
          <div><img src="${day.condition.icon_url}" class=weather-icon></div>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              day.temperature.maximum
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

searchCity("Birmingham");
