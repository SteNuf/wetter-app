import { renderLoadingScreen } from "./loadingScreen.js";
import { rootElement } from "./domElements.js";
import { renderDetailView } from "./renderDetailHtml.js";

export function loadMainMenu() {
  renderLoadingScreen("Lade Übersicht...");
}

// StartSeite mit Input Eingabefeld
export function loadMainHTML() {
  rootElement.innerHTML = getMainMenuHtml() + getMainMenuCityListHtml();

  const inputElement = document.querySelector(".main-menu__search-input");

  inputElement.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const location = inputElement.value.trim() || "Leipzig";
      renderLoadingScreen();
      await renderDetailView(location);
    }
  });
}

export function renderMainMenu() {
  rootElement.innerHTML = `
    
    <div class="main-menu">
    ${getMainMenuHtml()}
    ${getMainMenuCityListHtml()} 
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

export function getMainMenuCityListHtml() {
  const favoriteCities = ["Mannheim", "London", "Peking"];

  const favoritCityElements = [];

  for (let city of favoriteCities) {
    const cityHtml = `
    
     <div class="city-wrapper">
          <div class="city-wrapper__delete city-wrapper__delete--show " data-city-id="1"></div>
          <div class="city" data-city-name="${city}" style="background-image: url(&quot;/wetter-app/conditionImages/day/rain_day.jpg&quot;); background-size: cover; background-position: center center; background-repeat: no-repeat;">
            <div class="city__left-column">
              <h2 class="city__name">${city}</h2>
              <div class="city__country"></div>
              <div class="city__condition"></div>
            </div>
            <div class="city__right-column">
              <div class="city__temperature"></div>
              <div class="city__min-max-temperature">H:° T:°</div>
            </div>
          </div>  
    `;
    favoritCityElements.push(cityHtml);
  }

  const favoritCitiesHtml = favoritCityElements.join("");

  return `
  
  <div class="main-menu__city-list">${favoritCitiesHtml}</div>
  
  `;
}

function registerEventListeners() {
  const cities = document.querySelectorAll(".city");
  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityName = city.getAttribute("data-city-name");

      renderDetailView(cityName);
    });
  });
}
