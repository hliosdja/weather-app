import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  //States
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=74b7820754744d63b0d25343212207&q=London&days=1&aqi=no&alerts=no"
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
        `http://api.weatherapi.com/v1/forecast.json?key=74b7820754744d63b0d25343212207&q=${city}&days=1&aqi=no&alerts=no`
      )
      .then((data) => {
        setWeather(data.data);
      });
  };

  return (
    <div>
      {weather && (
        <div>
          <div>
            <input type="text" onChange={inputHandler} />
            <button onClick={searchSubmitHandler}>Search</button>
          </div>
          <div>
            <div>
              <h1>{weather.location.name}</h1>
              <p>{weather.location.country}</p>
            </div>
            <div>
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
