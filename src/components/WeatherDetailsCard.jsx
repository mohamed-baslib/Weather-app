import { useTranslation } from "react-i18next";
import { useWeather } from "../contexts/useWeather";

const WeatherDetailsCard = () => {
  const { weather, loading } = useWeather();

  const details = [
    {
      title: "feels_like",
      value: `${weather ? Math.round(weather.main.feels_like) : "0"}°`,
      icon: "https://img.icons8.com/arcade/64/temperature.png",
    },
    {
      title: "humidity",
      value: `${weather ? weather.main.humidity : "0"}%`,
      icon: "https://img.icons8.com/color/48/hygrometer.png",
    },
    {
      title: "wind",
      value: `${weather ? (weather.wind.speed * 3.6).toFixed(1) : 0} km/h`,
      icon: "https://img.icons8.com/3d-fluency/94/windy-weather.png",
    },
    {
      title: "pressure",
      value: `${weather ? weather.main.pressure : "0"} hPa`,
      icon: "https://img.icons8.com/fluency/96/barometer.png",
    },
  ];
  const { t } = useTranslation();

  {/* Loading Skeleton */}
  if (loading) return;
  return (
    <div className={`${loading ? "" : "card"} mt-6 p-5 rounded-[25px] backdrop-blur-xl bg-[--card] text-[--text] shadow-lg`}>
      <h3 className="text-lg font-semibold mb-4">{t("weather_details")}</h3>

      <div className="grid grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-400/20 transition duration-300"
          >
            <img src={item.icon} alt="" className="w-8 h-8" />

            <div>
              <p className="text-[12px]">{t(item.title)}</p>
              <p className="font-bold text-[13px]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetailsCard;
