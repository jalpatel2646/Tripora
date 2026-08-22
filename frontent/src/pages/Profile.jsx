import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileInfo from '../components/ProfileInfo';
import ProfileTripCard from '../components/ProfileTripCard';
import './Profile.css';

// Initial User Data
const INITIAL_USER = {
  firstName: 'Vishwa',
  lastName: 'Patel',
  email: 'vishwa@example.com',
  phone: '+91 98765 43210',
  city: 'Ahmedabad',
  country: 'India',
  profileImage: ''
};

// Initial Preplanned Trips
const PLANNED_TRIPS = [
  {
    id: 101,
    name: 'Goa Escape',
    destination: 'Goa, India',
    date: '12 Sep – 18 Sep',
    days: 6,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 102,
    name: 'Himachal Expedition',
    destination: 'Manali & Shimla',
    date: '05 Oct – 12 Oct',
    days: 8,
    status: 'Preplanned',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 103,
    name: 'Rajasthan Weekend',
    destination: 'Jaipur, India',
    date: '24 Oct – 27 Oct',
    days: 4,
    status: 'Preplanned',
    image: 'https://images.unsplash.com/photo-1477587458883-471a5ed942e5?auto=format&fit=crop&w=400&q=80'
  }
];

// Initial Previous Trips
const PREVIOUS_TRIPS = [
  {
    id: 201,
    name: 'Rajasthan Adventure',
    destination: 'Jaipur → Jodhpur → Udaipur',
    date: '10 Jan – 17 Jan',
    days: 7,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 202,
    name: 'Kerala Getaway',
    destination: 'Kochi → Munnar → Alleppey',
    date: '02 Mar – 09 Mar',
    days: 8,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 203,
    name: 'Mountain Escape',
    destination: 'Manali, India',
    date: '15 May – 20 May',
    days: 5,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
  }
];

// Saved Destinations Chips
const SAVED_DESTINATIONS = [
  { id: 1, name: 'Goa', country: 'India', icon: '🏖️' },
  { id: 2, name: 'Manali', country: 'India', icon: '🏔️' },
  { id: 3, name: 'Jaipur', country: 'India', icon: '🏰' },
  { id: 4, name: 'Kerala', country: 'India', icon: '🌴' },
  { id: 5, name: 'Ladakh', country: 'India', icon: '🏞️' },
  { id: 6, name: 'Kashmir', country: 'India', icon: '❄️' }
];

export default function Profile() {
  const navigate = useNavigate();

  // User State
  const [user, setUser]           = useState(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);

  // Account Preferences State
  const [language, setLanguage]           = useState('English');
  const [notifications, setNotifications] = useState(true);

  const handleSaveUser = (updatedData) => {
    setUser(updatedData);
  };

  const handleViewTrip = (trip) => {
    navigate('/itinerary-view');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('WARNING: Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion requested. Returning to login page.');
      navigate('/login');
    }
  };

  return (
    <div className="profile-page-container">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="profile-main">
        <div className="profile-card-container">

          {/* ── 3. User Profile Section ── */}
          <ProfileInfo
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onSaveUser={handleSaveUser}
          />

          {/* ── 5. Preplanned Trips Section ── */}
          <section className="profile-section" aria-labelledby="preplanned-heading">
            <header className="profile-section-header">
              <h2 id="preplanned-heading" className="profile-section-title">Preplanned Trips</h2>
            </header>
            <div className="profile-trips-grid">
              {PLANNED_TRIPS.map((trip) => (
                <ProfileTripCard key={trip.id} trip={trip} onView={handleViewTrip} />
              ))}
            </div>
          </section>

          {/* ── 6. Previous Trips Section ── */}
          <section className="profile-section" aria-labelledby="previous-heading">
            <header className="profile-section-header">
              <h2 id="previous-heading" className="profile-section-title">Previous Trips</h2>
            </header>
            <div className="profile-trips-grid">
              {PREVIOUS_TRIPS.map((trip) => (
                <ProfileTripCard key={trip.id} trip={trip} onView={handleViewTrip} />
              ))}
            </div>
          </section>

          {/* ── 7. Saved Destinations Section ── */}
          <section className="profile-section" aria-labelledby="saved-dest-heading">
            <header className="profile-section-header">
              <h2 id="saved-dest-heading" className="profile-section-title">Saved Destinations</h2>
            </header>
            <div className="saved-chips-wrap">
              {SAVED_DESTINATIONS.map((dest) => (
                <div key={dest.id} className="saved-chip">
                  <span className="chip-icon">{dest.icon}</span>
                  <span className="chip-name">{dest.name}</span>
                  <span className="chip-country">{dest.country}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 8. Account Settings Section ── */}
          <section className="profile-section settings-section" aria-labelledby="settings-heading">
            <header className="profile-section-header">
              <h2 id="settings-heading" className="profile-section-title">Account Settings</h2>
            </header>

            <div className="settings-grid">
              {/* Language Dropdown */}
              <div className="setting-item">
                <label htmlFor="pref-language" className="setting-label">Language Preference</label>
                <select
                  id="pref-language"
                  className="setting-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>

              {/* Notification Toggle */}
              <div className="setting-item">
                <label htmlFor="pref-notifications" className="setting-label">Email Notifications</label>
                <div className="setting-toggle-wrap">
                  <input
                    id="pref-notifications"
                    type="checkbox"
                    className="setting-checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="setting-toggle-text">
                    {notifications ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="account-actions-row">
              <button
                type="button"
                className="btn-logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
              <button
                type="button"
                className="btn-delete-account"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
