// src/components/ai-planner/GeneratedActivity.jsx
import React, { useState } from 'react';

export default function GeneratedActivity({ activity, travelStyle, onRemove, onChangeTime, travelers }) {
  const [showReason, setShowReason] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeInput, setTimeInput] = useState(activity.time);

  const handleTimeSubmit = (e) => {
    e.preventDefault();
    if (timeInput.trim()) {
      onChangeTime(activity.id, timeInput.trim());
      setIsEditingTime(false);
    }
  };

  const getCategoryColor = (cat) => {
    const map = {
      travel: '#93C5FD',
      stay: '#C7CEFF',
      sightseeing: '#6EE7B7',
      food: '#FCD34D',
      adventure: '#F87171',
      culture: '#D6DCFF'
    };
    return map[cat.toLowerCase()] || '#B8C0FF';
  };

  return (
    <div className="generated-activity-card">
      <div className="activity-timeline-marker">
        <span className="timeline-dot" style={{ backgroundColor: getCategoryColor(activity.category) }}></span>
      </div>

      <div className="activity-main-info">
        <div className="activity-top-row">
          <div className="activity-time-wrapper">
            {isEditingTime ? (
              <form onSubmit={handleTimeSubmit} className="activity-time-edit-form">
                <input
                  type="text"
                  className="activity-time-input"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  autoFocus
                  onBlur={handleTimeSubmit}
                />
              </form>
            ) : (
              <span className="activity-time" onClick={() => setIsEditingTime(true)} title="Click to edit time">
                {activity.time}
              </span>
            )}
          </div>

          <div className="activity-details-container">
            <h4 className="activity-name">{activity.name}</h4>
            <div className="activity-meta-line">
              <span className="activity-tag-cat" style={{ backgroundColor: `${getCategoryColor(activity.category)}2A`, color: getCategoryColor(activity.category) }}>
                {activity.category}
              </span>
              {activity.duration && <span className="activity-duration">🕒 {activity.duration}</span>}
              {activity.location && <span className="activity-location">📍 {activity.location}</span>}
            </div>
          </div>
        </div>

        {activity.description && <p className="activity-description">{activity.description}</p>}

        {/* Why this option */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="activity-reason-wrapper">
            <button
              type="button"
              className="why-this-btn"
              onClick={() => setShowReason(!showReason)}
            >
              Why this?
            </button>
            {showReason && (
              <div className="why-this-explanation animate-fade">
                Recommended because you selected <strong>{activity.category}</strong> and it fits your <strong>{travelStyle}</strong> style.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="activity-cost-actions-col">
        <div className="activity-cost-display">
          {activity.totalCost > 0 ? `₹${activity.totalCost.toLocaleString('en-IN')}` : 'Free'}
        </div>
        
        <div className="activity-card-actions">
          <button
            type="button"
            className="act-action-link remove"
            onClick={() => onRemove(activity.id)}
            title="Remove Activity"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
