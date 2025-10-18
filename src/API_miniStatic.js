import { getWeatherAPI } from "./API_actuallyWeather";

export function renderMiniStatic(weather, weatherThreeDaysForecast) {
  const container = document.querySelector(".mini-stats");

  const miniStatElement = document.createElement("div");
  miniStatElement.classList.add("mini-stat");

  miniStatElement.innerHTML = `
  
        <div class="mini-stat__heading">Feuchtigkeit:</div>
        <div class="mini-stat__value">${weather.humidity}%</div>`;

  const miniStatFeelElement = document.createElement("div");
  miniStatFeelElement.classList.add("mini-stat");

  miniStatFeelElement.innerHTML = `
  
        <div class="mini-stat__heading">Gefühlt:</div>
        <div class="mini-stat__value">${weather.feel}°</div>`;

  const miniStatPrecipElement = document.createElement("div");
  miniStatPrecipElement.classList.add("mini-stat");

  miniStatPrecipElement.innerHTML = `
  
        <div class="mini-stat__heading">Niederschlag:</div>
        <div class="mini-stat__value">${weather.precip}mm </div>
  `;

  const miniStatUvElement = document.createElement("div");
  miniStatUvElement.classList.add("mini-stat");

  miniStatUvElement.innerHTML = `

        <div class="mini-stat__heading">UV-Index:</div>
        <div class="mini-stat__value">${weather.uv}</div>

`;

  container.appendChild(miniStatElement);
  container.appendChild(miniStatFeelElement);
  container.appendChild(miniStatPrecipElement);
  container.appendChild(miniStatUvElement);
}
