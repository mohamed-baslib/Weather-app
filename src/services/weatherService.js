export async function fetchWeather(city, signal, language) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8bda38366cb42fc5d2d90031e41f3733&units=metric&lang=${language}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  return res.json();
}

export const fetchWeatherByCoords = async (lat, lon, language) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8bda38366cb42fc5d2d90031e41f3733&units=metric&lang=${language}`
  );

  const data = await res.json();
  return data
};

// forecast
function getDailyForecast(list) {
  const daily = list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return daily;
}

export async function fetchForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=8bda38366cb42fc5d2d90031e41f3733`
  );

  const data = await res.json();

  return getDailyForecast(data.list);
}