import React from 'react';
import './SearchControls.css';

export default function SearchControls({
  searchType,
  search,
  setSearch,
  groupBy,
  setGroupBy,
  filter,
  setFilter,
  sortBy,
  setSortBy
}) {
  const isCities = searchType === 'cities';

  return (
    <div className="search-controls-wrapper" role="region" aria-label="Search and filter options">
      {/* Search Input Bar */}
      <div className="sc-search-bar">
        <span className="sc-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="sc-search-input"
          placeholder={isCities ? 'Search cities or destinations...' : 'Search activities or experiences...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={isCities ? 'Search cities' : 'Search activities'}
        />
        {search && (
          <button
            type="button"
            className="sc-clear-btn"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Controls Dropdowns */}
      <div className="sc-dropdowns-group">
        {/* Group By */}
        <div className="sc-control-box">
          <label htmlFor="sc-group-by" className="sc-label">Group By:</label>
          <select
            id="sc-group-by"
            className="sc-select"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            {isCities ? (
              <>
                <option value="all">Country</option>
                <option value="region">Region</option>
                <option value="popularity">Popularity</option>
                <option value="cost">Cost</option>
              </>
            ) : (
              <>
                <option value="all">Category</option>
                <option value="city">City</option>
                <option value="duration">Duration</option>
                <option value="cost">Cost</option>
              </>
            )}
          </select>
        </div>

        {/* Filter */}
        <div className="sc-control-box">
          <label htmlFor="sc-filter" className="sc-label">Filter:</label>
          <select
            id="sc-filter"
            className="sc-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {isCities ? (
              <>
                <option value="all">All Cities</option>
                <option value="India">India</option>
                <option value="International">International</option>
                <option value="Budget Friendly">Budget Friendly</option>
                <option value="Popular">Popular</option>
              </>
            ) : (
              <>
                <option value="all">All Categories</option>
                <option value="Sightseeing">Sightseeing</option>
                <option value="Adventure">Adventure</option>
                <option value="Food">Food</option>
                <option value="Nature">Nature</option>
                <option value="Shopping">Shopping</option>
                <option value="Cultural">Cultural</option>
              </>
            )}
          </select>
        </div>

        {/* Sort By */}
        <div className="sc-control-box">
          <label htmlFor="sc-sort-by" className="sc-label">Sort By:</label>
          <select
            id="sc-sort-by"
            className="sc-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="costLowToHigh">Cost: Low to High</option>
            <option value="costHighToLow">Cost: High to Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}
