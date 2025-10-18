//Abrunden der Temperaturen
export function formatTemperature(temperatur) {
  return Math.floor(temperatur);
}

//die aktuelle Stunde als erstes zu sehen und dann die nächsten Stunden angezeigt

export function get24HoursForecastFromNow(forecast, lastUpdateEpoch) {
  const todaysForecast = forecast[0].hour;
  const tommorrowForecast = forecast[1].hour;

  const newForecast = [];

  const firstFutureTimeIndex = todaysForecast.findIndex(
    (hour) => hour.time_epoch > lastUpdateEpoch
  );

  for (let i = firstFutureTimeIndex - 1; i < todaysForecast.length; i++) {
    newForecast.push(tommorrowForecast[i]);
  }

  let tommorrowIndex = 0;
  while (newForecast.length < 24) {
    newForecast.push(tommorrowForecast[tommorrowIndex]);
    tommorrowIndex++;
  }
  return newForecast;
}

//  den aktuellen Tag als erstes bis zum dritten Tag anzeigen.

export function getThreeDaysFromNow(forecast, currentEpoch) {
  const newThreeDayForecast = forecast.map((day, index) => {
    const date = new Date(day.date_epoch * 1000);

    let label;
    if (index === 0) {
      label = "Heute";
    } else {
      label = date.toLocaleString("de-DE", { weekday: "short" });
    }
    return {
      label,
      icon: day.day.condition.icon,
      maxTemp: formatTemperature(day.day.maxtemp_c),
      minTemp: formatTemperature(day.day.mintemp_c),
      wind: day.day.maxwind_kph,
    };
  });
  return newThreeDayForecast;
}

export function convertTo24(timeString) {
  const time = new Date(`1970-01-01 ${timeString}`);
  return time.toLocaleTimeString("de-De", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
