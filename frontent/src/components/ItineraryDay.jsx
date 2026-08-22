import React from 'react';
import ActivityRow from './ActivityRow';
import './ItineraryDay.css';

export default function ItineraryDay({ dayData }) {
  const { day, date, city, activities = [] } = dayData;

  // Calculate total expense for this day
  const dayTotal = activities.reduce((sum, act) => sum + (parseFloat(act.expense) || 0), 0);
  const formattedDayTotal = `₹${dayTotal.toLocaleString('en-IN')}`;

  return (
    <section className="itinerary-day-section" aria-labelledby={`day-heading-${day}`}>
      {/* Day Header */}
      <header className="id-header">
        <div className="id-badge-wrap">
          <span className="id-badge">Day {day}</span>
          <div className="id-sub-info">
            <h3 id={`day-heading-${day}`} className="id-date">{date}</h3>
            {city && <span className="id-city">• {city}</span>}
          </div>
        </div>
      </header>

      {/* Activities Timeline */}
      <div className="id-activities-timeline">
        {activities.map((act, index) => (
          <ActivityRow
            key={act.id || index}
            activity={act}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>

      {/* Day Total Footer */}
      <footer className="id-footer">
        <div className="id-total-box">
          <span className="id-total-label">Day {day} Total:</span>
          <span className="id-total-amount">{formattedDayTotal}</span>
        </div>
      </footer>
    </section>
  );
}
