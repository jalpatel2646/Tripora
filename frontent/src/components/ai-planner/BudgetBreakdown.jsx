// src/components/ai-planner/BudgetBreakdown.jsx
import React from 'react';

export default function BudgetBreakdown({ breakdown, estimated, budget, remaining }) {
  const percentage = Math.min(100, Math.round((estimated / budget) * 100));
  const isOver = estimated > budget;

  return (
    <div className="budget-breakdown-card">
      <h3 className="breakdown-card-title">Budget Breakdown</h3>
      
      <div className="breakdown-table">
        <div className="breakdown-row">
          <span className="breakdown-label">Transport</span>
          <span className="breakdown-value">₹{breakdown.transport.toLocaleString('en-IN')}</span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">Stay</span>
          <span className="breakdown-value">₹{breakdown.stay.toLocaleString('en-IN')}</span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">Food</span>
          <span className="breakdown-value">₹{breakdown.food.toLocaleString('en-IN')}</span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">Activities</span>
          <span className="breakdown-value">₹{breakdown.activities.toLocaleString('en-IN')}</span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">Local Transport</span>
          <span className="breakdown-value">₹{breakdown.localTransport.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="breakdown-divider"></div>
        
        <div className="breakdown-row total-row">
          <span className="breakdown-label">Estimated Total</span>
          <span className="breakdown-value font-bold">₹{estimated.toLocaleString('en-IN')}</span>
        </div>
        <div className="breakdown-row target-row">
          <span className="breakdown-label">Target Budget</span>
          <span className="breakdown-value">₹{budget.toLocaleString('en-IN')}</span>
        </div>
        <div className={`breakdown-row remaining-row ${isOver ? 'negative' : 'positive'}`}>
          <span className="breakdown-label">{isOver ? 'Over Budget' : 'Remaining'}</span>
          <span className="breakdown-value font-bold">
            {isOver ? '+' : ''}₹{Math.abs(remaining).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="progress-bar-section">
        <div className="progress-bar-header">
          <span className="progress-bar-title">₹{estimated.toLocaleString('en-IN')} of ₹{budget.toLocaleString('en-IN')}</span>
          <span className="progress-bar-pct">{percentage}% of budget used</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${isOver ? 'over-budget' : ''}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
