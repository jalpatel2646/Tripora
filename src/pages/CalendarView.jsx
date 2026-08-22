import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import CalendarControls from '../components/CalendarControls';
import CalendarGrid from '../components/CalendarGrid';
import EventDetails from '../components/EventDetails';
import './CalendarView.css';

// ── Dummy Calendar Events ────────────────────────────────────────────────────
const ALL_EVENTS = [
  {
    id: 1,
    title: 'Mumbai Stop',
    type: 'travel',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    destination: 'Mumbai, Maharashtra',
    budget: 10500,
    description: 'Ahmedabad → Mumbai flight + sightseeing.'
  },
  {
    id: 2,
    title: 'Goa Escape',
    type: 'trip',
    startDate: '2026-08-15',
    endDate: '2026-08-20',
    destination: 'Goa, India',
    budget: 32000,
    description: 'Full Goa trip covering North & South Goa.'
  },
  {
    id: 3,
    title: 'Baga Beach',
    type: 'activity',
    date: '2026-08-17',
    time: '09:00 AM',
    destination: 'Goa',
    expense: 0,
    description: 'Morning beach walk and coconut water.'
  },
  {
    id: 4,
    title: 'Water Sports',
    type: 'adventure',
    date: '2026-08-17',
    time: '11:00 AM',
    destination: 'Calangute, Goa',
    expense: 2800,
    description: 'Parasailing, jet-ski and banana boat ride.'
  },
  {
    id: 5,
    title: 'Seafood Dinner',
    type: 'food',
    date: '2026-08-17',
    time: '08:00 PM',
    destination: 'Baga Shacks',
    expense: 1200
  },
  {
    id: 6,
    title: 'Resort Stay',
    type: 'hotel',
    startDate: '2026-08-15',
    endDate: '2026-08-19',
    destination: 'Baga Beach Resort, Goa',
    expense: 12000
  },
  {
    id: 7,
    title: 'Fort Aguada Tour',
    type: 'sightseeing',
    date: '2026-08-18',
    time: '03:00 PM',
    destination: 'Fort Aguada, Goa',
    expense: 400
  },
  {
    id: 8,
    title: 'Rajasthan Road Trip',
    type: 'trip',
    startDate: '2026-09-10',
    endDate: '2026-09-17',
    destination: 'Jaipur → Jodhpur → Udaipur',
    budget: 45000
  },
  {
    id: 9,
    title: 'Amber Fort Tour',
    type: 'sightseeing',
    date: '2026-09-11',
    time: '10:00 AM',
    destination: 'Jaipur',
    expense: 1200
  },
  {
    id: 10,
    title: 'Manali Expedition',
    type: 'trip',
    startDate: '2026-10-05',
    endDate: '2026-10-12',
    destination: 'Manali, Himachal Pradesh',
    budget: 28000
  }
];

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function toDateStr(d) {
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

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

export default function CalendarView() {
  const today = new Date();

  // Calendar navigation state
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // Aug 2026
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month');

  // Search & filter state
  const [search, setSearch]   = useState('');
  const [groupBy, setGroupBy] = useState('trip');
  const [filter, setFilter]   = useState('all');
  const [sortBy, setSortBy]   = useState('date');

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month navigation
  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth     = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday         = () => { setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1)); setSelectedDate(today); };

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let list = [...ALL_EVENTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.destination && e.destination.toLowerCase().includes(q)) ||
          (e.description && e.description.toLowerCase().includes(q))
      );
    }

    if (filter !== 'all') {
      const TYPE_MAP = { ongoing: 'trip', upcoming: 'trip', completed: 'trip' };
      const typeFilter = TYPE_MAP[filter] || filter;
      list = list.filter((e) => e.type === typeFilter || e.type === filter);
    }

    return list;
  }, [search, filter]);

  // Events for selected date (for details panel)
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(filteredEvents, selectedDate);
  }, [selectedDate, filteredEvents]);

  // Timeline view — sorted list of events in current month
  const timelineEvents = useMemo(() => {
    const start = `${year}-${String(month + 1).padStart(2,'0')}-01`;
    const end   = `${year}-${String(month + 1).padStart(2,'0')}-31`;
    return filteredEvents
      .filter((e) => {
        const d = e.date || e.startDate;
        return d && d >= start && d <= end;
      })
      .sort((a, b) => {
        const da = a.date || a.startDate;
        const db = b.date || b.startDate;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        if (sortBy === 'destination') return (a.destination || '').localeCompare(b.destination || '');
        return da?.localeCompare(db) || 0;
      });
  }, [filteredEvents, year, month, sortBy]);

  return (
    <div className="cal-view-page-container">
      {/* ── Navbar ── */}
      <Navbar />

      <main className="cal-view-main">
        <div className="cal-view-layout">

          {/* ── Page Heading ── */}
          <header className="cal-view-page-header">
            <h1 className="cal-view-title">Calendar View</h1>
            <p className="cal-view-subtitle">View all your trips and activities by date.</p>
          </header>

          {/* ── Search / Filter Controls ── */}
          <CalendarControls
            search={search} setSearch={setSearch}
            groupBy={groupBy} setGroupBy={setGroupBy}
            filter={filter}  setFilter={setFilter}
            sortBy={sortBy}  setSortBy={setSortBy}
          />

          {/* ── Calendar Card + Details Panel ── */}
          <div className="cal-content-row">
            {/* Left: Main Calendar Card */}
            <div className="cal-card">
              {/* Calendar Card Title */}
              <div className="cal-card-title-row">
                <h2 className="cal-card-title">Calendar View</h2>

                {/* Month / Timeline toggle */}
                <div className="cal-view-mode-tabs" role="tablist">
                  <button
                    type="button"
                    className={`cal-view-tab${viewMode === 'month' ? ' is-active' : ''}`}
                    onClick={() => setViewMode('month')}
                    role="tab"
                    aria-selected={viewMode === 'month'}
                  >
                    📅 Month
                  </button>
                  <button
                    type="button"
                    className={`cal-view-tab${viewMode === 'timeline' ? ' is-active' : ''}`}
                    onClick={() => setViewMode('timeline')}
                    role="tab"
                    aria-selected={viewMode === 'timeline'}
                  >
                    📋 Timeline
                  </button>
                </div>
              </div>

              {/* Calendar Header: prev / month-year / today / next */}
              <div className="cal-month-header">
                <button type="button" className="cal-nav-btn" onClick={goToPreviousMonth} aria-label="Previous month">‹</button>

                <div className="cal-month-label-wrap">
                  <span className="cal-month-name">{MONTH_NAMES[month]} {year}</span>
                  <button type="button" className="cal-today-btn" onClick={goToToday}>Today</button>
                </div>

                <button type="button" className="cal-nav-btn" onClick={goToNextMonth} aria-label="Next month">›</button>
              </div>

              {/* ── Month Grid View ── */}
              {viewMode === 'month' && (
                <CalendarGrid
                  year={year}
                  month={month}
                  events={filteredEvents}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              )}

              {/* ── Timeline View ── */}
              {viewMode === 'timeline' && (
                <div className="cal-timeline-view">
                  {timelineEvents.length === 0 ? (
                    <div className="cal-timeline-empty">
                      <div className="cal-tl-icon">🔍</div>
                      <p>No events found for {MONTH_NAMES[month]} {year}.</p>
                    </div>
                  ) : (
                    timelineEvents.map((evt, idx) => (
                      <div key={evt.id || idx} className={`cal-tl-item type-${evt.type || 'trip'}`}>
                        <div className="cal-tl-date-col">
                          <span className="cal-tl-date">{evt.date || evt.startDate}</span>
                          {evt.endDate && evt.endDate !== evt.date && (
                            <span className="cal-tl-date-end">→ {evt.endDate}</span>
                          )}
                        </div>
                        <div className="cal-tl-info">
                          <span className="cal-tl-title">{evt.title}</span>
                          {evt.destination && <span className="cal-tl-dest">📍 {evt.destination}</span>}
                          {evt.time && <span className="cal-tl-time">🕐 {evt.time}</span>}
                        </div>
                        {(evt.expense > 0 || evt.budget > 0) && (
                          <span className="cal-tl-expense">
                            ₹{Number(evt.expense || evt.budget).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Right: Selected Date Details Panel */}
            <EventDetails
              selectedDate={selectedDate}
              events={selectedDateEvents}
              onClose={() => setSelectedDate(null)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
