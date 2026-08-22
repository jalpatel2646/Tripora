import React from 'react';
import './ItineraryControls.css';

export default function ItineraryControls({
  search,
  setSearch,
  groupBy,
  setGroupBy,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode
}) {
  return (
    <div className="ic-controls-container" role="region" aria-label="Itinerary controls">
      {/* Search Bar */}
      <div className="ic-search-bar">
        <span className="ic-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="ic-search-input"
          placeholder="Search itinerary activities by name, city, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search itinerary activities"
        />
        {search && (
          <button
            type="button"
            className="ic-clear-btn"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Controls & View Mode Toggle */}
      <div className="ic-controls-right">
        {/* Dropdowns */}
        <div className="ic-dropdowns-group">
          {/* Group By */}
          <div className="ic-control-box">
            <label htmlFor="ic-group-by" className="ic-label">Group By:</label>
            <select
              id="ic-group-by"
              className="ic-select"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="day">Day</option>
              <option value="city">City</option>
              <option value="type">Activity Type</option>
            </select>
          </div>

          {/* Filter */}
          <div className="ic-control-box">
            <label htmlFor="ic-filter" className="ic-label">Filter:</label>
            <select
              id="ic-filter"
              className="ic-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="travel">Travel</option>
              <option value="hotel">Hotel</option>
              <option value="food">Food</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="adventure">Adventure</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="ic-control-box">
            <label htmlFor="ic-sort-by" className="ic-label">Sort By:</label>
            <select
              id="ic-sort-by"
              className="ic-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="time">Time</option>
              <option value="expenseLow">Expense: Low to High</option>
              <option value="expenseHigh">Expense: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle (List vs Calendar) */}
        <div className="ic-view-mode-tabs" role="tablist" aria-label="View Mode Switcher">
          <button
            type="button"
            className={`ic-view-btn${viewMode === 'list' ? ' is-active' : ''}`}
            onClick={() => setViewMode('list')}
            role="tab"
            aria-selected={viewMode === 'list'}
          >
            📋 List
          </button>
          <button
            type="button"
            className={`ic-view-btn${viewMode === 'calendar' ? ' is-active' : ''}`}
            onClick={() => setViewMode('calendar')}
            role="tab"
            aria-selected={viewMode === 'calendar'}
          >
            📅 Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
