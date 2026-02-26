import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/useLanguage";
import { useWeather } from "../contexts/useWeather";

const dayKeys = [
  "days.sun",
  "days.mon",
  "days.tue",
  "days.wed",
  "days.thu",
  "days.fri",
  "days.sat",
];

const WeeklyForecastCard = () => {
  const { forecast, getWeatherIcon, loading } = useWeather();
  const { t } = useTranslation();
  const { isLangAr, lang } = useLanguage();

  const [days, setDays] = useState([]);



 const dailyForecast = useMemo(() => {
  if (!forecast) return [];

  const map = {};

  forecast.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!map[date]) {
      map[date] = item;
    }
  });

  return Object.values(map).slice(0, 7);
}, [forecast]);


  useEffect(() => {
    if (!dailyForecast.length) return ;

    const prepared = dailyForecast.map((item, index) => {
      const dateObj = new Date(item.dt * 1000);

      const dayIndex = dateObj.getDay();
      const temp = Math.round(item.main.temp);

      return {
        day: dayKeys[dayIndex],
        date: dateObj,
        temp,
        icon: getWeatherIcon(temp),
        active: index === 0,
      };
    });

    setDays(prepared);
  }, [dailyForecast, getWeatherIcon]);

  {/* Loading Skeleton */}
      if (loading) return (
        <div className="absolute inset-0 animate-pulse bg-[--surface] backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="animate-pulse text-xl ">
            {t("loading")}...
          </div>
        </div>
      )

  return (
    <div className="mt-6 p-5 relative">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {t("weekly_forecast")}
        </h3>
      </div>

    
      {/* Cards */}
      <div className="overflow-hidd">
        <div
          className={`flex gap-2 duration-500`}
        >
          {days.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-between py-3 rounded-[30px] w-[50px] h-[150px] transition duration-300
              ${
                item.active
                  ? "bg-gradient-to-l from-purple-500/90 to-blue-500 text-white shadow-lg scale-105"
                  : "bg-[--card]"
              }`}
            >
              {/* Day */}
              <div className="flex flex-col items-center">
                <p
                  className={`font-bold ${
                    isLangAr ? "text-[11px]" : "text-[14px]"
                  }`}
                >
                  {index === 0 ? t("today") : t(item.day)}
                </p>

                <p className="text-[12px] opacity-70">
                  {item.date.toLocaleDateString(lang, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Icon */}
              <img
                src={item.icon}
                alt=""
                className="w-10 h-10 my-2"
              />

              {/* Temp */}
              <p className="font-bold text-[20px]">
                {item.temp}°
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default React.memo(WeeklyForecastCard);