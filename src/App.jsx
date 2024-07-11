import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userInput, setUserInput] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [currentLocation, setCurrentLocation] = useState("Auckland");

  useEffect(function () {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=a61b2c44ad4b44e2b5362534241107&q=${currentLocation}&aqi=no`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setWeatherData(result);
      })
  },[currentLocation]) 


  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentLocation(userInput);
  }

  return (
    <>
      <h2>🌜 THE WORLDLY WEATHER OR WHATEVER! 🌦️</h2>
      <form>
        <label>Enter your city: </label>
        <input type="text" onChange={handleChange}/>
        <button onClick={handleClick}>Search</button>
      </form>
      {weatherData &&
        <div >
          <p>{`The temperature in ${weatherData.location.name} is ${weatherData.current.temp_c}°C`}</p>
          <p>{`It's currently ${weatherData.current.condition.text}`}</p>
          <img src={weatherData.current.condition.icon} alt="icon" />
        </div>
      }
    </>
  );
}

export default App
