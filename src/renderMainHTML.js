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
import {
  getThreeDaysForecastWeather,
  renderThreeDaysForecast,
  saveThreeDaysForecastToLocalStorage,
} from "./API_daysForecast.js";

export function loadDetailView() {
  renderDetailView();
}

function renderDetailView() {
  rootElement.innerHTML =
    getHeaderHtml() + getHourlyForcast() + getForecastDays() + getMiniStatic();

  const testLoadButton = document.querySelector(".test-load-button");
  const testSaveButton = document.querySelector(".test-save-button");

  // //Test Button zum Laden der API Daten
  testLoadButton.addEventListener("click", async () => {
    loadDetailView();
    const weather = await getWeatherAPI();
    const weatherTodayForecast = await getTodayForecastWeather();
    const weatherThreeDaysForecast = await getThreeDaysForecastWeather();
    renderWeatherText(weather);
    renderTodayForecastWeather(weatherTodayForecast);
    renderHourlyForecast(weatherTodayForecast);
    renderThreeDaysForecast(weatherThreeDaysForecast);
  });

  //Test Button zum speichern der Daten
  testSaveButton.addEventListener("click", async () => {
    const saveWeather = await saveWeatherToLocalStorage();
    if (saveWeather) {
      renderWeatherText(saveWeather);
    }
    const saveTodayForecast = await saveTodayForecastToLocalStorage();
    const saveThreeDaysForecast = await saveThreeDaysForecastToLocalStorage();
  });
}

function getHeaderHtml() {
  return `

      <div class="navigation-bar">
        Navigation Bar
        <div class="navigation-bar__back-Button">Back</div>
        <div class="navigation-bar__favorite-Button">Favourit</div>
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
      <div class="mini-stats">  

      <div class="mini-stat"> 
        <div class="mini-stat__heading">Feuchtigkeit:</div>
        <div class="mini-stat__value">70%</div>  
      </div>

      <div class="mini-stat"> 
        <div class="mini-stat__heading">Gefühlt:</div>
        <div class="mini-stat__value">10°</div>  
      </div>

     <div class="mini-stat"> 
        <div class="mini-stat__heading">Sonnenaufgang:</div>
        <div class="mini-stat__value">07:00 Uhr</div>  
      </div>

      <div class="mini-stat"> 
        <div class="mini-stat__heading">Sonnenuntergang:</div>
        <div class="mini-stat__value">19:30 Uhr</div>  
      </div>

    <div class="mini-stat"> 
        <div class="mini-stat__heading">Niederschlag:</div>
        <div class="mini-stat__value">mm</div>  
    </div>
    
      <div class="mini-stat"> 
        <div class="mini-stat__heading">UV-Index:</div>
        <div class="mini-stat__value">1.9</div>  
      </div>

    
    
    </div>
  `;
}
