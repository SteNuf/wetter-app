import { formatTemperature } from "./utility";

//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "today-forecast";

let weatherTodayForcastAPI = "";
let hoursForecastArray = [];

//2. API GetWeatherAPI() Verbindung erstellen:
export async function getTodayForecastWeather() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=cab870990fda438db75125235251909&q=Leipzig&lang=de"
  );
  const body = await response.json();
  weatherTodayForcastAPI = body;

  console.log(weatherTodayForcastAPI);
  const hourlyArray = weatherTodayForcastAPI.forecast.forecastday[0].hour;
  console.log(hourlyArray[9]);

  return {
    condition: body.forecast.forecastday[0].day.condition.text,
    wind: body.forecast.forecastday[0].day.maxwind_kph,
    hoursForecast: body.forecast.forecastday[0].hour,
  };
}
//3. API in LocalStorage speichern:
export function saveTodayForecastToLocalStorage(saveTodayForecast) {
  const saveTodayForecastData = weatherTodayForcastAPI;
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(saveTodayForecastData)
  );

  console.log(saveTodayForecastToLocalStorage);
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

  const hours = weatherTodayForecast.hoursForecast;

  const now = new Date().getHours();

  hours.forEach((hourData, index) => {
    const time = new Date(hourData.time);
    const hourLabel =
      index === now
        ? "Jetzt"
        : time.getHours().toString().padStart(2, "0") + " Uhr";

    const hourItem = document.createElement("div");
    hourItem.classList.add("hourItem");

    hourItem.innerHTML = `
     <div class="hour-time">${hourLabel}
     <img  class="hourly-forecast__icon" src="https:${
       hourData.condition.icon
     }" />
     <div class="hour-temp">${Math.round(hourData.temp_c)}°</div>
     `;
    container.appendChild(hourItem);
  });
}
