import React from 'react';
import './BudgetSummary.css';

export default function BudgetSummary({ categoryTotals, totalExpense, plannedBudget }) {
  const remaining = plannedBudget - totalExpense;
  const isOverBudget = remaining < 0;
  const percentUsed = Math.min(100, Math.round((totalExpense / (plannedBudget || 1)) * 100));

  const formatCurrency = (val) => `₹${Math.abs(val).toLocaleString('en-IN')}`;

  return (
    <section className="budget-summary-card" aria-labelledby="budget-summary-heading">
      <header className="bs-header">
        <h2 id="budget-summary-heading" className="bs-title">Trip Budget Summary</h2>
        {isOverBudget ? (
          <span className="bs-alert-badge over-budget">
            ⚠️ You are {formatCurrency(remaining)} over budget
          </span>
        ) : (
          <span className="bs-alert-badge under-budget">
            ✓ Within budget ({formatCurrency(remaining)} remaining)
          </span>
        )}
      </header>

      {/* Main Budget Breakdown Table / List */}
      <div className="bs-content-grid">
        <div className="bs-table">
          <div className="bs-row">
            <span className="bs-label">🚗 Transport</span>
            <span className="bs-value">{formatCurrency(categoryTotals.travel || 0)}</span>
          </div>
          <div className="bs-row">
            <span className="bs-label">🏨 Stay / Hotel</span>
            <span className="bs-value">{formatCurrency(categoryTotals.hotel || 0)}</span>
          </div>
          <div className="bs-row">
            <span className="bs-label">🍽 Food & Dining</span>
            <span className="bs-value">{formatCurrency(categoryTotals.food || 0)}</span>
          </div>
          <div className="bs-row">
            <span className="bs-label">🏄 Activities & Sightseeing</span>
            <span className="bs-value">{formatCurrency((categoryTotals.activities || 0) + (categoryTotals.sightseeing || 0) + (categoryTotals.adventure || 0))}</span>
          </div>
          <div className="bs-row">
            <span className="bs-label">🛍 Other / Shopping</span>
            <span className="bs-value">{formatCurrency((categoryTotals.shopping || 0) + (categoryTotals.other || 0))}</span>
          </div>
          <div className="bs-divider" />
          <div className="bs-row bs-row-total">
            <span className="bs-label-total">Total Expense</span>
            <span className="bs-value-total">{formatCurrency(totalExpense)}</span>
          </div>
        </div>

        {/* Progress & Summary Overview Box */}
        <div className="bs-overview-box">
          <h3 className="bs-overview-title">Budget Usage</h3>
          
          <div className="bs-amount-row">
            <span className="bs-amount-spent">{formatCurrency(totalExpense)}</span>
            <span className="bs-amount-limit">/ {formatCurrency(plannedBudget)}</span>
          </div>

          {/* Progress Bar */}
          <div className="bs-progress-track">
            <div
              className={`bs-progress-fill${isOverBudget ? ' is-over' : ''}`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>

          <div className="bs-percent-text">
            <span>{percentUsed}% Used</span>
            <span>{isOverBudget ? 'Over Limit' : `${100 - percentUsed}% Left`}</span>
          </div>
        </div>
      </div>

      {/* 4 Compact Category Breakdown Cards */}
      <div className="bs-compact-cards-grid">
        <div className="bs-card">
          <span className="bs-card-icon">🚗</span>
          <span className="bs-card-title">Transport</span>
          <span className="bs-card-amount">{formatCurrency(categoryTotals.travel || 0)}</span>
        </div>
        <div className="bs-card">
          <span className="bs-card-icon">🏨</span>
          <span className="bs-card-title">Stay</span>
          <span className="bs-card-amount">{formatCurrency(categoryTotals.hotel || 0)}</span>
        </div>
        <div className="bs-card">
          <span className="bs-card-icon">🍽</span>
          <span className="bs-card-title">Food</span>
          <span className="bs-card-amount">{formatCurrency(categoryTotals.food || 0)}</span>
        </div>
        <div className="bs-card">
          <span className="bs-card-icon">🏄</span>
          <span className="bs-card-title">Activities</span>
          <span className="bs-card-amount">{formatCurrency((categoryTotals.activities || 0) + (categoryTotals.sightseeing || 0) + (categoryTotals.adventure || 0))}</span>
        </div>
      </div>
    </section>
  );
}
