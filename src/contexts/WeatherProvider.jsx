import { useState } from "react";
import { WeatherContext } from "./WeatherContext";

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");

  const getWeatherIcon = (temp) => {
    if (temp <= 0) {
      return "https://img.icons8.com/3d-fluency/94/snow-storm.png"; // ثلج
    } else if (temp <= 20) {
      return "https://img.icons8.com/3d-fluency/94/snow.png"; // بارد
    } else if (temp <= 30) {
      return "https://img.icons8.com/3d-fluency/94/partly-cloudy-day.png"; // معتدل
    } else if (temp > 30) {
      return "https://img.icons8.com/3d-fluency/94/sun.png"; // حار
    } else {
      return "https://img.icons8.com/3d-fluency/94/cloud-sync.png";
    }
  };

//   const getWeatherIcon = (iconCode) => {
//   const icons = {
//     "01d": "https://img.icons8.com/3d-fluency/94/sun.png",           // clear sky day
//     "01n": "https://img.icons8.com/3d-fluency/94/sun.png",          // clear sky night

//     "02d": "https://img.icons8.com/3d-fluency/94/partly-cloudy-day.png", // few clouds day
//     "02n": "https://img.icons8.com/3d-fluency/94/partly-cloudy-night.png",

//     "03d": "/icons/cloud.png",         // scattered clouds
//     "03n": "/icons/cloud.png",

//     "04d": "/icons/broken-cloud.png",  // broken clouds
//     "04n": "/icons/broken-cloud.png",

//     "09d": "/icons/rain.png",          // shower rain
//     "09n": "/icons/rain.png",

//     "10d": "/icons/rain-sun.png",      // rain day
//     "10n": "/icons/rain-night.png",

//     "11d": "https://img.icons8.com/3d-fluency/94/storm.png",         // thunderstorm
//     "11n": "https://img.icons8.com/3d-fluency/94/storm.png",

//     "13d": "/icons/snow.png",          // snow
//     "13n": "/icons/snow.png",

//     "50d": "/icons/mist.png",          // mist / fog
//     "50n": "/icons/mist.png",
//   };

//   return icons[iconCode] || "https://img.icons8.com/3d-fluency/94/cloud-sync.png";
// };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        loading,
        setLoading,
        error,
        setError,
        forecast,
        setForecast,
        getWeatherIcon,
        city,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
