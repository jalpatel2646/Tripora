import React from 'react';
import './BudgetSummary.css';

export default function BudgetSummary({ categoryTotals, totalExpense, plannedBudget }) {
  const remaining = plannedBudget - totalExpense;
  const isOverBudget = remaining < 0;
  const percentUsed = Math.min(100, Math.round((totalExpense / (plannedBudget || 1)) * 100));

  const formatCurrency = (val) => `₹${Math.abs(val).toLocaleString('en-IN')}`;

  return (
    <section className="budget-summary-sidebar" aria-labelledby="budget-summary-heading">
      {/* Trip Summary Card */}
      <div className="bs-section-box">
        <h3 id="budget-summary-heading" className="bs-widget-title">Trip Summary</h3>
        
        <div className="bs-stat-item">
          <span className="bs-stat-label">Budget</span>
          <span className="bs-stat-value">{formatCurrency(plannedBudget)}</span>
        </div>

        <div className="bs-stat-item">
          <span className="bs-stat-label">Spent / Estimated</span>
          <span className="bs-stat-value">{formatCurrency(totalExpense)}</span>
        </div>

        <div className="bs-stat-item">
          <span className="bs-stat-label">Remaining</span>
          <span className={`bs-stat-value ${isOverBudget ? 'over-budget' : 'under-budget'}`}>
            {formatCurrency(remaining)} {isOverBudget ? 'Over' : 'Remaining'}
          </span>
        </div>

        {/* Progress Fill */}
        <div className="bs-progress-section">
          <div className="bs-progress-track">
            <div
              className={`bs-progress-fill${isOverBudget ? ' is-over' : ''}`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <div className="bs-progress-pct-row">
            <span>{percentUsed}% used</span>
            {isOverBudget && <span className="bs-progress-alert">Over Limit</span>}
          </div>
        </div>
      </div>

      {/* Trip Details Card */}
      <div className="bs-section-box">
        <h3 className="bs-widget-title">Trip Details</h3>
        <ul className="bs-details-list">
          <li className="bs-detail-item">
            <span className="bs-detail-bullet">●</span>
            <span className="bs-detail-text">8 Days</span>
          </li>
          <li className="bs-detail-item">
            <span className="bs-detail-bullet">●</span>
            <span className="bs-detail-text">3 Cities</span>
          </li>
          <li className="bs-detail-item">
            <span className="bs-detail-bullet">●</span>
            <span className="bs-detail-text">9 Activities</span>
          </li>
        </ul>
      </div>

      {/* Expenses Breakdown */}
      <div className="bs-section-box">
        <h3 className="bs-widget-title">Expenses Breakdown</h3>
        <div className="bs-category-list">
          <div className="bs-cat-item">
            <span className="bs-cat-name">🚗 Transport</span>
            <span className="bs-cat-val">{formatCurrency(categoryTotals.travel || 0)}</span>
          </div>
          <div className="bs-cat-item">
            <span className="bs-cat-name">🏨 Stay / Hotel</span>
            <span className="bs-cat-val">{formatCurrency(categoryTotals.hotel || 0)}</span>
          </div>
          <div className="bs-cat-item">
            <span className="bs-cat-name">🍽 Food & Dining</span>
            <span className="bs-cat-val">{formatCurrency(categoryTotals.food || 0)}</span>
          </div>
          <div className="bs-cat-item">
            <span className="bs-cat-name">🏄 Activities</span>
            <span className="bs-cat-val">{formatCurrency((categoryTotals.activities || 0) + (categoryTotals.sightseeing || 0) + (categoryTotals.adventure || 0))}</span>
          </div>
          {((categoryTotals.shopping || 0) + (categoryTotals.other || 0)) > 0 && (
            <div className="bs-cat-item">
              <span className="bs-cat-name">🛍 Other / Shopping</span>
              <span className="bs-cat-val">{formatCurrency((categoryTotals.shopping || 0) + (categoryTotals.other || 0))}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
