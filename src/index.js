function displayWeather(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = response.data.city;

  console.log(response.data);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
