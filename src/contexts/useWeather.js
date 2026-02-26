import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export function useWeather() {
  return useContext(WeatherContext);
}