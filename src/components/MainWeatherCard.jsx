import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/useLanguage";
import { useWeather } from "../contexts/useWeather";

const MainWeatherCard = () => {
  const { t } = useTranslation();
  const { isLangAr, lang } = useLanguage();
   const { weather, getWeatherIcon, loading, error } = useWeather();
   const dataNow = new Date().toLocaleDateString(lang, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

{/* Loading Skeleton */}
  if (loading) return;

  return (
    <div className={`${loading ? "" : "card"} relative h-[150px] bg-gradient-to-l from-purple-400 to-blue-500 rounded-[25px] mt-8 shadow-md p-2`}>
      <div className="flex justify-between">
        <div>
          <img
            className={`weather-icon w-[120px] absolute top-[-30px] ${isLangAr ? "right-[20px]" : "left-[20px]"}`}
            src={`${error ? "https://img.icons8.com/3d-fluency/94/error.png" : weather ? getWeatherIcon(Math.round(weather.main.temp)) : "https://img.icons8.com/3d-fluency/94/cloud-sync.png"}`}
            alt="partly-cloudy-day"
          />

        </div>
        <div className="text-white text-[70px] ml-4">{ weather ? Math.round(weather.main.temp) : 0}&#176;</div>
      </div>
      <div
        className={`absolute bottom-3 ${isLangAr ? "right-5" : "left-5"}`}
      >
        <div className="text-white">
          <h4 className={`font-bold ${error ? "text-[16px]" : "text-[22px]" }`}>{t(error ? "Search or Network Problem" : weather ? weather.weather[0].description : "Search City")}</h4>
          <p className="text-[14px]">{dataNow}</p>
        </div>
      </div>
      
    </div>
  );
};

export default MainWeatherCard;
