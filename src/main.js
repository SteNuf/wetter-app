import { getWeatherAPI } from "./fetch.js";
import "../styles/main.scss";

const testButtonElement = document.querySelector(".test-button");
testButtonElement.addEventListener("click", async () => {
  const weatherTest = await getWeatherAPI();
});
