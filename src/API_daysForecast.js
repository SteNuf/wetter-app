import { getThreeDaysFromNow } from "./utility";

//1. Loacal Storage erstellen:
const LOCAL_STORAGE_KEY = "threeDaysForecast";

let threeDaysForecastAPI = "";

//2. API getActuallyWeatherAPI() Verbindung erstellen:
export async function getThreeDaysForecastWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=cab870990fda438db75125235251909&q=${location}&days=3&lang=de`
  );

  const body = await response.json();
  threeDaysForecastAPI = body;

  console.log(threeDaysForecastAPI);

  const forecastDays = body.forecast.forecastday;
  const currentDayEpoch =
    body.current?.last_updated_epoch ?? body.location?.localtime_epoch;

  const daysForecast = getThreeDaysFromNow(forecastDays, currentDayEpoch);

  return {
    condition: forecastDays[0].day.condition.icon,
    maxTemp: forecastDays[0].day.maxtemp_c,
    minTemp: forecastDays[0].day.mintemp_c,
    daysForecast,
    currentDayEpoch,
    sunrise: forecastDays[0].astro.sunrise,
    sunset: forecastDays[0].astro.sunset,
  };
}

//3. API in Local Storage speichern
export function saveThreeDaysForecastToLocalStorage(saveDaysForecast) {
  const saveThreeDaysForecastData = threeDaysForecastAPI;
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(saveThreeDaysForecastData)
  );

  console.log(saveThreeDaysForecastData);
}

//4. API aus LocalStorage herausgeben:
export function getThreeDaysForecastFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    return [];
  }
}

//5. ab heute für drei Tage rendern
export function renderThreeDaysForecast(weatherThreeDaysForecast) {
  const container = document.querySelector(".forecast-days");

  const days = weatherThreeDaysForecast.daysForecast || [];

  days.forEach((dayData) => {
    const item = document.createElement("div");
    item.classList.add("forecast-three-day");

    item.innerHTML = `
  <div class="forecast-three-day__day">${dayData.label}</div>
  <div class="forecast-three-day__icon">
    <img  class="forecast-three-day__icon-pic" src="https:${dayData.icon}" alt="Wetter-Icon">
            <div class="forecast-three-day__max-temp">H:${dayData.maxTemp}°</div>
            <div class="forecast-three-day__min-temp">T:${dayData.minTemp}°</div>
            <div class="forecast-three-day__wind">Wind: ${dayData.wind}  km/h</div>
`;
    container.appendChild(item);
  });
}
