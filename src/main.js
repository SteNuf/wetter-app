import "../styles/main.scss";
import { getActuallyWeatherFromLocalStorage } from "./API_actuallyWeather";
import { renderLoadingScreen } from "./loadingScreen.js";

import { rootElement } from "./domElements.js";
import { loadMainHTML, renderMainMenu } from "./renderMainMenu.js";

renderLoadingScreen();
loadMainHTML();

//renderLoadingScreen();
//renderMainMenu();
//loadMainHTML();
