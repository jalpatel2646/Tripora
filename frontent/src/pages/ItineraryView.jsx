import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ItineraryControls from '../components/ItineraryControls';
import ItineraryDay from '../components/ItineraryDay';
import BudgetSummary from '../components/BudgetSummary';
import TripWeatherSummary from '../components/weather/TripWeatherSummary';
import { getTripWeather, getWeatherSuitability } from '../services/weatherService';
import './ItineraryView.css';

// Initial Itinerary Dummy Data
const INITIAL_ITINERARY = [
  {
    day: 1,
    date: '12 Aug 2026',
    city: 'Mumbai',
    activities: [
      {
        id: 1,
        time: '09:00 AM',
        name: 'Ahmedabad to Mumbai Flight',
        type: 'Travel',
        duration: '1h 20m',
        description: 'Flight from Ahmedabad Airport to Mumbai.',
        expense: 4500
      },
      {
        id: 2,
        time: '01:00 PM',
        name: 'Hotel Check-in & Rest',
        type: 'Hotel',
        duration: '1 Day',
        description: 'Stay at Taj Lands End, Mumbai.',
        expense: 3000
      },
      {
        id: 3,
        time: '06:00 PM',
        name: 'Marine Drive Sunset Walk',
        type: 'Sightseeing',
        duration: '2 Hours',
        description: 'Evening stroll along the Queen\'s Necklace coastline.',
        expense: 0
      }
    ]
  },
  {
    day: 2,
    date: '13 Aug 2026',
    city: 'Goa',
    activities: [
      {
        id: 4,
        time: '08:30 AM',
        name: 'Mumbai to Goa Connecting Flight',
        type: 'Travel',
        duration: '1h 15m',
        description: 'Morning flight to Dabolim Airport, Goa.',
        expense: 2500
      },
      {
        id: 5,
        time: '02:00 PM',
        name: 'Beachside Resort Check-in',
        type: 'Hotel',
        duration: '2 Days',
        description: 'Check-in at Baga Beach Luxury Resort.',
        expense: 6000
      },
      {
        id: 6,
        time: '05:30 PM',
        name: 'Baga Beach Sunset & Seafood Dinner',
        type: 'Food',
        duration: '3 Hours',
        description: 'Dinner and fresh candlelit seafood at beach shacks.',
        expense: 1800
      }
    ]
  },
  {
    day: 3,
    date: '14 Aug 2026',
    city: 'Goa',
    activities: [
      {
        id: 7,
        time: '10:00 AM',
        name: 'Water Sports & Parasailing',
        type: 'Adventure',
        duration: '3 Hours',
        description: 'Jet ski, banana ride and parasailing package at Calangute.',
        expense: 2800
      },
      {
        id: 8,
        time: '03:00 PM',
        name: 'Fort Aguada Heritage Tour',
        type: 'Sightseeing',
        duration: '2 Hours',
        description: 'Explore historic 17th-century Portuguese lighthouse & fort.',
        expense: 400
      },
      {
        id: 9,
        time: '07:30 PM',
        name: 'Anjuna Flea Market Souvenir Shopping',
        type: 'Shopping',
        duration: '2.5 Hours',
        description: 'Shopping handicrafts, spices, and local souvenirs.',
        expense: 1500
      }
    ]
  }
];

export default function ItineraryView() {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY);
  const [weatherData, setWeatherData] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(true);

  // Filter & Search Controls State
  const [search, setSearch]     = useState('');
  const [groupBy, setGroupBy]   = useState('day');
  const [filter, setFilter]     = useState('all');
  const [sortBy, setSortBy]     = useState('time');
  const [viewMode, setViewMode] = useState('list');

  const plannedBudget = 50000;

  useEffect(() => {
    getTripWeather(itinerary).then((res) => {
      setWeatherData(res);
      setLoadingWeather(false);
    });
  }, []);

  // Callback to replace an activity with an indoor alternative
  const handleReplaceActivity = (dayNum, oldActivityId, newAlt) => {
    const updated = itinerary.map((dayObj) => {
      if (dayObj.day !== dayNum) return dayObj;
      const activities = dayObj.activities.map((act) => {
        if (act.id !== oldActivityId) return act;
        return {
          id: `alt-${Date.now()}`,
          time: act.time,
          name: newAlt.name,
          type: newAlt.type,
          duration: newAlt.duration,
          description: newAlt.description,
          expense: newAlt.cost
        };
      });
      return { ...dayObj, activities };
    });
    setItinerary(updated);
  };

  // Callback to reschedule an activity to another day
  const handleMoveActivity = (fromDayNum, toDayNum, activity) => {
    const updated = itinerary.map((dayObj) => {
      if (dayObj.day === fromDayNum) {
        return {
          ...dayObj,
          activities: dayObj.activities.filter((act) => act.id !== activity.id)
        };
      }
      if (dayObj.day === toDayNum) {
        // Find existing activities for the day to sort by time properly
        const activities = [...dayObj.activities, { ...activity, id: `move-${Date.now()}` }];
        return { ...dayObj, activities };
      }
      return dayObj;
    });
    setItinerary(updated);
  };

  // Process itinerary filter and sort logic
  const getProcessedDays = () => {
    return itinerary.map((dayObj) => {
      let activities = [...dayObj.activities];

      // 1. Search Filter
      if (search.trim()) {
        const q = search.toLowerCase();
        activities = activities.filter(
          (act) =>
            act.name.toLowerCase().includes(q) ||
            act.type.toLowerCase().includes(q) ||
            (act.description && act.description.toLowerCase().includes(q)) ||
            dayObj.city.toLowerCase().includes(q)
        );
      }

      // 2. Type Filter
      if (filter !== 'all') {
        activities = activities.filter((act) => act.type.toLowerCase() === filter.toLowerCase());
      }

      // 3. Sorting
      activities.sort((a, b) => {
        if (sortBy === 'expenseLow') return a.expense - b.expense;
        if (sortBy === 'expenseHigh') return b.expense - a.expense;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // Default time ordering
      });

      return { ...dayObj, activities };
    }).filter((dayObj) => dayObj.activities.length > 0);
  };

  const processedDays = getProcessedDays();

  // Calculate dynamic overall total expense
  const totalExpense = itinerary.reduce((tripTotal, dayObj) => {
    return tripTotal + dayObj.activities.reduce((dayTotal, act) => dayTotal + (parseFloat(act.expense) || 0), 0);
  }, 0);

  // Calculate totals by category
  const categoryTotals = itinerary.reduce((acc, dayObj) => {
    dayObj.activities.forEach((act) => {
      const typeKey = act.type.toLowerCase();
      acc[typeKey] = (acc[typeKey] || 0) + (parseFloat(act.expense) || 0);
    });
    return acc;
  }, {});

  const totalActivitiesCount = itinerary.reduce((sum, d) => sum + d.activities.length, 0);

  // Analyze itinerary suitability to count poor weather occurrences
  const getAffectedCount = () => {
    let count = 0;
    if (loadingWeather) return 0;
    itinerary.forEach((dayObj) => {
      const weather = weatherData[dayObj.day];
      if (!weather) return;
      dayObj.activities.forEach((act) => {
        if (getWeatherSuitability(act, weather) === 'POOR') {
          count++;
        }
      });
    });
    return count;
  };

  const affectedCount = getAffectedCount();

  return (
    <div className="iv-page-container">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="iv-main">
        <div className="iv-layout-wrapper">

          {/* ── 2. Search and Controls Row ── */}
          <ItineraryControls
            search={search}
            setSearch={setSearch}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* ── 3. Itinerary Header ── */}
          <header className="iv-trip-header">
            <div className="iv-header-top-row">
              <span className="iv-header-subtitle-label">YOUR ITINERARY</span>
              <div className="iv-header-actions">
                <button type="button" className="btn-action-ghost">Edit</button>
                <button type="button" className="btn-action-ghost">Share</button>
                <button
                  type="button"
                  className="btn-action-packing"
                  onClick={() => navigate('/trip/1/packing')}
                >
                  🧳 Packing List
                </button>
                <button type="button" className="btn-action-dots" aria-label="More options">•••</button>
              </div>
            </div>

            <h1 className="iv-trip-title">Goa Escape</h1>

            {/* Route Visualization */}
            <div className="iv-route-visualization" aria-label="Trip Route">
              <div className="iv-route-point">
                <span className="iv-route-dot"></span>
                <span className="iv-route-city">Ahmedabad</span>
              </div>
              <div className="iv-route-line"></div>
              <div className="iv-route-point">
                <span className="iv-route-dot"></span>
                <span className="iv-route-city">Mumbai</span>
              </div>
              <div className="iv-route-line"></div>
              <div className="iv-route-point">
                <span className="iv-route-dot"></span>
                <span className="iv-route-city">Goa</span>
              </div>
            </div>

            {/* Simplified Trip Info */}
            <div className="iv-trip-info-summary">
              <div className="iv-info-block">
                <span className="iv-info-label">DATES</span>
                <span className="iv-info-value">12 Aug — 20 Aug</span>
              </div>
              <div className="iv-info-block">
                <span className="iv-info-label">DURATION</span>
                <span className="iv-info-value">8 Days • 3 Cities</span>
              </div>
              <div className="iv-info-block iv-budget-block">
                <span className="iv-info-label">TOTAL BUDGET</span>
                <span className="iv-info-value">₹{totalExpense.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trip Progress */}
            <div className="iv-trip-progress-container">
              <div className="iv-progress-text-row">
                <span className="iv-progress-label">Trip Progress</span>
                <span className="iv-progress-val">Day 1 of 8 (12%)</span>
              </div>
              <div className="iv-progress-bar-track">
                <div className="iv-progress-bar-fill" style={{ width: '12.5%' }}></div>
              </div>
            </div>
          </header>

          {!loadingWeather && (
            <TripWeatherSummary
              weatherData={weatherData}
              itinerary={itinerary}
              affectedCount={affectedCount}
              onReplaceActivity={handleReplaceActivity}
              onMoveActivity={handleMoveActivity}
            />
          )}

          {/* ── 4 - 9. Main Itinerary Day-wise List (Or Calendar Placeholder) ── */}
          {viewMode === 'list' ? (
            <div className="iv-content-layout">
              <div className="iv-main-itinerary-area">
                <div className="iv-section-title-row">
                  <h2 className="iv-section-title">Your Itinerary</h2>
                  <span className="iv-section-subtitle">
                    {processedDays.length} {processedDays.length === 1 ? 'day' : 'days'} • {totalActivitiesCount} {totalActivitiesCount === 1 ? 'activity' : 'activities'}
                  </span>
                </div>

                {processedDays.length > 0 ? (
                  <div className="iv-days-list">
                    {processedDays.map((dayData) => {
                      const otherDays = itinerary
                        .filter((d) => d.day !== dayData.day)
                        .map((d) => ({
                          day: d.day,
                          date: d.date,
                          weather: weatherData[d.day]
                        }));

                      return (
                        <ItineraryDay
                          key={dayData.day}
                          dayData={dayData}
                          weather={weatherData[dayData.day]}
                          otherDays={otherDays}
                          onReplaceActivity={(actId, newAlt) => handleReplaceActivity(dayData.day, actId, newAlt)}
                          onMoveActivity={handleMoveActivity}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="iv-empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No activities match your filter</h3>
                    <p>Try clearing your search terms or choosing "All Types".</p>
                    <button
                      type="button"
                      className="iv-reset-btn"
                      onClick={() => {
                        setSearch('');
                        setFilter('all');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <aside className="iv-sidebar-column">
                <BudgetSummary
                  categoryTotals={categoryTotals}
                  totalExpense={totalExpense}
                  plannedBudget={plannedBudget}
                />
              </aside>
            </div>
          ) : (
            /* Calendar View Placeholder */
            <div className="iv-calendar-placeholder">
              <div className="cal-icon">📅</div>
              <h2>Calendar View Mode</h2>
              <p>Visual monthly calendar grid showing August 12 – August 20 timeline slots.</p>
              <button
                type="button"
                className="iv-reset-btn"
                onClick={() => setViewMode('list')}
              >
                Switch back to List View
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
