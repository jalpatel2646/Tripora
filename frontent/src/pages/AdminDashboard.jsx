import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import AdminControls from '../components/AdminControls';
import AdminTabs from '../components/AdminTabs';
import StatCard from '../components/StatCard';
import UserTable from '../components/UserTable';
import CityAnalytics from '../components/CityAnalytics';
import ActivityAnalytics from '../components/ActivityAnalytics';
import UserTrends from '../components/UserTrends';
import { Users, Compass, MapPin, Activity } from 'lucide-react';
import './AdminDashboard.css';

// ── Dummy Insights & Activity ───────────────────────────────────────────────
const QUICK_INSIGHTS = [
  { label: 'Popular City', value: 'Goa' },
  { label: 'Top Activity', value: 'Sightseeing' },
  { label: 'Active Month', value: 'December' },
  { label: 'Active Users', value: '10,420' }
];

const RECENT_ACTIVITIES = [
  { id: 1, text: 'Aarav Shah created "Goa Escape"', time: '2 min ago' },
  { id: 2, text: 'Riya added Water Sports to Goa itinerary', time: '10 min ago' },
  { id: 3, text: 'Karan Malhotra joined Tripora', time: '25 min ago' },
  { id: 4, text: 'Meera Nair published Kerala Budget Tips', time: '1 hr ago' }
];

// ── Dummy Users List ─────────────────────────────────────────────────────────
const INITIAL_USERS = [
  { id: 1, name: 'Vishwa Patel', email: 'vishwa@example.com', city: 'Ahmedabad', trips: 8, joinedDate: '12 Aug 2026', status: 'Active' },
  { id: 2, name: 'Aarav Shah', email: 'aarav@example.com', city: 'Surat', trips: 5, joinedDate: '02 Aug 2026', status: 'Active' },
  { id: 3, name: 'Priya Mehta', email: 'priya@example.com', city: 'Mumbai', trips: 14, joinedDate: '28 Jul 2026', status: 'Active' },
  { id: 4, name: 'Rohan Verma', email: 'rohan@example.com', city: 'Pune', trips: 3, joinedDate: '15 Jul 2026', status: 'Disabled' },
  { id: 5, name: 'Meera Nair', email: 'meera@example.com', city: 'Kochi', trips: 9, joinedDate: '10 Jul 2026', status: 'Active' },
  { id: 6, name: 'Kabir Singh', email: 'kabir@example.com', city: 'Delhi', trips: 2, joinedDate: '05 Jul 2026', status: 'Active' },
  { id: 7, name: 'Ananya Roy', email: 'ananya@example.com', city: 'Kolkata', trips: 11, joinedDate: '22 Jun 2026', status: 'Active' },
  { id: 8, name: 'Siddharth Rao', email: 'sid@example.com', city: 'Bengaluru', trips: 0, joinedDate: '18 Jun 2026', status: 'Disabled' }
];

// ── Dummy Analytics Data ─────────────────────────────────────────────────────
const CITY_DATA = [
  { name: 'Goa', trips: 820 },
  { name: 'Jaipur', trips: 650 },
  { name: 'Mumbai', trips: 610 },
  { name: 'Manali', trips: 540 },
  { name: 'Kerala', trips: 490 }
];

const ACTIVITY_DATA = [
  { name: 'Sightseeing', value: 35 },
  { name: 'Food Tours', value: 25 },
  { name: 'Water Sports', value: 20 },
  { name: 'Hiking', value: 12 },
  { name: 'Shopping', value: 8 }
];

const USER_GROWTH = [
  { month: 'Jan', users: 320 },
  { month: 'Feb', users: 450 },
  { month: 'Mar', users: 410 },
  { month: 'Apr', users: 580 },
  { month: 'May', users: 640 },
  { month: 'Jun', users: 790 }
];

const TRIPS_CREATED = [
  { month: 'Jan', trips: 180 },
  { month: 'Feb', trips: 240 },
  { month: 'Mar', trips: 220 },
  { month: 'Apr', trips: 310 },
  { month: 'May', trips: 350 },
  { month: 'Jun', trips: 420 }
];

const PLATFORM_USAGE = [
  { name: 'Trip Planning', value: 40 },
  { name: 'City Search', value: 22 },
  { name: 'Activity Search', value: 18 },
  { name: 'Community', value: 12 },
  { name: 'Calendar', value: 8 }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  // Search & filter states
  const [search, setSearch]   = useState('');
  const [groupBy, setGroupBy] = useState('user');
  const [filter, setFilter]   = useState('all');
  const [sortBy, setSortBy]   = useState('mostPopular');

  // Users state (local mutations)
  const [users, setUsers] = useState(INITIAL_USERS);

  // Actions for User Management
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u
      )
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Search & Filter Processors for Users list
  const processedUsers = useMemo(() => {
    let list = [...users];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q)
      );
    }

    // Filter selector
    if (filter === 'active') {
      list = list.filter((u) => u.status === 'Active');
    } else if (filter === 'new') {
      // Users who registered in August
      list = list.filter((u) => u.joinedDate.includes('Aug'));
    }

    // Sort selector
    list.sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'oldest') return a.id - b.id;
      if (sortBy === 'highestEngagement') return b.trips - a.trips;
      // Default: sort by trip count (most popular)
      return b.trips - a.trips;
    });

    return list;
  }, [users, search, filter, sortBy]);

  // Cities data processed (Search filter)
  const processedCities = useMemo(() => {
    if (activeTab === 'cities' && search.trim()) {
      return CITY_DATA.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    return CITY_DATA;
  }, [activeTab, search]);

  // Activities data processed (Search filter)
  const processedActivities = useMemo(() => {
    if (activeTab === 'activities' && search.trim()) {
      return ACTIVITY_DATA.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
    }
    return ACTIVITY_DATA;
  }, [activeTab, search]);

  return (
    <div className="adm-dashboard-container">
      {/* Navbar */}
      <Navbar />

      <main className="adm-main">
        <div className="adm-layout-width">

          {/* Page Title Header */}
          <header className="adm-page-header">
            <div className="adm-title-row">
              <h1 className="adm-title">Admin Dashboard</h1>
              <span className="adm-badge">Admin</span>
            </div>
            <p className="adm-subtitle">Monitor users, trips and platform performance.</p>
          </header>

          {/* Search controls */}
          <AdminControls
            search={search} setSearch={setSearch}
            groupBy={groupBy} setGroupBy={setGroupBy}
            filter={filter}   setFilter={setFilter}
            sortBy={sortBy}   setSortBy={setSortBy}
            activeTab={activeTab}
          />

          {/* Tab Navigation buttons */}
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Overview stat summary cards */}
          <section className="adm-stats-row" aria-label="Quick statistics">
            <StatCard title="Total Users" value="12,480" change="+8.4%" icon={<Users size={18} />} />
            <StatCard title="Total Trips" value="5,630" change="+12.1%" icon={<Compass size={18} />} />
            <StatCard title="Cities Explored" value="142" change="+4.2%" icon={<MapPin size={18} />} />
            <StatCard title="Activities Added" value="18,920" change="+6.8%" icon={<Activity size={18} />} />
          </section>

          {/* Main Content Area */}
          <div className="adm-content-wrapper">
            {activeTab === 'users' && (
              <UserTable
                users={processedUsers}
                onToggleStatus={handleToggleStatus}
                onDeleteUser={handleDeleteUser}
              />
            )}

            {activeTab === 'cities' && (
              <CityAnalytics data={processedCities} />
            )}

            {activeTab === 'activities' && (
              <ActivityAnalytics data={processedActivities} />
            )}

            {activeTab === 'analytics' && (
              <UserTrends
                userGrowthData={USER_GROWTH}
                tripsCreatedData={TRIPS_CREATED}
                platformUsageData={PLATFORM_USAGE}
              />
            )}
          </div>

          {/* Quick Insights Row */}
          <section className="adm-insights-section">
            <h3 className="adm-section-heading">Quick Insights</h3>
            <div className="adm-insights-grid">
              {QUICK_INSIGHTS.map((insight) => (
                <div key={insight.label} className="adm-insight-card">
                  <span className="adm-insight-label">{insight.label}</span>
                  <span className="adm-insight-val">{insight.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Platform Activity */}
          <section className="adm-activity-section">
            <header className="adm-section-header">
              <h3 className="adm-section-heading">Recent Activity</h3>
              <button type="button" className="adm-view-all-btn">View all</button>
            </header>
            <div className="adm-activity-card">
              <div className="adm-activity-list">
                {RECENT_ACTIVITIES.map((act) => (
                  <div key={act.id} className="adm-activity-row">
                    <span className="adm-activity-text">{act.text}</span>
                    <span className="adm-activity-time">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
