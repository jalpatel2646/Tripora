// src/components/weather/WeatherAlert.jsx
import React, { useState } from 'react';
import WeatherAlternatives from './WeatherAlternatives';
import { getWeatherAlternatives } from '../../services/weatherService';
import './WeatherAlert.css';

export default function WeatherAlert({ activity, weather, onReplace, onMove, otherDays }) {
  const [showAlts, setShowAlts] = useState(false);

  const getAlertMessage = (cond) => {
    const c = (cond || '').toLowerCase();
    if (c.includes('rain') || c.includes('storm')) {
      return 'Rain is expected during this outdoor activity.';
    }
    if (c.includes('hot')) {
      return 'Very high temperatures expected. Shaded or indoor options advised.';
    }
    return 'Unfavorable weather conditions expected.';
  };

  const alternatives = getWeatherAlternatives(weather, weather.city);

  // Find better days (days where weather condition is NOT Rain/Heavy Rain/Very Hot, depending on why it is poor)
  const isRain = weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('storm');
  const betterDays = otherDays.filter((d) => {
    const w = d.weather;
    if (!w) return false;
    const cond = w.condition.toLowerCase();
    if (isRain) {
      return !cond.includes('rain') && !cond.includes('storm');
    }
    return !cond.includes('hot');
  });

  return (
    <div className="weather-alert-card animate-fade">
      <div className="alert-header-row">
        <span className="alert-warning-icon">⚠️</span>
        <div className="alert-text-wrapper">
          <h5 className="alert-title">Weather Warning</h5>
          <p className="alert-desc">{getAlertMessage(weather.condition)}</p>
        </div>
      </div>

      <div className="alert-actions-row">
        <button
          type="button"
          className="alert-action-btn primary"
          onClick={() => setShowAlts(!showAlts)}
        >
          {showAlts ? 'Hide Alternatives' : 'View Alternatives'}
        </button>

        {betterDays.length > 0 && (
          <div className="reschedule-dropdown-wrapper">
            <button type="button" className="alert-action-btn secondary">
              Move to Better Day
            </button>
            <div className="reschedule-options-menu">
              <span className="menu-header-title">Move Activity to:</span>
              {betterDays.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  className="menu-option-item"
                  onClick={() => onMove(d.day, activity)}
                >
                  Day {d.day} ({d.date}) • {d.weather.condition} ☀️
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {showAlts && (
        <WeatherAlternatives
          alternatives={alternatives}
          onSelect={(alt) => onReplace(activity.id, alt)}
        />
      )}
    </div>
  );
}
