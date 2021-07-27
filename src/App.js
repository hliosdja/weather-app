import axios from "axios";
import React, { useState, useEffect } from "react";

//styles
import "./styles/index.scss";

function App() {
  //States
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&days=1&aqi=no&alerts=no`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //events handlers
  const inputHandler = (e) => {
    setCity(e.target.value);
    console.log(e);
  };

  //get new weather data when searching
  const searchSubmitHandler = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&days=1&aqi=no&alerts=no`
      )
      .then((data) => {
        setWeather(data.data);
      });
  };

  console.log(weather.wind_kph);

  return (
    <div className="container">
      {weather && (
        <div className="wrapper">
          <div className="searchContainer">
            <input type="text" onChange={inputHandler} />
            <button onClick={searchSubmitHandler}>Search</button>
          </div>
          <div className="forecastContainer">
            <div className="location">
              <h1>{weather.location.name}</h1>
              <p>{weather.location.country}</p>
              <hr />
              <p>
                <span>Wind Speed: </span>
                {weather.current.wind_kph}
              </p>
              <p>
                <span>Wind Direction: </span>
                {weather.current.wind_dir}
              </p>
              <p>
                <span>Humidity: </span>
                {weather.current.humidity}
              </p>
            </div>
            <div className="condition">
              <p>{weather.current.condition.text}</p>
              <h4>{weather.current.temp_c}°C</h4>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
