import { formatTemperature } from "./utility";

//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "actually-weather";
let weatherApi = null;

//2. API getActuallyWeatherAPI() Verbindung erstellen:
export async function getActuallyWeatherAPI(location) {
  let apiQuery = location;
  let foundCity = null;

  if (!isNaN(parseInt(location)) && isFinite(location)) {
    const savedCities =
      JSON.parse(localStorage.getItem("actually-weather")) || [];

    foundCity = savedCities.find((c) => c.id === Number(location));

    if (foundCity && foundCity.lat && foundCity.lon) {
      apiQuery = `${foundCity.lat},${foundCity.lon}`;
      console.log("Koordinaten für ID gefunden:", apiQuery);
    } else {
      console.warn(
        "Keine Stadt mit dieser ID im LocalStorage gefunden:",
        location
      );
      apiQuery = foundCity?.name || location;
      if (!isNaN(apiQuery)) {
        // wenn immer noch nur Zahl, nimm einen Standardwert
        apiQuery = "Leipzig";
      }
    }
  }

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=cab870990fda438db75125235251909&q=${encodeURIComponent(
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

  const simplyfiedWeather = {
    id: body.location.id || Date.now(),
    name: body.location.name,
    temp: formatTemperature(body.current.temp_c),
    lat: body.location.lat,
    lon: body.location.lon,
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

  return simplyfiedWeather;
}

//3. API in LocalStorage speichern:
export function saveActuallyWeatherToLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const newWeatherData = weatherApi;

  //Prüfen ob Stadt schon existiert.
  const existingIndex = storedData.findIndex(
    (item) => item.id === newWeatherData.id
  );
  if (existingIndex === -1) {
    // 2. Wenn die Stadt NICHT existiert (Index ist -1), DANN wird sie hinzugefügt.
    storedData.push(newWeatherData);
    console.log("Neue Stadt hinzugefügt:", newWeatherData.name);
  } else {
    // 3. Wenn die Stadt existiert, tun wir nichts.
    // Falls du die vorhandene Stadt doch aktualisieren willst, siehe Alternative 2 unten.
    console.log(
      "Stadt ist bereits gespeichert. Es wird keine neue hinzugefügt oder überschrieben."
    );
  }

  // Speichere die aktualisierte (oder unveränderte) Liste zurück.
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
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
