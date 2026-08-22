import React, { useMemo } from 'react';
import CalendarDay from './CalendarDay';
import './CalendarGrid.css';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Generates the array of date objects to display in a monthly grid,
 * including leading days from the previous month and trailing days from next month.
 */
function buildCalendarDays(year, month) {
  // First and last day of current month
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);

  // Pad start with prev month days
  const startPad = firstDay.getDay(); // 0=Sun
  // Pad end so total cells is always 42 (6 weeks)
  const totalCells = 42;

  const days = [];

  // Previous month trailing days
  for (let i = startPad - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }

  // Current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  // Next month leading days
  const remaining = totalCells - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push(new Date(year, month + 1, d));
  }

  return days;
}

/**
 * Returns events whose date range covers a particular calendar date.
 */
function getEventsForDate(events, date) {
  const dateStr = toDateStr(date);
  return events.filter((evt) => {
    if (evt.date) return evt.date === dateStr;
    if (evt.startDate && evt.endDate) {
      return evt.startDate <= dateStr && dateStr <= evt.endDate;
    }
    return false;
  });
}

function toDateStr(d) {
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

export default function CalendarGrid({ year, month, events, selectedDate, onSelectDate }) {
  const today    = new Date();
  const days     = useMemo(() => buildCalendarDays(year, month), [year, month]);

  return (
    <div className="cal-grid-container" role="grid" aria-label="Monthly calendar">
      {/* Day of week headers */}
      <div className="cal-dow-header" role="row">
        {DAY_LABELS.map((lbl) => (
          <div key={lbl} className="cal-dow-cell" role="columnheader" aria-label={lbl}>{lbl}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="cal-days-grid" role="rowgroup">
        {days.map((date, idx) => {
          const eventsForDay     = getEventsForDate(events, date);
          const isCurrentMonth   = date.getMonth() === month;
          const isToday          = isSameDay(date, today);
          const isSelected       = selectedDate ? isSameDay(date, selectedDate) : false;

          return (
            <CalendarDay
              key={idx}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isSelected={isSelected}
              events={eventsForDay}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}
