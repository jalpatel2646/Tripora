import React from 'react';
import './ActivityRow.css';

export default function ActivityRow({ activity, isLast }) {
  const { time, name, type, duration, description, expense } = activity;

  const formattedExpense = expense > 0 
    ? `₹${Number(expense).toLocaleString('en-IN')}` 
    : 'Free';

  return (
    <div className="activity-row-container">
      <article className="activity-card" aria-label={`Activity: ${name}`}>
        {/* Time */}
        <div className="act-time">{time}</div>

        {/* Info */}
        <div className="act-info">
          <div className="act-title-row">
            <h4 className="act-name">{name}</h4>
            <span className={`act-type-badge type-${type.toLowerCase()}`}>
              {type}
            </span>
          </div>
          {description && <p className="act-desc">{description}</p>}
          {duration && <span className="act-duration">⏱ {duration}</span>}
        </div>

        {/* Expense Badge */}
        <div className="act-expense-wrap">
          <span className={`act-expense-badge${expense === 0 ? ' is-free' : ''}`}>
            {formattedExpense}
          </span>
        </div>
      </article>

      {/* Timeline Arrow Connector */}
      {!isLast && (
        <div className="act-timeline-connector" aria-hidden="true">
          <span className="connector-line" />
          <span className="connector-arrow">↓</span>
        </div>
      )}
    </div>
  );
}
