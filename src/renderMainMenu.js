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
  const cityListHtml = await getMainMenuCityListHtml();
  const inputElement = document.querySelector(".main-menu__search-input");

  rootElement.style.backgroundImage = "";
  rootElement.innerHTML = getMainMenuHtml() + cityListHtml;

  if (inputElement) {
    inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const location = inputElement.value.trim() || "Leipzig";
        renderLoadingScreen();
        await renderDetailView(location);
      }
    });
  } //else {
  //   console.warn("main-menu__search-input nicht gefunden.");
  // }
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
          <div class="city-wrapper__delete city-wrapper__delete--show " data-city-id="1"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

          </div>
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
  const inputElement = document.querySelector(".main-menu__search-input");
  const editButtonElement = document.querySelector(".main-menu__edit");

  if (editButtonElement) {
    editButtonElement.addEventListener("click", () => {
      // Toggle zwischen "Bearbeiten" und "Fertig"
      if (editButtonElement.textContent.trim() === "Bearbeiten") {
        editButtonElement.textContent = "Fertig";
        // Hier könntest du z. B. alle Lösch-Icons einblenden:
        document.querySelectorAll(".city-wrapper__delete").forEach((btn) => {
          btn.style.display = "block";
        });
      } else {
        editButtonElement.textContent = "Bearbeiten";
        // Und hier wieder ausblenden:
        document.querySelectorAll(".city-wrapper__delete").forEach((btn) => {
          btn.style.display = "none";
        });
      }
    });
  }

  // if (editButtonElement) {
  //   editButtonElement.addEventListener("click", () => {
  //     const isEditing = editButtonElement.textContent.trim() === "Berabeiten";
  //     editButtonElement.textContent = isEditing ? "Fertig" : "Bearbeiten";

  //     document.querySelectorAll(".city-wrapper__delete").forEach((btn) => {
  //       btn.style.display = isEditing ? "block" : "none";

  //       // Wenn wir jetzt in den Bearbeiten-Modus gehen,
  //       // registrieren wir den Klick fürs Löschen:
  //       if (isEditing) {
  //         btn.addEventListener("click", async (e) => {
  //           e.stopPropagation(); // verhindert, dass city-Click ausgelöst wird
  //           const cityElement = btn.closest(".city");
  //           const cityName = cityElement?.getAttribute("data-city-name");

  //           if (cityName) {
  //             // Stadt aus LocalStorage löschen:
  //             const stored =
  //               JSON.parse(localStorage.getItem("actually-weather")) || [];
  //             const updated = stored.filter((c) => c.name !== cityName);
  //             localStorage.setItem("actually-weather", JSON.stringify(updated));

  //             // Stadt aus DOM entfernen:
  //             btn.closest(".city-wrapper").remove();
  //           }
  //         });
  //       }
  //     });
  //   });
  // }

  console.log(cities);
  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityName = city.getAttribute("data-city-name");
      console.log(cityName);
      renderDetailView(cityName);
    });
  });

  inputElement.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const location = inputElement.value.trim() || "Leipzig";
      renderLoadingScreen();
      await renderDetailView(location);
    }
  });
}
