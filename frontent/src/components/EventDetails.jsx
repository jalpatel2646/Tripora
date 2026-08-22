import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EVENT_ICONS = {
  travel:      '✈',
  hotel:       '🏨',
  food:        '🍴',
  activity:    '🏖',
  trip:        '🗺',
  sightseeing: '📸',
  adventure:   '🏄'
};

function formatDateFull(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateRange(start, end) {
  if (!start) return '';
  const s = new Date(start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  if (!end || end === start) return s;
  const e = new Date(end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  return `${s} – ${e}`;
}

function diffDays(start, end) {
  if (!start || !end) return 0;
  return Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
}

export default function EventDetails({ selectedDate, events, onClose }) {
  const navigate = useNavigate();

  if (!selectedDate) {
    return (
      <aside className="event-details-panel empty-panel" aria-label="Selected date details">
        <div className="ed-empty-state">
          <div className="ed-empty-icon">📅</div>
          <p className="ed-empty-text">Click any date on the calendar to view its details.</p>
        </div>
      </aside>
    );
  }

  const dateLabel = formatDateFull(selectedDate);
  const totalExpense = events.reduce((sum, e) => sum + (Number(e.expense) || 0), 0);

  return (
    <aside className="event-details-panel" aria-label={`Details for ${dateLabel}`}>
      {/* Header */}
      <div className="ed-header">
        <h3 className="ed-date-label">{dateLabel}</h3>
        {onClose && (
          <button type="button" className="ed-close-btn" onClick={onClose} aria-label="Close details">✕</button>
        )}
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="ed-no-events">
          <span className="ed-no-events-icon">☀️</span>
          <p className="ed-no-events-text">No events planned for this day.</p>
        </div>
      ) : (
        <div className="ed-events-list">
          {events.map((evt, idx) => (
            <div key={evt.id || idx} className={`ed-event-card type-${(evt.type || 'trip').toLowerCase()}`}>
              <div className="ed-event-card-header">
                <span className="ed-event-icon">{EVENT_ICONS[evt.type] || '📌'}</span>
                <div className="ed-event-main">
                  <span className="ed-event-title">{evt.title}</span>
                  {evt.destination && <span className="ed-event-dest">📍 {evt.destination}</span>}
                </div>
                <span className={`ed-event-badge type-badge-${(evt.type || 'trip').toLowerCase()}`}>
                  {evt.type || 'Trip'}
                </span>
              </div>

              {/* Multi-day trip metadata */}
              {evt.startDate && evt.endDate && (
                <div className="ed-event-meta">
                  <span>📅 {formatDateRange(evt.startDate, evt.endDate)}</span>
                  <span>⏱ {diffDays(evt.startDate, evt.endDate)} Day{diffDays(evt.startDate, evt.endDate) > 1 ? 's' : ''}</span>
                </div>
              )}

              {/* Single day fields */}
              {evt.time && <div className="ed-event-time">🕐 {evt.time}</div>}
              {evt.description && <p className="ed-event-desc">{evt.description}</p>}

              {/* Expense + budget */}
              {evt.budget && (
                <div className="ed-event-budget">
                  💰 Budget: <strong>₹{Number(evt.budget).toLocaleString('en-IN')}</strong>
                </div>
              )}
              {evt.expense !== undefined && evt.expense > 0 && (
                <div className="ed-event-expense">
                  💵 Cost: <strong>₹{Number(evt.expense).toLocaleString('en-IN')}</strong>
                </div>
              )}
              {evt.expense === 0 && <div className="ed-event-expense free">Free</div>}

              {/* View Trip CTA */}
              {(evt.type === 'trip' || evt.startDate) && (
                <button
                  type="button"
                  className="ed-view-btn"
                  onClick={() => navigate('/itinerary-view')}
                >
                  View Trip →
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Day total expense */}
      {totalExpense > 0 && (
        <div className="ed-day-total">
          <span className="ed-day-total-label">Total Expense:</span>
          <span className="ed-day-total-amount">₹{totalExpense.toLocaleString('en-IN')}</span>
        </div>
      )}
    </aside>
  );
}
