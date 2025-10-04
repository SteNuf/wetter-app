import {
  getWeatherAPI,
  saveWeatherToLocalStorage,
  getWeatherFromLocalStorage,
  renderWeatherText,
} from "./API_actuallyWeather";
import "../styles/main.scss";
//import { renderLoadingScreen } from "./loadingScreen.js";
import {
  getTodayForecastWeather,
  renderHourlyForecast,
  renderTodayForecastWeather,
  saveTodayForecastToLocalStorage,
} from "./API_todayForecast.js";

let actuallyWeatherData = "";
let saveWeatherList = getWeatherFromLocalStorage();

const testLoadButton = document.querySelector(".test-load-button");
const testSaveButton = document.querySelector(".test-save-button");

//Test Button zum Laden der API Daten
testLoadButton.addEventListener("click", async () => {
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

// Loading Bildschirm
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("app");

  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 1000);
});
