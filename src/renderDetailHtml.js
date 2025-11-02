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
import {
  loadMainHTML,
  loadMainMenu,
  renderMainMenu,
} from "./renderMainMenu.js";

export async function renderDetailView(location) {
  rootElement.innerHTML =
    getNavBarHtml() +
    getHeaderHtml() +
    getHourlyForcastHtml() +
    getForecastDaysHtml() +
    getMiniStaticHtml();

  const navBarElement = document.querySelector(".navigation-bar__back-Button");
  navBarElement.addEventListener("click", () => {
    //loadMainMenu();
    loadMainHTML();
    renderMainMenu();
  });

  const saveButton = document.querySelector(".navigation-bar__favorite-Button");

  //Test Button zum speichern der Daten
  saveButton.addEventListener("click", async () => {
    saveButton.style.display = "none";
    console.log("Hallo");
    const saveActuallyWeather = saveActuallyWeatherToLocalStorage(); //await
    if (saveActuallyWeather) {
      renderWeatherText(saveActuallyWeather);
    }

    //const saveTodayForecast = await saveTodayForecastToLocalStorage();
    //const saveThreeDaysForecast = await saveThreeDaysForecastToLocalStorage();
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

function getNavBarHtml() {
  return ` 
    <div class="navigation-bar">       
        <div class="navigation-bar__back-Button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>        
        </div>

        <div class="navigation-bar__favorite-Button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" 
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </div>
     </div>
          
      `;
}

function getHeaderHtml() {
  return `    

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
