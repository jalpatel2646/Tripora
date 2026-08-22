// src/components/weather/DayWeather.jsx
import React from 'react';
import './DayWeather.css';

export default function DayWeather({ weather }) {
  if (!weather) return null;

  const getWeatherIcon = (cond) => {
    const c = (cond || '').toLowerCase();
    if (c.includes('heavy rain')) return '🌧';
    if (c.includes('rain')) return '🌦';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('hot')) return '🥵';
    if (c.includes('cold')) return '❄️';
    return '☀️';
  };

  return (
    <div className="day-weather-summary-box">
      <span className="day-weather-icon">{getWeatherIcon(weather.condition)}</span>
      <span className="day-weather-temp">{weather.maxTemp}°C</span>
      <span className="day-weather-desc">• {weather.condition}</span>
      {weather.precipitation > 0 && (
        <span className="day-weather-precip">• {weather.precipitation}% rain</span>
      )}
    </div>
  );
}
