import WeatherDetailsCard from "./WeatherDetailsCard";
import Header from "./Header";
import MainWeatherCard from "./MainWeatherCard";
import WeeklyForecastCard from "./WeeklyForecast";
import SearchBar from "./SearchBar";

const Weather = () => {

  return (
    <div
      className={`duration-200 h-[840px] text-[--text] bg-[--surface] p-[20px] backdrop-blur-3xl rounded-[35px] m-3 shadow-md flex-col w-[350px]`}
    >
      <Header />

      <SearchBar />
      {/* card weather */}

      <MainWeatherCard />

      <WeatherDetailsCard />

      <WeeklyForecastCard />

    </div>
  );
};

export default Weather;
