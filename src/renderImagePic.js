import { getConditionImagePath } from "./schools_MVdSxpebVbCje6Sd8KoN_files_conditions";

export function getWeatherImagPic(weather) {
  if (!weather || !weather.pic) return;

  //const currentHour = new Date().getHours();
  // const isNight = currentHour >= 18 || currentHour < 6;

  const imagePath = getConditionImagePath(weather.pic, weather.isDay !== 1);
  const fullImagePath = imagePath
    ? imagePath
    : "./wetter-app/conditionImages/day/cloudy_day.jpg";

  const containers = [
    ".background-color",
    //".actually-weather",
    //".today-forecast",
    //".forecast",
    //".mini-stats",
  ];

  containers.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.backgroundImage = `url('${fullImagePath}')`;
      element.style.backgroundSize = "cover";
      element.style.backgroundPosition = "center";
      element.style.backgroundRepeat = "no-repeat";
    }
  });
}
