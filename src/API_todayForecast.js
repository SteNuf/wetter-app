import { formatTemperature, get24HoursForecastFromNow } from "./utility";

//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "today-forecast";
let weatherTodayForcastAPI = null;

//2. API getActuallyWeatherAPI() Verbindung erstellen:
export async function getTodayForecastWeather(location) {
  let apiQuery = location;
  let foundCity = null;

  if (!isNaN(parseInt(location)) && isFinite(location)) {
    const savedCities =
      JSON.parse(localStorage.getItem("actually-weather")) || [];
    const foundCity = savedCities.find((c) => c.id === Number(location));

    if (foundCity && foundCity.lat && foundCity.lon) {
      apiQuery = `${foundCity.lat},${foundCity.lon}`;
      console.log("Koordinaten für ID gefunden:", apiQuery);
    } else {
      console.warn(
        "Keine Stadt mit dieser ID im LocalStorage gefunden:",
        location
      );
      apiQuery = foundCity?.name || location;
      if (!isNaN(apiQuery)) apiQuery = "Leipzig";
    }
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cab870990fda438db75125235251909&q=${encodeURIComponent(
      apiQuery
    )}&days=3&lang=de`
  );
  //Fehlerprüfung:
  if (!response.ok) {
    const errorBody = await response.json();
    console.error("API-Fehler:", errorBody);
    throw new Error("Fehler beim Abrufen der Wetterdaten für: " + location);
  }
  const body = await response.json();
  weatherTodayForcastAPI = body;

  console.log(weatherTodayForcastAPI);

  const forecastDays = body.forecast.forecastday;
  const currentEpoch =
    body.current?.last_updated_epoch ?? body.location?.localtime_epoch;

  const hoursForecast = get24HoursForecastFromNow(forecastDays, currentEpoch);

  return {
    condition: forecastDays[0].day.condition.text,
    wind: forecastDays[0].day.maxwind_kph,
    hoursForecast,
    currentEpoch,
  };
}
//3. Vorhersage API in LocalStorage speichern:
export function saveTodayForecastToLocalStorage() {
  const saveTodayForecastData = weatherTodayForcastAPI;
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(saveTodayForecastData)
  );

  console.log(saveTodayForecastData);
}

//4. API aus LocalStorage herausgeben:
export function getTodayForecastFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    return [];
  }
}

//5. API in HTML rendern:
export function renderTodayForecastWeather(weatherTodayForecast) {
  document.querySelector(".today-forecast_condition").textContent =
    weatherTodayForecast.condition +
    ". Wind bis zu " +
    weatherTodayForecast.wind +
    " km/h";
}

// 6. ab jetzt stündliche Wettervorhersage in HTML Code rendern

export function renderHourlyForecast(weatherTodayForecast) {
  const container = document.querySelector(".today-forecast_hours");
  container.innerHTML = "";

  const hours = weatherTodayForecast.hoursForecast || [];
  const now = new Date();
  const nowHour = now.getHours();

  hours.forEach((hourData) => {
    if (!hourData) return;

    const time = new Date(hourData.time);
    const hour = time.getHours();

    const isNow = hour === nowHour;
    const hourLabel = isNow
      ? "Jetzt"
      : hour.toString().padStart(2, "0") + " Uhr"; //Hilfsfunktion auslagern

    const hourItem = document.createElement("div");
    hourItem.classList.add("hourItem");

    hourItem.innerHTML = `
     <div class="hour-time">${hourLabel}
     <img  class="hourly-forecast__icon" src="https:${
       hourData.condition.icon
     }" />
     <div class="hour-temp">${formatTemperature(hourData.temp_c)}°</div>
     `;
    container.appendChild(hourItem);
  });
}
