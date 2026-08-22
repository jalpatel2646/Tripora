import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TripFilters from '../components/TripFilters';
import TripCard from '../components/TripCard';
import './MyTrips.css';

// Initial Dummy Trips Data
const INITIAL_TRIPS = [
  {
    id: 1,
    name: 'Goa Escape',
    route: 'Ahmedabad → Mumbai → Goa',
    destination: 'Goa, India',
    startDate: '2026-08-12',
    endDate: '2026-08-20',
    dates: '12 Aug – 20 Aug',
    days: 8,
    stops: 3,
    budget: 42000,
    status: 'ongoing',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Rajasthan Adventure',
    route: 'Jaipur → Jodhpur → Udaipur',
    destination: 'Rajasthan, India',
    startDate: '2026-09-10',
    endDate: '2026-09-17',
    dates: '10 Sep – 17 Sep',
    days: 7,
    stops: 3,
    budget: 35000,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Mountain Escape',
    route: 'Manali, India',
    destination: 'Manali, India',
    startDate: '2026-05-15',
    endDate: '2026-05-20',
    dates: '15 May – 20 May',
    days: 5,
    stops: 1,
    budget: 28000,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Kerala Getaway',
    route: 'Kochi → Munnar → Alleppey',
    destination: 'Kerala, India',
    startDate: '2026-03-02',
    endDate: '2026-03-09',
    dates: '2 Mar – 9 Mar',
    days: 7,
    stops: 3,
    budget: 46000,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80'
  }
];

export default function MyTrips() {
  const navigate = useNavigate();

  // Trips State from localStorage or fallback
  const [trips, setTrips] = useState(() => {
    try {
      const stored = localStorage.getItem('tripora_trips');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_TRIPS;
  });

  const saveTrips = (newTrips) => {
    setTrips(newTrips);
    try {
      localStorage.setItem('tripora_trips', JSON.stringify(newTrips));
    } catch (e) {}
  };

  // Filters State
  const [search, setSearch]   = useState('');
  const [groupBy, setGroupBy] = useState('status');
  const [filter, setFilter]   = useState('all');
  const [sortBy, setSortBy]   = useState('newest');

  // Search & Filter & Sorting Logic
  const getProcessedTrips = () => {
    let list = [...trips];

    // 1. Search Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.route.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q)
      );
    }

    // 2. Dropdown Filter
    if (filter !== 'all') {
      list = list.filter((t) => t.status === filter);
    }

    // 3. Sorting Logic
    list.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.startDate) - new Date(a.startDate);
      if (sortBy === 'oldest') return new Date(a.startDate) - new Date(b.startDate);
      if (sortBy === 'startDate') return new Date(a.startDate) - new Date(b.startDate);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'budget') return b.budget - a.budget;
      return 0;
    });

    return list;
  };

  const processedTrips = getProcessedTrips();

  // Categorized lists
  const ongoingTrips   = processedTrips.filter((t) => t.status === 'ongoing');
  const upcomingTrips  = processedTrips.filter((t) => t.status === 'upcoming');
  const completedTrips = processedTrips.filter((t) => t.status === 'completed');

  // Handlers
  const handleViewTrip = (id) => {
    navigate(`/itinerary-view`);
  };

  const handleEditTrip = (id) => {
    navigate(`/create-trip`);
  };

  const handleCopyTrip = (tripToCopy) => {
    const newTrip = {
      ...tripToCopy,
      id: Date.now(),
      name: `${tripToCopy.name} (Copy)`,
      status: 'upcoming'
    };
    saveTrips([newTrip, ...trips]);
    alert(`Copied "${tripToCopy.name}" to your upcoming trips!`);
  };

  const handleDeleteTrip = (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      saveTrips(trips.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="my-trips-page">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="my-trips-main">
        <div className="my-trips-container">

          {/* ── Page Header ── */}
          <header className="my-trips-header">
            <div className="header-left">
              <h1 className="page-title">My Trips</h1>
              <p className="page-subtitle">View and manage all your journeys in one place.</p>
            </div>
            <div className="plan-new-trip-btn-group">
              <button
                type="button"
                className="plan-new-trip-btn"
                onClick={() => navigate('/create-trip')}
              >
                Plan Manually
              </button>
              <button
                type="button"
                className="plan-new-trip-btn ai-btn"
                onClick={() => navigate('/ai-planner')}
              >
                Plan with AI ✨
              </button>
            </div>
          </header>

          {/* ── Search and Filter Controls ── */}
          <TripFilters
            search={search}
            setSearch={setSearch}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* ── All Trips Empty State ── */}
          {processedTrips.length === 0 ? (
            <div className="empty-trips-container">
              <div className="empty-icon">🎒</div>
              <h2 className="empty-title">No trips found</h2>
              <p className="empty-subtitle">
                {search
                  ? 'No trips matched your search criteria.'
                  : "You haven't planned any trips yet. Your next adventure starts here."}
              </p>
              <button
                type="button"
                className="empty-action-btn"
                onClick={() => navigate('/create-trip')}
              >
                + Plan Your First Trip
              </button>
            </div>
          ) : (
            <div className="trips-sections-wrapper">

              {/* ── ONGOING TRIPS ── */}
              {(filter === 'all' || filter === 'ongoing') && (
                <section className="trips-section" aria-labelledby="ongoing-heading">
                  <h2 id="ongoing-heading" className="section-title">
                    Ongoing <span className="section-count">({ongoingTrips.length})</span>
                  </h2>

                  {ongoingTrips.length > 0 ? (
                    <div className="section-cards-list">
                      {ongoingTrips.map((trip) => (
                        <TripCard
                          key={trip.id}
                          variant="wide"
                          {...trip}
                          onView={() => handleViewTrip(trip.id)}
                          onEdit={() => handleEditTrip(trip.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="section-empty-box">
                      <p>No ongoing trips right now.</p>
                      <button
                        type="button"
                        className="section-empty-btn"
                        onClick={() => navigate('/create-trip')}
                      >
                        + Plan a Trip
                      </button>
                    </div>
                  )}
                </section>
              )}

              {/* ── UPCOMING TRIPS ── */}
              {(filter === 'all' || filter === 'upcoming') && (
                <section className="trips-section" aria-labelledby="upcoming-heading">
                  <h2 id="upcoming-heading" className="section-title">
                    Upcoming <span className="section-count">({upcomingTrips.length})</span>
                  </h2>

                  {upcomingTrips.length > 0 ? (
                    <div className="section-cards-list">
                      {upcomingTrips.map((trip) => (
                        <TripCard
                          key={trip.id}
                          variant="wide"
                          {...trip}
                          onView={() => handleViewTrip(trip.id)}
                          onEdit={() => handleEditTrip(trip.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="section-empty-box">
                      <p>No upcoming trips yet.</p>
                      <button
                        type="button"
                        className="section-empty-btn"
                        onClick={() => navigate('/create-trip')}
                      >
                        + Plan a Trip
                      </button>
                    </div>
                  )}
                </section>
              )}

              {/* ── COMPLETED TRIPS ── */}
              {(filter === 'all' || filter === 'completed') && (
                <section className="trips-section" aria-labelledby="completed-heading">
                  <h2 id="completed-heading" className="section-title">
                    Completed <span className="section-count">({completedTrips.length})</span>
                  </h2>

                  {completedTrips.length > 0 ? (
                    <div className="section-cards-list">
                      {completedTrips.map((trip) => (
                        <TripCard
                          key={trip.id}
                          variant="wide"
                          {...trip}
                          onView={() => handleViewTrip(trip.id)}
                          onCopy={() => handleCopyTrip(trip)}
                          onDelete={() => handleDeleteTrip(trip.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="section-empty-box">
                      <p>No completed trips recorded.</p>
                    </div>
                  )}
                </section>
              )}

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
