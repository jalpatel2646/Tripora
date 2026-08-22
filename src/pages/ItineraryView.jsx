import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ItineraryControls from '../components/ItineraryControls';
import ItineraryDay from '../components/ItineraryDay';
import BudgetSummary from '../components/BudgetSummary';
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
  // Filter & Search Controls State
  const [search, setSearch]     = useState('');
  const [groupBy, setGroupBy]   = useState('day');
  const [filter, setFilter]     = useState('all');
  const [sortBy, setSortBy]     = useState('time');
  const [viewMode, setViewMode] = useState('list');

  const plannedBudget = 50000;

  // Process itinerary filter and sort logic
  const getProcessedDays = () => {
    return INITIAL_ITINERARY.map((dayObj) => {
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
  const totalExpense = INITIAL_ITINERARY.reduce((tripTotal, dayObj) => {
    return tripTotal + dayObj.activities.reduce((dayTotal, act) => dayTotal + (parseFloat(act.expense) || 0), 0);
  }, 0);

  // Calculate totals by category
  const categoryTotals = INITIAL_ITINERARY.reduce((acc, dayObj) => {
    dayObj.activities.forEach((act) => {
      const typeKey = act.type.toLowerCase();
      acc[typeKey] = (acc[typeKey] || 0) + (parseFloat(act.expense) || 0);
    });
    return acc;
  }, {});

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
            <div className="iv-header-main">
              <h1 className="iv-trip-title">Itinerary for Goa Escape</h1>
              <p className="iv-trip-route">📍 Ahmedabad → Mumbai → Goa</p>
            </div>

            <div className="iv-header-meta-row">
              <div className="iv-meta-badge">📅 12 Aug – 20 Aug</div>
              <div className="iv-meta-badge">⏱ 8 Days • 3 Cities</div>
              <div className="iv-meta-badge iv-budget-badge">
                💰 Total Budget: <strong>₹{totalExpense.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </header>

          {/* ── 4 - 9. Main Itinerary Day-wise List (Or Calendar Placeholder) ── */}
          {viewMode === 'list' ? (
            <div className="iv-main-itinerary-area">
              <div className="iv-columns-header">
                <span className="col-label-left">Physical Activity & Timeline</span>
                <span className="col-label-right">Expense</span>
              </div>

              {processedDays.length > 0 ? (
                <div className="iv-days-list">
                  {processedDays.map((dayData) => (
                    <ItineraryDay key={dayData.day} dayData={dayData} />
                  ))}
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

          {/* ── 10 - 12. Trip Budget Summary Section ── */}
          <BudgetSummary
            categoryTotals={categoryTotals}
            totalExpense={totalExpense}
            plannedBudget={plannedBudget}
          />

        </div>
      </main>
    </div>
  );
}
