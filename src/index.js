function searchCity(event) {
  event.preventDefault();
  let searchInputSpace = document.querySelector("#search-input-space");
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = searchInputSpace.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
