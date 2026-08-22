import React from 'react';
import './TripFilters.css';

export default function TripFilters({
  search,
  setSearch,
  groupBy,
  setGroupBy,
  filter,
  setFilter,
  sortBy,
  setSortBy
}) {
  return (
    <div className="trip-filters-container" role="region" aria-label="Trip filtering controls">
      {/* Search Bar */}
      <div className="tf-search-bar">
        <span className="tf-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="tf-search-input"
          placeholder="Search your trips by name, destination, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search trips input"
        />
        {search && (
          <button
            type="button"
            className="tf-clear-btn"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Control Dropdowns */}
      <div className="tf-controls-group">
        {/* Group By */}
        <div className="tf-control">
          <label htmlFor="tf-group-by" className="tf-label">Group By:</label>
          <select
            id="tf-group-by"
            className="tf-select"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="status">Status</option>
            <option value="month">Month</option>
            <option value="destination">Destination</option>
          </select>
        </div>

        {/* Filter */}
        <div className="tf-control">
          <label htmlFor="tf-filter" className="tf-label">Filter:</label>
          <select
            id="tf-filter"
            className="tf-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Trips</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="tf-control">
          <label htmlFor="tf-sort-by" className="tf-label">Sort By:</label>
          <select
            id="tf-sort-by"
            className="tf-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="startDate">Start Date</option>
            <option value="name">Trip Name</option>
            <option value="budget">Budget</option>
          </select>
        </div>
      </div>
    </div>
  );
}
