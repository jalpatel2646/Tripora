import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DestinationCard from '../components/DestinationCard';
import TripCard from '../components/TripCard';
import './Home.css';

// Import local banner image
import bannerImage from '../assets/tripora_banner.jpg';
import jaipurImage from '../assets/jaipur.jpg';
import ladakhImage from '../assets/ladakh.jpg';

// Dummy Destination Data
const DESTINATIONS_DATA = [
  { id: 1, name: 'Goa', country: 'India', rating: 4.8, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Manali', country: 'India', rating: 4.6, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Jaipur', country: 'India', rating: 4.7, image: jaipurImage },
  { id: 4, name: 'Kerala', country: 'India', rating: 4.5, image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Ladakh', country: 'India', rating: 4.9, image: ladakhImage }
];

// Dummy Previous Trips Data
const TRIPS_DATA = [
  {
    id: 1,
    name: 'Goa Getaway',
    destination: 'Goa, India',
    dates: '12 Dec – 17 Dec',
    duration: '5 Days',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Rajasthan Adventure',
    destination: 'Jaipur → Jodhpur → Udaipur',
    dates: '20 Jan – 27 Jan',
    duration: '7 Days',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Mountain Escape',
    destination: 'Manali, India',
    dates: '08 Feb – 13 Feb',
    duration: '5 Days',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Home() {
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy]       = useState('None');
  const [filterType, setFilterType]   = useState('All');
  const [sortBy, setSortBy]           = useState('Popular');

  // Filter/Search Logic for Regional Selections
  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Rating') return b.rating - a.rating;
    return 0; // Default popularity / natural sorting
  });

  // Filter/Search Logic for Trips
  const filteredTrips = TRIPS_DATA.filter((trip) => {
    return trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCreateTripClick = () => {
    navigate('/create-trip');
  };

  return (
    <div className="home-page-container">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="home-main-content">
        <div className="home-layout-wrapper">

          {/* ── 2. Hero Banner Section ── */}
          <section className="hero-banner" aria-labelledby="banner-heading">
            <div className="banner-bg-wrapper">
              <img src={bannerImage} alt="Travel Road Banner" className="banner-bg-img" />
              <div className="banner-overlay" />
            </div>
            <div className="banner-content">
              <h1 id="banner-heading" className="banner-title">
                Where will your next journey take you?
              </h1>
              <p className="banner-subtitle">
                Plan unforgettable trips, discover new destinations, and keep everything organized in one place.
              </p>
              <div className="banner-btn-group">
                <button
                  type="button"
                  className="banner-btn"
                  onClick={handleCreateTripClick}
                >
                  Plan Manually
                </button>
                <button
                  type="button"
                  className="banner-btn ai-btn"
                  onClick={() => navigate('/ai-planner')}
                >
                  Plan with AI ✨
                </button>
              </div>
            </div>
          </section>

          {/* ── 3. Search and Filter Section ── */}
          <section className="search-filter-section" aria-label="Search and filter controls">
            <div className="search-bar-wrap">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search destinations, trips or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="controls-group">
              {/* Group By Selector */}
              <div className="dropdown-control">
                <span className="control-label" id="group-by-label">Group By:</span>
                <select
                  aria-labelledby="group-by-label"
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="control-select"
                >
                  <option value="None">None</option>
                  <option value="Country">Country</option>
                  <option value="Type">Trip Type</option>
                </select>
              </div>

              {/* Filter Selector */}
              <div className="dropdown-control">
                <span className="control-label" id="filter-label">Filter:</span>
                <select
                  aria-labelledby="filter-label"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="control-select"
                >
                  <option value="All">All Types</option>
                  <option value="Beaches">Beaches</option>
                  <option value="Mountains">Mountains</option>
                  <option value="Heritage">Heritage</option>
                </select>
              </div>

              {/* Sort By Selector */}
              <div className="dropdown-control">
                <span className="control-label" id="sort-by-label">Sort By:</span>
                <select
                  aria-labelledby="sort-by-label"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="control-select"
                >
                  <option value="Popular">Popular</option>
                  <option value="Rating">Rating</option>
                  <option value="Alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          </section>

          {/* ── 4. Top Regional Selections ── */}
          <section className="regional-selections" aria-labelledby="regional-heading">
            <header className="section-header">
              <h2 id="regional-heading" className="section-title">Top Regional Selections</h2>
              <a href="#view-all" className="view-all-link">View All →</a>
            </header>

            <div className="destinations-scroll-container">
              <div className="destinations-row">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      name={dest.name}
                      country={dest.country}
                      image={dest.image}
                      rating={dest.rating}
                    />
                  ))
                ) : (
                  <p className="no-results-msg">No destinations found matching your search.</p>
                )}
              </div>
            </div>
          </section>

          {/* ── 5. Previous Trips Section ── */}
          <section className="previous-trips-section" aria-labelledby="trips-heading">
            <header className="section-header">
              <h2 id="trips-heading" className="section-title">Your Trips</h2>
              {/* Plan a Trip button inline with heading */}
              <div className="plan-trip-btn-wrapper">
                <button
                  type="button"
                  className="plan-trip-btn"
                  onClick={handleCreateTripClick}
                  aria-label="Create a new trip plan manually"
                >
                  Plan Manually
                </button>
                <button
                  type="button"
                  className="plan-trip-btn ai-btn"
                  onClick={() => navigate('/ai-planner')}
                  aria-label="Create a new trip plan with AI"
                >
                  Plan with AI ✨
                </button>
              </div>
            </header>

            <div className="trips-grid">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    name={trip.name}
                    destination={trip.destination}
                    dates={trip.dates}
                    duration={trip.duration}
                    image={trip.image}
                    status={trip.status}
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  />
                ))
              ) : (
                <p className="no-results-msg">No trips found matching your search.</p>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}