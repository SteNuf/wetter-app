import { getConditionImagePath } from "./schools_MVdSxpebVbCje6Sd8KoN_files_conditions";

export function getWeatherImagPic() {
  const containerBackground = document.querySelector(".background-color");
  const containerHeader = document.querySelector(".actually-weather");
  const containerTodayForecast = document.querySelector(".today-forecast");
  const containerThreeDaysForecast = document.querySelector(".forecast");
  const containerMiniStats = document.querySelector(".mini-stats");
  //const containerMiniStat = document.querySelector(".mini-stat");

  containerBackground.style.backgroundImage =
    "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  containerBackground.style.backgroundSize = "cover";
  containerBackground.style.backgroundPosition = "center";
  containerBackground.style.backgroundRepeat = "no-repeat";

  containerHeader.style.backgroundImage =
    "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  containerHeader.style.backgroundSize = "cover";
  containerHeader.style.backgroundPosition = "center";

  containerTodayForecast.style.backgroundImage =
    "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  containerTodayForecast.style.backgroundSize = "cover";
  containerTodayForecast.style.backgroundPosition = "center";

  containerThreeDaysForecast.style.backgroundImage =
    "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  containerThreeDaysForecast.style.backgroundSize = "cover";
  containerThreeDaysForecast.style.backgroundPosition = "center";

  containerMiniStats.style.backgroundImage =
    "url('./wetter-app/conditionImages/day/cloudy_day.jpg')";
  containerMiniStats.style.backgroundSize = "cover";
  containerMiniStats.style.backgroundPosition = "center";

  //containerMiniStat.style.backgroundImage =
  ("url('./wetter-app/conditionImages/day/cloudy_day.jpg')");
  containerMiniStat.style.backgroundSize = "cover";
  containerMiniStat.style.backgroundPosition = "center";
}
