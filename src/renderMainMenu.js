import { renderLoadingScreen } from "./loadingScreen.js";
import { rootElement } from "./domElements.js";
import { renderDetailView } from "./renderDetailHtml.js";
import { getActuallyWeatherFromLocalStorage } from "./API_actuallyWeather.js";
import { getConditionImagePath } from "./schools_MVdSxpebVbCje6Sd8KoN_files_conditions.js";

export function loadMainMenu() {
  rootElement.classList.remove("background-color");
  renderLoadingScreen("Lade Übersicht...");
}

// StartSeite mit Input Eingabefeld
export async function loadMainHTML() {
  rootElement.style.backgroundImage = "";

  const cityListHtml = await getMainMenuCityListHtml();
  rootElement.innerHTML = getMainMenuHtml() + cityListHtml;

  const inputElement = document.querySelector(".main-menu__search-input");

  if (inputElement) {
    inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const location = inputElement.value.trim() || "Leipzig";
        renderLoadingScreen();
        await renderDetailView(location);
      }
    });
  } else {
    console.warn("main-menu__search-input nicht gefunden.");
  }
}

export async function renderMainMenu() {
  rootElement.innerHTML = `
    
    <div class="main-menu">
    ${getMainMenuHtml()}
    ${await getMainMenuCityListHtml()} 
    </div>`;

  //register click event
  registerEventListeners();
}

export function getMainMenuHtml() {
  return `   
   
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
      
     `;
}

export async function getMainMenuCityListHtml() {
  const savedCityFromLocalStorage = getActuallyWeatherFromLocalStorage(); // gespeicherte Stadt holen
  const cityElements = [];

  //wenn keine gespeicherte Stadt => Hinweis anzeigen:
  if (!savedCityFromLocalStorage || savedCityFromLocalStorage.length === 0) {
    return `
    <div class="main-menu__city-list">
        <div class="city__empty">Noch keine gespeicherten Städte.</div>
      </div>
    `;
  }

  for (let cityWeather of savedCityFromLocalStorage) {
    const imagePath = getConditionImagePath(
      cityWeather.pic,
      cityWeather.isDay !== 1
    );

    const fullImagePath =
      imagePath || "./wetter-app/conditionImages/day/cloudy_day.jpg";

    const cityHtml = `
    
     <div class="city-wrapper">
          <div class="city-wrapper__delete city-wrapper__delete--show " data-city-id="1"></div>
          <div class="city" data-city-name="${cityWeather.name}" style="background-image: url('${fullImagePath}');
               background-size: cover;
               background-position: center;
               background-repeat: no-repeat;
             ">
            <div class="city__left-column">
              <h2 class="city__name">${cityWeather.name}</h2>
              <div class="city__country">${cityWeather.country}</div>
              <div class="city__condition">${cityWeather.condition}</div>
            </div>
            <div class="city__right-column">
              <div class="city__temperature">${cityWeather.temp}°</div>
              <div class="city__min-max-temperature">H:${cityWeather.heatIndex}° T:${cityWeather.dewPoint}°</div>
            </div>
          </div>  
    `;
    cityElements.push(cityHtml);
  }

  return `
  
  <div class="main-menu__city-list">${cityElements.join("")}</div>
  
  `;
}

function registerEventListeners() {
  const cities = document.querySelectorAll(".city");
  console.log(cities);
  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityName = city.getAttribute("data-city-name");
      console.log(cityName);
      renderDetailView(cityName);
    });
  });
  const inputElement = document.querySelector(".main-menu__search-input");

  inputElement.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const location = inputElement.value.trim() || "Leipzig";
      renderLoadingScreen();
      await renderDetailView(location);
    }
  });
}
