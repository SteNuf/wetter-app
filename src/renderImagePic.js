import { getConditionImagePath } from "./schools_MVdSxpebVbCje6Sd8KoN_files_conditions";

export function getWeatherImagPic(weather) {
  if (!weather || !weather.pic) return;

  const currentHour = new Date().getHours();
  const isNight = currentHour >= 20 || currentHour < 6;

  const imagePath = getConditionImagePath(weather.pic, isNight);
  const fullImagePath = imagePath
    ? `/wetter-app/conditionImages/${imagePath}`
    : "./wetter-app/conditionImages/day/cloudy_day.jpg";

  c;

  const containers = [
    ".background-color",
    ".actually-weather",
    ".today-forecast",
    ".forecast",
    ".mini-stats",
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

  // const containerBackground = document.querySelector(".background-color");
  // const containerHeader = document.querySelector(".actually-weather");
  // const containerTodayForecast = document.querySelector(".today-forecast");
  // const containerThreeDaysForecast = document.querySelector(".forecast");
  // const containerMiniStats = document.querySelector(".mini-stats");
  // //const containerMiniStat = document.querySelector(".mini-stat");
  // containerBackground.style.backgroundImage =
  //   "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  // containerBackground.style.backgroundSize = "cover";
  // containerBackground.style.backgroundPosition = "center";
  // containerBackground.style.backgroundRepeat = "no-repeat";
  // containerHeader.style.backgroundImage =
  //   "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  // containerHeader.style.backgroundSize = "cover";
  // containerHeader.style.backgroundPosition = "center";
  // containerTodayForecast.style.backgroundImage =
  //   "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  // containerTodayForecast.style.backgroundSize = "cover";
  // containerTodayForecast.style.backgroundPosition = "center";
  // containerThreeDaysForecast.style.backgroundImage =
  //   "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  // containerThreeDaysForecast.style.backgroundSize = "cover";
  // containerThreeDaysForecast.style.backgroundPosition = "center";
  // containerMiniStats.style.backgroundImage =
  //   "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  // containerMiniStats.style.backgroundSize = "cover";
  // containerMiniStats.style.backgroundPosition = "center";
  // //containerMiniStat.style.backgroundImage =
  // ("url('./wetter-app/conditionImages/day/cloudy_day.jpg')");
  // containerMiniStat.style.backgroundSize = "cover";
  // containerMiniStat.style.backgroundPosition = "center";
}
