//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "today-forecast";

let weatherTodayForcastAPI = "";

//2. API GetWeatherAPI() Verbindung erstellen:
export async function getTodayForecastWeather() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=cab870990fda438db75125235251909&q=Leipzig&lang=de"
  );
  const body = await response.json();
  weatherTodayForcastAPI = body;

  console.log(body);

  return {
    condition: body.forecast.forecastday[0].day.condition.text,
    wind: body.forecast.forecastday[0].day.maxwind_kph,
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
