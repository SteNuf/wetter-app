//1. Loacal Storage erstellen:
const LOCAL_STORAGE_KEY = "threeDaysForecast";

let threeDaysForecastAPI = "";

//2. API GetWeatherAPI() Verbindung erstellen:
export async function getThreeDaysForecastWeather() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=cab870990fda438db75125235251909&q=Leipzig&days=3&lang=de"
  );

  const body = await response.json();
  threeDaysForecastAPI = body;

  console.log(threeDaysForecastAPI);

  const forecastDays = body.forecast.forecastday;

  return {
    condition: forecastDays[0].day.condition.icon,
    maxTemp: forecastDays[0].day.maxtemp_c,
    minTemp: forecastDays[0].day.mintemp_c,
    wind: forecastDays[0].day.maxwind_kph,
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

  const iconItem = document.createElement("div");
  iconItem.classList.add("forecast-three-day");

  iconItem.innerHTML = `
<div class="forecast-three-day__icon">
<img src="https:${weatherThreeDaysForecast.condition}" alt="Wetter-Icon">
            <div class="forecast-three-day__max-temp">H:${weatherThreeDaysForecast.maxTemp}</div>
            <div class="forecast-three-day__min-temp">T:${weatherThreeDaysForecast.minTemp}</div>
            <div class="forecast-three-day__wind">Wind: ${weatherThreeDaysForecast.wind} km/h</div>
`;
  container.appendChild(iconItem);
}
