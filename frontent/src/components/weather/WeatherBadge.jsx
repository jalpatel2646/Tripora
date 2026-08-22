// src/components/weather/WeatherBadge.jsx
import React from 'react';
import './WeatherBadge.css';

export default function WeatherBadge({ suitability }) {
  const label = (suitability || 'GOOD').toUpperCase();
  const classMap = {
    GOOD: 'suit-good',
    FAIR: 'suit-fair',
    POOR: 'suit-poor'
  };

  return (
    <span className={`weather-suit-badge ${classMap[label] || 'suit-good'}`}>
      {label}
    </span>
  );
}
