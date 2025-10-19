import { getConditionImagePath } from "./schools_MVdSxpebVbCje6Sd8KoN_files_conditions";

export function getWeatherImagPic() {
  const container = document.querySelector(".background-color");
  container.style.backgroundimage =
    "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";

  // const container = document.querySelector("#app");

  // const weatherImagePicElement = document.createElement("div");
  // weatherImagePicElement.classList.add("imag-weather-pic");

  // const imagePath = getConditionImagePath(weather.pic);

  // weatherImagePicElement.innerHTML = `
  //  <div class="background-pic"
  //  style=background-image: url("${imagePath}")
  //  )}
  // `;

  // container.appendChild(weatherImagePicElement);

  // console.log(weatherImagePicElement);
  // console.log("Wetterbild geladen:", imagePath);
}
