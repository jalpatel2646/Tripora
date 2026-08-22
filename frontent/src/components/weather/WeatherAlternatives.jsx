// src/components/weather/WeatherAlternatives.jsx
import React from 'react';
import './WeatherAlternatives.css';

export default function WeatherAlternatives({ alternatives, onSelect }) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="weather-alternatives-card animate-fade">
      <h5 className="alternatives-title">Suggested Alternatives:</h5>
      <div className="alternatives-scroll-list">
        {alternatives.map((alt) => (
          <div key={alt.name} className="alt-item-card">
            <div className="alt-item-header">
              <span className="alt-item-badge">{alt.type}</span>
              <span className="alt-item-cost">
                {alt.cost > 0 ? `₹${alt.cost.toLocaleString('en-IN')}` : 'FREE'}
              </span>
            </div>
            <h6 className="alt-item-name">{alt.name}</h6>
            <p className="alt-item-desc">{alt.description}</p>
            {alt.duration && <span className="alt-item-duration">⏱ {alt.duration}</span>}
            <button
              type="button"
              className="alt-replace-action-btn"
              onClick={() => onSelect(alt)}
            >
              Replace Activity
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
