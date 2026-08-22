// src/components/weather/TripWeatherSummary.jsx
import React, { useState } from 'react';
import './TripWeatherSummary.css';

export default function TripWeatherSummary({ weatherData, itinerary, affectedCount, onReplaceActivity, onMoveActivity }) {
  const [showModal, setShowModal] = useState(false);

  // Group weather counts
  const getSummaryCounts = () => {
    let clear = 0;
    let mixed = 0;
    let rainy = 0;

    Object.values(weatherData).forEach((w) => {
      const cond = (w.condition || '').toLowerCase();
      if (cond.includes('heavy rain') || cond.includes('rain') || cond.includes('storm')) {
        rainy++;
      } else if (cond.includes('cloud') || cond.includes('wind') || cond.includes('mixed')) {
        mixed++;
      } else {
        clear++;
      }
    });

    return { clear, mixed, rainy };
  };

  const { clear, mixed, rainy } = getSummaryCounts();

  // Find all affected days and activities
  const getAffectedActivities = () => {
    const list = [];
    itinerary.forEach((dayObj) => {
      const weather = weatherData[dayObj.day];
      if (!weather) return;

      const isRainy = weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('storm');
      const isHot   = weather.maxTemp > 35;

      dayObj.activities.forEach((act) => {
        const type = (act.type || '').toLowerCase();
        let affected = false;
        
        if (isRainy && (type === 'adventure' || type === 'sightseeing' || type === 'shopping' || type === 'beaches')) {
          affected = true;
        } else if (isHot && (type === 'adventure' || type === 'sightseeing')) {
          const hour = parseInt(act.time || '12');
          const isAfternoon = (act.time.includes('PM') && hour !== 12 && hour < 5) || (act.time.includes('AM') && hour === 12);
          if (isAfternoon) affected = true;
        }

        if (affected) {
          list.push({
            day: dayObj.day,
            date: dayObj.date,
            city: dayObj.city,
            weather,
            activity: act
          });
        }
      });
    });
    return list;
  };

  const affectedList = getAffectedActivities();

  return (
    <div className="trip-weather-summary-container animate-fade">
      <div className="summary-main-row">
        <div className="summary-left">
          <span className="summary-title-label">🌦 Weather during your trip</span>
          <div className="summary-indicators">
            <span className="indicator-pill clear">☀️ {clear} Clear {clear === 1 ? 'Day' : 'Days'}</span>
            <span className="indicator-pill mixed">🌦 {mixed} Mixed {mixed === 1 ? 'Day' : 'Days'}</span>
            <span className="indicator-pill rainy">🌧 {rainy} Rainy {rainy === 1 ? 'Day' : 'Days'}</span>
          </div>
        </div>

        <div className="summary-right">
          {affectedCount > 0 ? (
            <span className="summary-alert-msg">
              ⚠️ {affectedCount} {affectedCount === 1 ? 'activity needs' : 'activities may need'} adjustment
            </span>
          ) : (
            <span className="summary-success-msg">✓ All activities suitable</span>
          )}
          
          {affectedCount > 0 && (
            <button
              type="button"
              className="review-impact-btn"
              onClick={() => setShowModal(true)}
            >
              Review Weather Impact
            </button>
          )}
        </div>
      </div>

      {/* Modal / Impact Panel Overlay */}
      {showModal && (
        <div className="weather-modal-overlay animate-fade" onClick={() => setShowModal(false)}>
          <div className="weather-modal-card" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3 className="modal-title">Weather Impact Assessment</h3>
              <button type="button" className="close-modal-btn" onClick={() => setShowModal(false)}>✕</button>
            </header>

            <div className="modal-body-scroll">
              {affectedList.length === 0 ? (
                <div className="modal-empty-state">
                  <span className="empty-state-icon">✓</span>
                  <p>All planned activities are weather-suitable!</p>
                </div>
              ) : (
                <div className="affected-days-timeline">
                  {affectedList.map((item, idx) => (
                    <div key={idx} className="affected-item-card">
                      <div className="affected-item-header">
                        <span className="affected-day-badge">DAY {String(item.day).padStart(2, '0')}</span>
                        <span className="affected-city-date">{item.city} • {item.date}</span>
                      </div>
                      <div className="affected-activity-row">
                        <div className="affected-weather-info">
                          <span className="weather-large-icon">🌧</span>
                          <div className="weather-text">
                            <strong>{item.weather.condition}</strong> • {item.weather.maxTemp}°C • {item.weather.precipitation}% rain
                          </div>
                        </div>
                        <div className="affected-activity-box">
                          <div className="aff-act-name">⚠️ {item.activity.name} ({item.activity.time})</div>
                          <p className="aff-act-warning-text">Rain expected during this outdoor activity.</p>
                          <div className="aff-act-tips">
                            <strong>Tip:</strong> Scroll down to Day {item.day} in your itinerary to view alternatives or reschedule to a sunny day.
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <footer className="modal-footer">
              <button
                type="button"
                className="modal-done-btn"
                onClick={() => setShowModal(false)}
              >
                Close Report
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
