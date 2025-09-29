import { formatTemperature } from "./utility";

//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "wetter-app";

let weatherApi = "";

//2. API GetWeatherAPI() Verbindung erstellen:
export async function getWeatherAPI() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=cab870990fda438db75125235251909&q=Leipzig&lang=de"
  );
  const body = await response.json();
  weatherApi = body;

  return {
    name: body.location.name,
    temp: formatTemperature(body.current.temp_c),
    condition: body.current.condition.text,
    heatIndex: formatTemperature(body.current.heatindex_c),
    dewPoint: formatTemperature(body.current.dewpoint_c),
  };
}

//3. API in LocalStorage speichern
export function saveWeatherToLocalStorage() {
  const saveWeatherData = weatherApi;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveWeatherData));
}
//4. API aus LocalStorage herausgeben
export function getWeatherFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

//5. API in HTML rendern
export function renderWeatherText(weather) {
  document.querySelector(".actually-weather__town").textContent = weather.name;

  document.querySelector(".actually-weather__temperature").textContent =
    weather.temp + " °C";

  document.querySelector(".actually-weather__condition").textContent =
    weather.condition;

  document.querySelector(".actually-weather__max-temperatur").textContent =
    "H:" + weather.heatIndex + "°";

  document.querySelector(".actually-weather__min-temperatur").textContent =
    "T:" + weather.dewPoint + "°";
}
