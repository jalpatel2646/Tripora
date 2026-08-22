// src/components/ai-planner/GeneratedDay.jsx
import React, { useState } from 'react';
import GeneratedActivity from './GeneratedActivity';

export default function GeneratedDay({ dayData, travelStyle, onRemoveActivity, onChangeActivityTime, travelers }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`generated-day-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="day-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="day-header-left">
          <div className="day-badge">DAY 0{dayData.day}</div>
          <h3 className="day-title">{dayData.title}</h3>
        </div>
        <div className="day-header-right">
          <span className="day-total-sum">Day Total: <strong>₹{dayData.dayTotal.toLocaleString('en-IN')}</strong></span>
          <span className="collapse-arrow-icon">{isCollapsed ? '▼' : '▲'}</span>
        </div>
      </header>

      {!isCollapsed && (
        <div className="day-activities-list">
          {dayData.activities.length === 0 ? (
            <div className="empty-day-state">No activities planned for this day.</div>
          ) : (
            dayData.activities.map((activity) => (
              <GeneratedActivity
                key={activity.id}
                activity={activity}
                travelStyle={travelStyle}
                travelers={travelers}
                onRemove={onRemoveActivity}
                onChangeTime={onChangeActivityTime}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
