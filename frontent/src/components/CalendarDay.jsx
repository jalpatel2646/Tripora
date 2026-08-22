import React from 'react';
import './CalendarDay.css';

const EVENT_ICONS = {
  travel:   '✈',
  hotel:    '🏨',
  food:     '🍴',
  activity: '🏖',
  trip:     '🗺',
  sightseeing: '📸',
  adventure: '🏄'
};

export default function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  events = [],
  onSelect,
  maxEventsVisible = 3
}) {
  const visibleEvents = events.slice(0, maxEventsVisible);
  const overflow = events.length - maxEventsVisible;

  return (
    <div
      className={[
        'cal-day-cell',
        !isCurrentMonth ? 'other-month' : '',
        isToday       ? 'is-today'      : '',
        isSelected    ? 'is-selected'   : '',
        events.length > 0 ? 'has-events' : ''
      ].filter(Boolean).join(' ')}
      onClick={() => onSelect(date)}
      role="gridcell"
      aria-label={`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}${events.length ? `, ${events.length} event${events.length > 1 ? 's' : ''}` : ''}`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(date)}
    >
      {/* Date Number */}
      <div className="cal-day-number-wrap">
        <span className={`cal-day-number${isToday ? ' today-circle' : ''}`}>
          {date.getDate()}
        </span>
      </div>

      {/* Events */}
      <div className="cal-day-events">
        {visibleEvents.map((evt, idx) => (
          <div
            key={evt.id || idx}
            className={`cal-event-chip type-${(evt.type || 'trip').toLowerCase()}`}
            title={evt.title}
          >
            <span className="cal-event-icon">{EVENT_ICONS[evt.type] || '📌'}</span>
            <span className="cal-event-label">{evt.title}</span>
          </div>
        ))}
        {overflow > 0 && (
          <div className="cal-overflow-chip">+{overflow} more</div>
        )}
      </div>
    </div>
  );
}
