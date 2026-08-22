import React from 'react';
import './CommunityControls.css';

export default function CommunityControls({
  search, setSearch,
  groupBy, setGroupBy,
  filter, setFilter,
  sortBy, setSortBy
}) {
  return (
    <div className="cc-controls-wrapper" role="region" aria-label="Community search and filters">
      {/* Search Bar */}
      <div className="cc-search-bar">
        <span className="cc-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="cc-search-input"
          placeholder="Search community posts by city, activity, or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search community posts"
        />
        {search && (
          <button type="button" className="cc-clear-btn" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Dropdowns */}
      <div className="cc-dropdowns-group">
        <div className="cc-control-box">
          <label htmlFor="cc-group" className="cc-label">Group By:</label>
          <select id="cc-group" className="cc-select" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="destination">Destination</option>
            <option value="activity">Activity</option>
            <option value="user">User</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="cc-control-box">
          <label htmlFor="cc-filter" className="cc-label">Filter:</label>
          <select id="cc-filter" className="cc-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Posts</option>
            <option value="Travel Story">Travel Stories</option>
            <option value="Activities">Activities</option>
            <option value="Food">Food</option>
            <option value="Hotels">Hotels</option>
            <option value="Adventure">Adventure</option>
            <option value="Budget Tips">Budget Tips</option>
          </select>
        </div>

        <div className="cc-control-box">
          <label htmlFor="cc-sort" className="cc-label">Sort By:</label>
          <select id="cc-sort" className="cc-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostCommented">Most Commented</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
