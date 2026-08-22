import React from 'react';
import './ActivityRow.css';

export default function ActivityRow({ activity, isLast }) {
  const { time, name, type, duration, description, expense } = activity;

  const formattedExpense = expense > 0 
    ? `₹${Number(expense).toLocaleString('en-IN')}` 
    : 'FREE';

  return (
    <div className="activity-row-container">
      {/* Time & Marker Column */}
      <div className="act-timeline-col">
        <span className="act-time-val">{time}</span>
        <div className="act-marker-wrapper">
          <span className="act-timeline-dot"></span>
          {!isLast && <span className="act-timeline-line"></span>}
        </div>
      </div>

      {/* Activity Card */}
      <article className="activity-card" aria-label={`Activity: ${name}`}>
        <div className="act-card-body">
          <div className="act-title-row">
            <h4 className="act-name">{name}</h4>
          </div>
          {description && <p className="act-desc">{description}</p>}
          
          <div className="act-footer-meta">
            <span className={`act-type-badge type-${type.toLowerCase()}`}>
              {type}
            </span>
            {duration && <span className="act-duration">⏱ {duration}</span>}
          </div>
        </div>

        {/* Expense Column */}
        <div className="act-expense-col">
          {expense > 0 ? (
            <>
              <span className="act-expense-lbl">COST</span>
              <span className="act-expense-amount">{formattedExpense}</span>
            </>
          ) : (
            <span className="act-expense-free">FREE</span>
          )}
        </div>
      </article>
    </div>
  );
}
