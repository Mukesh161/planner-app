import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'a76f5c9f79554ae549cde6e98e87be76';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          const data = await response.json();
          setWeatherData(data);
        });
      }
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  const { name, main, weather } = weatherData;
  const temperature = Math.round(main.temp - 273.15); // Convert temperature to Celsius

  // Function to get emoji based on weather condition
  const getWeatherEmoji = condition => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Thunderstorm':
        return '⛈️';
      case 'Snow':
        return '❄️';
      default:
        return '';
    }
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>
        Weather: {weather[0].description} {getWeatherEmoji(weather[0].main)}
      </p>
    </div>
  );
}
