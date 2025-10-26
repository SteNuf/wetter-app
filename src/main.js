import "../styles/main.scss";
import { getWeatherFromLocalStorage } from "./API_actuallyWeather";
import { renderLoadingScreen } from "./loadingScreen.js";
import { loadMainHTML } from "./renderMainHTML.js";
import { rootElement } from "./domElements.js";

let actuallyWeatherData = "";
let saveWeatherList = getWeatherFromLocalStorage();

renderLoadingScreen();
loadMainHTML();
