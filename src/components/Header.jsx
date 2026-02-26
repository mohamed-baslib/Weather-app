import { useLanguage } from "../contexts/useLanguage";
import { useTheme } from "../contexts/useTheme";
import { useTranslation } from "react-i18next";
import { useWeather } from "../contexts/useWeather";
import { fetchForecast, fetchWeatherByCoords } from "../services/weatherService";
import { useEffect } from "react";

const Header = () => {
  const { t } = useTranslation();
  const { dark, toggleTheme } = useTheme();
  const { isLangAr, changeLang, lang } = useLanguage();
  const { weather, setWeather, setForecast, setLoading, setError, setCity } = useWeather();

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
      setLoading(true);
      setError(null);

        const dataLocation = await fetchWeatherByCoords(lat, lon, lang);
        const dataForecast = await fetchForecast(dataLocation.name);
        setWeather(dataLocation)
        setCity(dataLocation.name)
        setForecast(dataForecast)
        } 
        catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        setWeather(null);
      }
    } finally {
      setLoading(false);
    }
      },
      () => {
        setCity("مكة")
      },
    );
    
  };

  useEffect(() => {
    handleCurrentLocation();
  }, [])

  return (
    <header className="flex justify-between items-center">
      <button
        onClick={toggleTheme}
        className="duration-200 bg-[--card] text-purple-400 text-[15px] w-8 h-8 rounded-full flex justify-center items-center shadow-md"
      >
        {dark ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </button>
      <div
        className={`${isLangAr ? "mr-5" : "ml-5"} flex flex-col items-center`}
      >
        <h4 className={`font-bold ${weather ? weather.name.length > 15 ? "text-[15px]" :"text-[18px]" : ""} text-center`}>
          {t(weather ? weather.name : "Not Found")}
        </h4>
        <button
          onClick={handleCurrentLocation}
          className="bg-gradient-to-l from-purple-400 to-blue-500 text-sm rounded-xl px-2 text-white"
        >
          {t("Use My Location")}
        </button>
      </div>

      <button
        onClick={changeLang}
        className="bg-[--card] p-2 h-8 rounded-full flex justify-center items-center gap-1 shadow-md"
      >
        {isLangAr ? "EN" : "AR"}
        <i className="fa-solid fa-globe text-purple-400"></i>
      </button>
    </header>
  );
};

export default Header;
