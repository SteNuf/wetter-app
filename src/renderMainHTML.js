import {
  getActuallyWeatherAPI,
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
import {
  getThreeDaysForecastWeather,
  renderThreeDaysForecast,
  saveThreeDaysForecastToLocalStorage,
} from "./API_daysForecast.js";
import { renderMiniStatic } from "./API_miniStatic.js";
import { getWeatherImagPic } from "./renderImagePic.js";
import { renderLoadingScreen } from "./loadingScreen.js";
import { rootElement } from "./domElements.js";

// StartSeite mit Input Eingabefeld
export function loadMainHTML() {
  rootElement.innerHTML = getMainMenuHtml() + getMainMenuCityList();

  const inputElement = document.querySelector(".main-menu__search-input");

  inputElement.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const location = inputElement.value.trim() || "Leipzig";
      renderLoadingScreen();
      await renderDetailView(location);
    }
  });
}

async function renderDetailView(location) {
  rootElement.innerHTML =
    getHeaderHtml() + getHourlyForcast() + getForecastDays() + getMiniStatic();

  const testSaveButton = document.querySelector(".test-save-button");

  //Test Button zum speichern der Daten
  testSaveButton.addEventListener("click", async () => {
    const saveWeather = await saveWeatherToLocalStorage();
    if (saveWeather) {
      renderWeatherText(saveWeather);
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

function getMainMenuHtml() {
  return ` 
  
    <div class="main-menu">
       <div class="main-menu__heading">Wetter
        <button class="main-menu__edit">Bearbeiten</button>
       </div>
       <div class="main-menu__search-bar">
          <input
            type="text"
            class="main-menu__search-input"
            placeholder="Nach Stadt suchen..."
          />
            <div
            class="main-menu__search-results main-menu__search-results--hidden"
            ></div>
        </div>
        Noch keine Faroriten gespeichert.
     </div>`;
}

function getMainMenuCityList() {
  return `
  
  <div class="main-menu__city-list">
        <div class="city-wrapper">
          <div class="city-wrapper__delete" data-city-id="1"></div>
          <div class="city" data-city-name="2">
            <div class="city-left-colum">
              <h2 class="city__name">Berlin</h2>
              <div class="city__country">Germany</div>
              <div class="city__condition">Regen</div>
            </div>
            <div class="city-right-colum">
              <div class="city__temperature">11°</div>
              <div class="city__min-max-temperature">H:11 T:5°</div>
            </div>
          </div>
        </div>
      </div>
  
  
  
  
  `;
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

function getHourlyForcast() {
  return `
   <div class="today-forecast">
        <div class="today-forecast_condition"></div>
        <div class="today-forecast_hours"></div>
    </div>
    `;
}

function getForecastDays() {
  return `
  
   <div class="forecast">
       <div class="forecast__text">Vorhersage für die nächsten 3 Tage:</div>
        <div class="forecast-days"></div>
      </div>
   
  `;
}

function getMiniStatic() {
  return `
      <div class="mini-stats"></div>
 `;
}
