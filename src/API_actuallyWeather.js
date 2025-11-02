import { formatTemperature } from "./utility";

//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "actually-weather";

let weatherApi = null;

//2. API getActuallyWeatherAPI() Verbindung erstellen:
export async function getActuallyWeatherAPI(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=cab870990fda438db75125235251909&q=${location}&days=3&lang=de`
  );
  const body = await response.json();
  //weatherApi = body;

  console.log(body);

  const simplyfiedWeather = {
    name: body.location.name,
    temp: formatTemperature(body.current.temp_c),
    condition: body.current.condition.text,
    heatIndex: formatTemperature(body.current.heatindex_c),
    dewPoint: formatTemperature(body.current.dewpoint_c),
    humidity: body.current.humidity,
    feel: body.current.feelslike_c,
    precip: body.current.precip_mm,
    uv: body.current.uv,
    pic: body.current.condition.code,
    isDay: body.current.is_day,
    country: body.location.country,
  };

  weatherApi = simplyfiedWeather;
  console.log("API Response gespeichert:", simplyfiedWeather);
  return simplyfiedWeather;
}

//3. API in LocalStorage speichern:
export function saveActuallyWeatherToLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const saveActuallyWeatherData = Array.isArray(storedData) ? storedData : [];
  const newWeatherData = weatherApi;

  //Prüfen ob Stadt schon existiert.
  const existingActuallyWeatherData = saveActuallyWeatherData.findIndex(
    (item) =>
      item.name === newWeatherData.location?.name ||
      item.name === newWeatherData.name
  );
  if (existingActuallyWeatherData !== -1) {
    // Bestehenden Eintrag aktualisieren:
    saveActuallyWeatherData[existingActuallyWeatherData] = newWeatherData;
  } else {
    //neue Stadt hinzufügen:
    saveActuallyWeatherData.push(newWeatherData);
  }
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(saveActuallyWeatherData)
  );
}

//4. API aus LocalStorage herausgeben:
export function getActuallyWeatherFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    return [];
  }

  const parsed = JSON.parse(data);
  //Gibt ein Array zurück
  return Array.isArray(parsed) ? parsed : [parsed];
}

//5. API in HTML rendern:
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
