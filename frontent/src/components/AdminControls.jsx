import React from 'react';
import './AdminControls.css';

export default function AdminControls({
  search, setSearch,
  groupBy, setGroupBy,
  filter, setFilter,
  sortBy, setSortBy,
  activeTab
}) {
  const showGroupBy = activeTab === 'users';

  return (
    <div className="adm-controls-wrapper" role="region" aria-label="Admin controls">
      {/* Search Bar */}
      <div className="adm-search-bar">
        <span className="adm-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="adm-search-input"
          placeholder="Search users, cities or activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search admin panel"
        />
        {search && (
          <button type="button" className="adm-clear-btn" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Dropdowns */}
      <div className="adm-dropdowns-group">
        {showGroupBy && (
          <div className="adm-control-box">
            <label htmlFor="adm-group-by" className="adm-label">Group By:</label>
            <select id="adm-group-by" className="adm-select" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="user">User</option>
              <option value="city">City</option>
              <option value="activity">Activity</option>
              <option value="month">Month</option>
            </select>
          </div>
        )}

        <div className="adm-control-box">
          <label htmlFor="adm-filter" className="adm-label">Filter:</label>
          <select id="adm-filter" className="adm-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active Users</option>
            <option value="new">New Users</option>
            <option value="popular-cities">Popular Cities</option>
            <option value="popular-activities">Popular Activities</option>
          </select>
        </div>

        <div className="adm-control-box">
          <label htmlFor="adm-sort-by" className="adm-label">Sort By:</label>
          <select id="adm-sort-by" className="adm-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="mostPopular">Most Popular</option>
            <option value="leastPopular">Least Popular</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highestEngagement">Highest Engagement</option>
          </select>
        </div>
      </div>
    </div>
  );
}
