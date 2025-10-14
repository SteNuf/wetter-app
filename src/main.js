import {
  getWeatherAPI,
  saveWeatherToLocalStorage,
  getWeatherFromLocalStorage,
  renderWeatherText,
} from "./API_actuallyWeather";
import "../styles/main.scss";
import { renderLoadingScreen } from "./loadingScreen.js";
import {
  getTodayForecastWeather,
  renderHourlyForecast,
  renderTodayForecastWeather,
  saveTodayForecastToLocalStorage,
} from "./API_todayForecast.js";
import { loadDetailView } from "./renderMainHTML.js";

export const rootElement = document.getElementById("app");

let actuallyWeatherData = "";
let saveWeatherList = getWeatherFromLocalStorage();

renderLoadingScreen();
loadDetailView();
