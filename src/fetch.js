//1. Local Storage erstellen:
const LOCAL_STORAGE_KEY = "weather-app";
//console.log(LOCAL_STORAGE_KEY);

//2. API GetWeatherAPI() Verbindung erstellen:
export async function getWeatherAPI() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=cab870990fda438db75125235251909&q=Leipzig&lang=de"
  );
  const body = await response.json();

  console.log(body);
}
//3. API in LocalStorage speichern
//4. API aus LocalStorage herausgeben
//5. API in HTML rendern
