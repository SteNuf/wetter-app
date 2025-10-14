import { rootElement } from "./main";
import {
  getWeatherAPI,
  saveWeatherToLocalStorage,
  getWeatherFromLocalStorage,
  renderWeatherText,
} from "./API_actuallyWeather";

import {
  getTodayForecastWeather,
  renderHourlyForecast,
  renderTodayForecastWeather,
  saveTodayForecastToLocalStorage,
} from "./API_todayForecast.js";

export function loadDetailView() {
  renderDetailView();
}

function renderDetailView() {
  rootElement.innerHTML = getHeaderHtml() + getHourlyForcast();

  const testLoadButton = document.querySelector(".test-load-button");
  const testSaveButton = document.querySelector(".test-save-button");

  // //Test Button zum Laden der API Daten
  testLoadButton.addEventListener("click", async () => {
    loadDetailView();
    const weather = await getWeatherAPI();
    const weatherTodayForecast = await getTodayForecastWeather();
    renderWeatherText(weather);
    renderTodayForecastWeather(weatherTodayForecast);
    renderHourlyForecast(weatherTodayForecast);
  });

  //Test Button zum speichern der Daten
  testSaveButton.addEventListener("click", async () => {
    const saveWeather = await saveWeatherToLocalStorage();
    if (saveWeather) {
      renderWeatherText(saveWeather);
    }
    const saveTodayForecast = await saveTodayForecastToLocalStorage();
  });
}

function getHeaderHtml() {
  return `

      <div class="navigation-bar">
        Navigation Bar
        <div class="navigation-bar__back-Button">Back</div>
        <div class="navigation-bar__favorite-Button">Favorit</div>
      </div>

  
      <button class="test-load-button">Laden</button>
      <button class="test-save-button">Save</button>
    
     <div class="actually-weather">
        <div class="actually-weather__town"></div>
        <div class="actually-weather__temperature"></div>
        <div class="actually-weather__condition"></div>
        <div class="actually-weather__day">
          <span class="actually-weather__max-temperatur"></span>
          <span class="actually-weather__min-temperatur"></span>
        </div>
      </div>
    
    `;
}

function getHourlyForcast() {
  return `
   <div class="today-forecast">
        <div class="today-forecast_condition"></div>
        <div class="today-forecast_hours"></div>
    </div>
    `;
}
