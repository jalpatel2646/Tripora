import React from 'react';
import './StatCard.css';

export default function StatCard({ title, value, change, icon }) {
  const isPositive = change && change.startsWith('+');

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-icon" aria-hidden="true">{icon}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
          <span className="change-arrow">{isPositive ? '▲' : '▼'}</span>
          <span>{change}</span>
          <span className="change-period"> this month</span>
        </div>
      )}
    </div>
  );
}
