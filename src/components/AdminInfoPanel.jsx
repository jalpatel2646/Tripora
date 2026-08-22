import React from 'react';
import './AdminInfoPanel.css';

const QUICK_INSIGHTS = [
  { label: '🔥 Most Popular City', value: 'Goa' },
  { label: '⭐ Top Activity', value: 'Sightseeing' },
  { label: '📅 Most Active Month', value: 'December' },
  { label: '👥 Total Active Users', value: '10,420' }
];

const RECENT_ACTIVITIES = [
  { id: 1, text: 'Aarav Shah created "Goa Escape"', time: '2 minutes ago', type: 'trip' },
  { id: 2, text: 'Riya added Water Sports to Goa itinerary', time: '10 minutes ago', type: 'activity' },
  { id: 3, text: 'Karan Malhotra registered as traveler', time: '25 minutes ago', type: 'user' },
  { id: 4, text: 'Meera Nair published Kerala Budget Tips', time: '1 hour ago', type: 'post' }
];

export default function AdminInfoPanel() {
  return (
    <aside className="admin-info-panel" aria-label="Admin insights and activity log">
      {/* Admin Overview Section */}
      <div className="aip-card">
        <h3 className="aip-title">📋 Admin Overview</h3>
        <div className="aip-overview-list">
          <div className="aip-overview-item">
            <h4 className="aip-overview-title">Manage Users</h4>
            <p className="aip-overview-desc">View registered users, account status, trip count, and basic user information.</p>
          </div>
          <div className="aip-overview-item">
            <h4 className="aip-overview-title">Popular Cities</h4>
            <p className="aip-overview-desc">Identify the destinations most frequently added to user itineraries.</p>
          </div>
          <div className="aip-overview-item">
            <h4 className="aip-overview-title">Popular Activities</h4>
            <p className="aip-overview-desc">Monitor the activities users add most often to their trips.</p>
          </div>
          <div className="aip-overview-item">
            <h4 className="aip-overview-title">User Trends</h4>
            <p className="aip-overview-desc">Analyze platform growth, usage patterns, and user engagement.</p>
          </div>
        </div>
      </div>

      {/* Quick Insights Section */}
      <div className="aip-card">
        <h3 className="aip-title">⚡ Quick Insights</h3>
        <div className="aip-insights-list">
          {QUICK_INSIGHTS.map((insight) => (
            <div key={insight.label} className="aip-insight-item">
              <span className="aip-insight-label">{insight.label}</span>
              <span className="aip-insight-val">{insight.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Platform Activity */}
      <div className="aip-card">
        <h3 className="aip-title">🔔 Recent Platform Activity</h3>
        <div className="aip-activity-list">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="aip-activity-item">
              <div className="aip-act-icon">
                {act.type === 'trip' && '🗺️'}
                {act.type === 'activity' && '🏖️'}
                {act.type === 'user' && '👤'}
                {act.type === 'post' && '✍️'}
              </div>
              <div className="aip-act-main">
                <p className="aip-act-text">{act.text}</p>
                <span className="aip-act-time">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
