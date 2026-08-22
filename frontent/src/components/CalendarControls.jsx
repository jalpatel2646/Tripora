import React from 'react';
import './CalendarControls.css';

export default function CalendarControls({
  search, setSearch,
  groupBy, setGroupBy,
  filter, setFilter,
  sortBy, setSortBy
}) {
  return (
    <div className="cal-controls-wrapper" role="region" aria-label="Calendar search and filters">
      {/* Search Bar */}
      <div className="cal-search-bar">
        <span className="cal-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="cal-search-input"
          placeholder="Search trips or activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search trips and activities"
        />
        {search && (
          <button type="button" className="cal-clear-btn" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Dropdowns */}
      <div className="cal-dropdowns-group">
        <div className="cal-control-box">
          <label htmlFor="cal-group-by" className="cal-label">Group By:</label>
          <select id="cal-group-by" className="cal-select" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="trip">Trip</option>
            <option value="destination">Destination</option>
            <option value="type">Activity Type</option>
          </select>
        </div>

        <div className="cal-control-box">
          <label htmlFor="cal-filter" className="cal-label">Filter:</label>
          <select id="cal-filter" className="cal-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="travel">Travel</option>
            <option value="hotel">Hotel</option>
            <option value="food">Food</option>
            <option value="activity">Activity</option>
          </select>
        </div>

        <div className="cal-control-box">
          <label htmlFor="cal-sort-by" className="cal-label">Sort By:</label>
          <select id="cal-sort-by" className="cal-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="name">Trip Name</option>
            <option value="destination">Destination</option>
          </select>
        </div>
      </div>
    </div>
  );
}
