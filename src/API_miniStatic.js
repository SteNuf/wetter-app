import { convertTo24 } from "./utility";

export function renderMiniStatic(weather, weatherThreeDaysForecast) {
  const container = document.querySelector(".mini-stats");

  const miniStatElement = document.createElement("div");
  miniStatElement.classList.add("mini-stat");

  const miniStatFeelElement = document.createElement("div");
  miniStatFeelElement.classList.add("mini-stat");

  const miniStatSunsetElement = document.createElement("div");
  miniStatSunsetElement.classList.add("mini-stat");

  const miniStatSunriseElement = document.createElement("div");
  miniStatSunriseElement.classList.add("mini-stat");

  const miniStatPrecipElement = document.createElement("div");
  miniStatPrecipElement.classList.add("mini-stat");

  const miniStatUvElement = document.createElement("div");
  miniStatUvElement.classList.add("mini-stat");

  miniStatElement.innerHTML = `
  
        <div class="mini-stat__heading">Feuchtigkeit:</div>
        <div class="mini-stat__value">${weather.humidity}%</div>`;

  miniStatFeelElement.innerHTML = `
  
        <div class="mini-stat__heading">Gefühlt:</div>
        <div class="mini-stat__value">${weather.feel}°</div>`;

  miniStatSunriseElement.innerHTML = `
 
        <div class="mini-stat__heading">Sonnenaufgang:</div>
        <div class="mini-stat__value">${convertTo24(
          weatherThreeDaysForecast.sunrise
        )} Uhr</div>`;

  miniStatSunsetElement.innerHTML = `
 
        <div class="mini-stat__heading">Sonnenuntergang:</div>
        <div class="mini-stat__value">${convertTo24(
          weatherThreeDaysForecast.sunset
        )} Uhr</div>`;

  miniStatPrecipElement.innerHTML = `
  
        <div class="mini-stat__heading">Niederschlag:</div>
        <div class="mini-stat__value">${weather.precip}mm </div>
  `;

  miniStatUvElement.innerHTML = `

        <div class="mini-stat__heading">UV-Index:</div>
        <div class="mini-stat__value">${weather.uv}</div>

`;

  container.appendChild(miniStatElement);
  container.appendChild(miniStatFeelElement);

  container.appendChild(miniStatSunriseElement);
  container.appendChild(miniStatSunsetElement);

  container.appendChild(miniStatPrecipElement);
  container.appendChild(miniStatUvElement);
}
