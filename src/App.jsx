/* eslint-disable eqeqeq */
import { useState } from "react";
import "./output.css";

const api = {
  key: "4741c50f4d592d37a9e010267c86a8c3",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const searchPressed = () => {
    setLoading(true);
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setWeather(result);
      });
  };

  const getTime = (timeInSeconds) => {
    let time = timeInSeconds * 1000;
    let date = new Date(time);
    return date.toLocaleTimeString();
  };

  return (
    <div className="h-lvh bg-gradient-to-r from-cyan-200 to-blue-300">
      <div className=" flex flex-col items-center p-4">
        <h1 className="font-bold text-3xl">Weather App</h1>
        <div className="flex flex-col md:flex-row mt-3 ">
          <input
            className="rounded-md bg-transparent outline-none"
            type="text"
            value={search}
            placeholder={"Enter city/town..."}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-row">
            <button className="ml-2 border-none" onClick={searchPressed}>
              Search
            </button>
            <button
              className="ml-2"
              onClick={() => {
                setWeather({});
                setSearch("");
              }}
            >
              Refresh
            </button>
          </div>
        </div>
        {loading && (
          <img
            className="relative size-44"
            src="/Loading.gif"
            alt="Loader"
          ></img>
        )}
        {typeof weather?.main !== "undefined" ? (
          <div className="m-2 flex flex-col items-center">
            <p>
              {`${weather.name} feels like `}
              <span className="text-4xl font-medium">
                {weather.main.feels_like}°C
              </span>
              {`, 
              ${weather.weather[0].main} (${weather.weather[0].description})`}
            </p>
            <div className="flex flex-row flex-wrap items-center">
              <div className="flex flex-col  flex-wrapm-4">
                <p className="text-6xl font-medium">{weather.name}</p>
                <div className="flex flex-row justify-between">
                  <p>
                    {Math.abs(weather.coord.lat)}
                    {weather.coord.lat >= 0 ? "N" : "S"}
                  </p>
                  <p className="ml-2">
                    {Math.abs(weather.coord.lon)}
                    {weather.coord.lon >= 0 ? "E" : "W"}
                  </p>
                </div>
              </div>
              <div className="flex flex-row flex-wrap">
                <div className="flex flex-col flex-wrap">
                  <div className="flex flex-col m-4 flex-wrap">
                    <p className="text-xl font-bold">Temperature</p>
                    <p>{weather.main.temp}°C</p>
                  </div>
                  <div className="flex flex-col m-4 flex-wrap">
                    <p className="text-xl font-bold">Humidity</p>
                    <p>{weather.main.humidity}%</p>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap">
                  <div className="flex flex-col m-4 flex-wrap">
                    <p className="text-xl font-bold">Sunrise</p>
                    <p>{getTime(weather.sys.sunrise)}</p>
                  </div>
                  <div className="flex flex-col m-4 flex-wrap">
                    <p className="text-xl font-bold">Wind</p>
                    <p>{weather.wind.speed}m/s</p>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap">
                  <div className="flex flex-col m-4 flex-wrap">
                    <p className="text-xl font-bold">Sunset</p>
                    <p>{getTime(weather.sys.sunset)}</p>
                  </div>
                  <div className="flex flex-col m-4 flex-wrap">
                    <p className="text-xl font-bold">Pressure</p>
                    <p>{weather.main.pressure}hPa</p>
                  </div>
                </div>
                <div className="flex flex-row"></div>
              </div>
            </div>
          </div>
        ) : weather.cod == 404 ? (
          "city/town not found"
        ) : weather.cod == 400 ? (
          "Please enter a city/town"
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
