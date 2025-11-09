import { renderLoadingScreen } from "./loadingScreen.js";
import { rootElement } from "./domElements.js";
import { renderDetailView } from "./renderDetailHtml.js";
import { getActuallyWeatherFromLocalStorage } from "./API_actuallyWeather.js";
import { getConditionImagePath } from "./schools_MVdSxpebVbCje6Sd8KoN_files_conditions.js";
import { searchCitiesAPI } from "./API_searchCity.js"; // bleibt importiert (externes Modul)

export function loadMainMenu() {
  rootElement.classList.remove("background-color");
  renderLoadingScreen("Lade Übersicht...");
}

// Startseite mit Input Eingabefeld
export async function loadMainHTML() {
  const cityListHtml = await getMainMenuCityListHtml();

  rootElement.style.backgroundImage = "";
  // setze erst das HTML, danach DOM-Querys ausführen
  rootElement.innerHTML = `<div class="main-menu">${getMainMenuHtml()} ${cityListHtml}</div>`;

  // Input-Event nach dem Einfügen des DOM registrieren
  const inputElement = document.querySelector(".main-menu__search-input");

  if (inputElement) {
    inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const location = inputElement.value.trim() || "Leipzig";
        renderLoadingScreen("Lade Wetterdaten...");
        await new Promise((resolve) => requestAnimationFrame(resolve, 500));
        await renderDetailView(location);
      }
    });
  }
}

export async function renderMainMenu() {
  rootElement.innerHTML = `
    <div class="main-menu">
      ${getMainMenuHtml()}
      ${await getMainMenuCityListHtml()}
    </div>
  `;

  rootElement.style.backgroundImage = "";

  // DOM ist gesetzt -> Eventlistener registrieren
  registerEventListeners();
  setUpSearchSuggestions();
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
          ${getMainMenuSearchResultsHtml()}    
       </div>
     `;
}

export function getMainMenuSearchResultsHtml() {
  // Platzhalter-HTML (wird zur Laufzeit überschrieben):
  return `
    <div class="main-menu__search-results main-menu__search-results--hidden"></div>
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
       <div class="city-wrapper__delete city-wrapper__delete--show" data-city-id="${cityWeather.id}"> 
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
       </div>

       <div class="city" data-city-id="${cityWeather.id}" style="background-image: url('${fullImagePath}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;">
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
     </div>
    `;
    cityElements.push(cityHtml);
  }

  return `<div class="main-menu__city-list">${cityElements.join("")}</div>`;
}

function registerEventListeners() {
  const cities = document.querySelectorAll(".city");
  const inputElement = document.querySelector(".main-menu__search-input");
  const editButtonElement = document.querySelector(".main-menu__edit");

  if (editButtonElement) {
    editButtonElement.addEventListener("click", () => {
      const isEditing = editButtonElement.textContent.trim() === "Bearbeiten";
      editButtonElement.textContent = isEditing ? "Fertig" : "Bearbeiten";

      document.querySelectorAll(".city-wrapper__delete").forEach((btn) => {
        btn.style.display = isEditing ? "block" : "none";
      });
    });
  }

  // Klick auf Stadt öffnet die Detailansicht:
  if (cities && cities.length > 0) {
    cities.forEach((city) => {
      city.addEventListener("click", () => {
        const cityId = city.getAttribute("data-city-id");
        if (cityId) {
          renderDetailView(cityId);
        } else {
          console.error("Fehler: Keine 'data-city-id' gefunden.");
        }
      });
    });
  }

  // Klick auf Enter im Suchfeld:
  if (inputElement) {
    inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const location = inputElement.value.trim() || "Leipzig";
        renderLoadingScreen();
        await renderDetailView(location);
      }
    });
  }

  // Klick auf den Löschbutton:
  document.querySelectorAll(".city-wrapper__delete").forEach((deletBtn) => {
    deletBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const cityWrapper = deletBtn.closest(".city-wrapper");
      const cityElement = cityWrapper.querySelector(".city");
      const cityIdString = cityElement
        ? cityElement.getAttribute("data-city-id")
        : null;

      console.log("Versuche Stadt mit ID zu löschen:", cityIdString);

      if (!cityIdString) {
        console.error(
          "Fehler: Konnte cityId nicht aus dem .city Element auslesen."
        );
        return;
      }

      //Localstorage aktualisieren:
      const savedCities =
        JSON.parse(localStorage.getItem("actually-weather")) || [];

      const cityIdNumber = Number(cityIdString);
      const updatedCities = savedCities.filter(
        (city) => city.id !== cityIdNumber
      );

      console.log("Local Storage nach Löschen:", updatedCities);

      localStorage.setItem("actually-weather", JSON.stringify(updatedCities));
      //DOM aktualisieren
      cityWrapper.remove();

      // Wenn keine Stadt mehr da ist, Hinweis anzeigen
      const listContainer = document.querySelector(".main-menu__city-list");
      if (!listContainer || listContainer.children.length === 0) {
        // const parent =
        //   listContainer?.parentElement ||
        //   document.querySelector(".main-menu__search-bar")?.parentElement;
        if (listContainer) {
          listContainer.innerHTML = `<div class="city__empty">Noch keine gespeicherten Städte.</div>`;
        }
      }
    });
  });
}

function setUpSearchSuggestions() {
  const inputElement = document.querySelector(".main-menu__search-input");
  const resultsContainer = document.querySelector(".main-menu__search-results");
  if (!inputElement || !resultsContainer) return;

  let debounceTimeOut;
  let lastResults = [];

  inputElement.addEventListener("input", () => {
    const query = inputElement.value.trim();

    // Vorschläge leeren, wenn weniger als zwei Zeichen:
    if (query.length < 2) {
      resultsContainer.classList.add("main-menu__search-results--hidden");
      resultsContainer.innerHTML = "";
      return;
    }

    clearTimeout(debounceTimeOut);
    debounceTimeOut = setTimeout(async () => {
      try {
        const results = await searchCitiesAPI(query);
        lastResults = results;
        renderSearchResults(results, resultsContainer, inputElement);
      } catch (error) {
        console.error("Fehler beim Laden der Städte:", error);
        resultsContainer.classList.add("main-menu__search-results--hidden");
      }
    }, 300);
  });

  //Fokus verliert -> Liste ausblenden:
  inputElement.addEventListener("blur", () => {
    setTimeout(() => {
      resultsContainer.classList.add("main-menu__search-results--hidden");
    }, 200);
  });

  //Klickt wieder ins Feld -> Liste erneut anzeigen:
  inputElement.addEventListener("focus", () => {
    const query = inputElement.value.trim();
    if (query.length >= 2 && lastResults.length > 0) {
      renderSearchResults(lastResults, resultsContainer, inputElement);
    }
  });

  // Wenn man aus dem Input klickt → Ergebnisse ausblenden:
  document.addEventListener("click", (e) => {
    if (!resultsContainer.contains(e.target) && e.target !== inputElement) {
      resultsContainer.classList.add("main-menu__search-results--hidden");
    }
  });
}

function renderSearchResults(results, container, inputElement) {
  if (!results || results.length === 0) {
    container.innerHTML = `<div class="search-result__empty">Keine Städte gefunden</div>`;
    container.classList.remove("main-menu__search-results--hidden");
    return;
  }

  container.innerHTML = results
    .map(
      (city) => `
      <div class="search-result" 
      data-id= "${city.id}"
      data-name="${city.name}"
      data-lat="${city.lat}" 
      data-lon="${city.lon}" 
      tabindex="0">
        <h3 class="search-result__name">${city.name}</h3>
        <p class="search-result__country">${city.country}${
        city.region ? " - " + city.region : ""
      }</p>
      </div>`
    )
    .join("");

  container.classList.remove("main-menu__search-results--hidden");

  // Klick auf Vorschlag
  container.querySelectorAll(".search-result").forEach((el) => {
    el.addEventListener("click", async () => {
      const cityId = el.getAttribute("data-id");
      const cityName = el.getAttribute("data-name");
      const lat = el.getAttribute("data-lat");
      const lon = el.getAttribute("data-lon");

      inputElement.value = cityName;
      container.classList.add("main-menu__search-results--hidden");

      renderLoadingScreen();
      await renderDetailView({ id: cityId, name: cityName, lat, lon });
    });
  });
}
