import React, { useState } from 'react';
import ActivityRow from './ActivityRow';
import DayWeather from './weather/DayWeather';
import './ItineraryDay.css';

export default function ItineraryDay({ dayData, weather, otherDays, onReplaceActivity, onMoveActivity }) {
  const { day, date, city, activities = [] } = dayData;
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Calculate total expense for this day
  const dayTotal = activities.reduce((sum, act) => sum + (parseFloat(act.expense) || 0), 0);
  const formattedDayTotal = `₹${dayTotal.toLocaleString('en-IN')}`;

  return (
    <section className={`itinerary-day-section ${isCollapsed ? 'is-collapsed' : ''}`} aria-labelledby={`day-heading-${day}`}>
      {/* Day Header */}
      <header className="id-header" onClick={() => setIsCollapsed(!isCollapsed)} style={{ cursor: 'pointer' }}>
        <div className="id-badge-wrap">
          <span className="id-badge">DAY {String(day).padStart(2, '0')}</span>
          <div className="id-sub-info">
            <h3 id={`day-heading-${day}`} className="id-date">{date}</h3>
            {city && <span className="id-city">• {city}</span>}
          </div>
          {weather && <DayWeather weather={weather} />}
        </div>

        <div className="id-header-right">
          {isCollapsed && (
            <span className="id-collapsed-summary">
              {activities.length} {activities.length === 1 ? 'activity' : 'activities'} • {formattedDayTotal}
            </span>
          )}
          <span className={`id-collapse-arrow ${isCollapsed ? 'collapsed' : 'expanded'}`}>
            {isCollapsed ? '⌄' : '⌃'}
          </span>
        </div>
      </header>

      {/* Activities Timeline */}
      {!isCollapsed && (
        <>
          {/* Daily Summary */}
          <div className="id-daily-summary">
            <span className="id-summary-city">{city}</span>
            <div className="id-summary-stats">
              <span>{activities.length} {activities.length === 1 ? 'Activity' : 'Activities'}</span>
              <span className="bullet-dot">•</span>
              <span>{formattedDayTotal} Estimated</span>
              {activities.length > 0 && (
                <>
                  <span className="bullet-dot">•</span>
                  <span>{activities[0].time} – {activities[activities.length - 1].time}</span>
                </>
              )}
            </div>
          </div>

          <div className="id-activities-timeline">
            {activities.map((act, index) => (
              <ActivityRow
                key={act.id || index}
                activity={act}
                isLast={index === activities.length - 1}
                weather={weather}
                otherDays={otherDays}
                onReplace={onReplaceActivity}
                onMove={(toDay, a) => onMoveActivity(day, toDay, a)}
              />
            ))}
          </div>

          {/* Day Total Footer */}
          <footer className="id-footer">
            <div className="id-total-box">
              <span className="id-total-label">{activities.length} activities</span>
              <div className="id-total-amount-wrap">
                <span className="id-total-amount-lbl">Day total</span>
                <span className="id-total-amount">{formattedDayTotal}</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </section>
  );
}
