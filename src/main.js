import {
  getWeatherAPI,
  saveWeatherToLocalStorage,
  getWeatherFromLocalStorage,
  renderWeatherText,
} from "./fetch.js";
import "../styles/main.scss";

let actuallyWeatherData = "";
let saveWeatherList = getWeatherFromLocalStorage();

const testLoadButton = document.querySelector(".test-load-button");
const testSaveButton = document.querySelector(".test-save-button");

testLoadButton.addEventListener("click", async () => {
  const weather = await getWeatherAPI();
  renderWeatherText(weather);
});

testSaveButton.addEventListener("click", async () => {
  const saveWeather = await saveWeatherToLocalStorage();
  if (saveWeather) {
    renderWeatherText(saveWeather);
  }
});

// Loading Bildschirm
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("app");

  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 1000);
});
