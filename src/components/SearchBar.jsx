import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useWeather } from "../contexts/useWeather";
import { fetchForecast, fetchWeather } from "../services/weatherService";
import { useLanguage } from "../contexts/useLanguage";

const SearchBar = () => {
  const { t } = useTranslation();
  const { setForecast, setWeather, setLoading, setError, setCity, city } = useWeather();
  const { isLangAr, lang } = useLanguage();
  const controllerRef = useRef(null);

  const handleSearch = async () => {
    if (!city) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const dataWeather = await fetchWeather(city, controller.signal, lang);
      const dataForecast = await fetchForecast(city, controller.signal);
      setWeather(dataWeather);
      setForecast(dataForecast);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        setWeather(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      handleSearch();
  }, [lang, city]);

  return (
    <div className="m-6">
      <div className="flex items-center">
        <input
          className={`bg-[--card] w-full p-2 px-4 outline-none ${isLangAr ? "rounded-r-xl" : "rounded-l-xl"} shadow-sm text-sm`}
          type="text"
          placeholder={t("Search City")}
        />
        <button
          className={`bg-gradient-to-l from-purple-400 to-blue-500 p-2 ${isLangAr ? "rounded-l-xl" : "rounded-r-xl"} w-20 text-white text-sm`}
          onClick={(e) => {
            setCity(e.target.previousSibling.value);
          }}
        >
          {t("Search")}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
