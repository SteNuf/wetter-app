import {
  getActuallyWeatherAPI,
  saveActuallyWeatherToLocalStorage,
  getActuallyWeatherFromLocalStorage,
  renderWeatherText,
} from "./API_actuallyWeather.js";

import {
  getTodayForecastWeather,
  renderHourlyForecast,
  renderTodayForecastWeather,
  saveTodayForecastToLocalStorage,
} from "./API_todayForecast.js";
import {
  getThreeDaysForecastWeather,
  renderThreeDaysForecast,
  saveThreeDaysForecastToLocalStorage,
} from "./API_daysForecast.js";
import { renderMiniStatic } from "./API_miniStatic.js";
import { getWeatherImagPic } from "./renderImagePic.js";
import { renderLoadingScreen } from "./loadingScreen.js";
import { rootElement } from "./domElements.js";

export async function renderDetailView(location) {
  rootElement.innerHTML =
    getHeaderHtml() +
    getHourlyForcastHtml() +
    getForecastDaysHtml() +
    getMiniStaticHtml();

  const testSaveButton = document.querySelector(".test-save-button");

  //Test Button zum speichern der Daten
  testSaveButton.addEventListener("click", async () => {
    const saveActuallyWeather = await saveActuallyWeatherToLocalStorage();
    if (saveActuallyWeather) {
      renderWeatherText(saveActuallyWeather);
    }
    const saveTodayForecast = await saveTodayForecastToLocalStorage();
    const saveThreeDaysForecast = await saveThreeDaysForecastToLocalStorage();
  });

  const weather = await getActuallyWeatherAPI(location);
  const weatherTodayForecast = await getTodayForecastWeather(location);
  const weatherThreeDaysForecast = await getThreeDaysForecastWeather(location);

  renderWeatherText(weather);
  renderHourlyForecast(weatherTodayForecast);
  renderTodayForecastWeather(weatherTodayForecast);
  renderThreeDaysForecast(weatherThreeDaysForecast);
  renderMiniStatic(weather, weatherThreeDaysForecast);
  getWeatherImagPic(weather);
}

function getHeaderHtml() {
  return `

      <div class="navigation-bar">
        Navigation Bar
        <div class="navigation-bar__back-Button">Back</div>
        <div class="navigation-bar__favorite-Button">Favourit</div>
      </div>

  
      
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

function getHourlyForcastHtml() {
  return `
   <div class="today-forecast">
        <div class="today-forecast_condition"></div>
        <div class="today-forecast_hours"></div>
    </div>
    `;
}

function getForecastDaysHtml() {
  return `
  
   <div class="forecast">
       <div class="forecast__text">Vorhersage für die nächsten 3 Tage:</div>
        <div class="forecast-days"></div>
      </div>
   
  `;
}

function getMiniStaticHtml() {
  return `
      <div class="mini-stats"></div>
 `;
}
