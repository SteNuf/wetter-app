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
