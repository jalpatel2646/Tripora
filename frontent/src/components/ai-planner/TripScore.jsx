// src/components/ai-planner/TripScore.jsx
import React from 'react';

export default function TripScore({ score }) {
  const getRatingLabel = (val) => {
    if (val >= 90) return 'Excellent Plan';
    if (val >= 80) return 'Great Plan';
    if (val >= 70) return 'Good Plan';
    return 'Fair Plan';
  };

  return (
    <div className="trip-score-card">
      <h3 className="score-card-title">Trip Score</h3>
      
      <div className="score-badge-row">
        <div className="score-number-badge">
          <span className="score-num">{score.overall}</span>
          <span className="score-denom">/ 100</span>
        </div>
        <div className="score-rating-text-wrap">
          <div className="score-rating-label">{getRatingLabel(score.overall)}</div>
        </div>
      </div>

      <div className="score-breakdown-details">
        <div className="score-detail-row">
          <span className="score-label">Budget Fit</span>
          <span className="score-val font-semibold">{score.breakdown.budgetFit}</span>
        </div>
        <div className="score-detail-row">
          <span className="score-label">Activity Balance</span>
          <span className="score-val font-semibold">{score.breakdown.activityBalance}</span>
        </div>
        <div className="score-detail-row">
          <span className="score-label">Travel Pace</span>
          <span className="score-val font-semibold">{score.breakdown.travelPace}</span>
        </div>
        <div className="score-detail-row">
          <span className="score-label">Route Efficiency</span>
          <span className="score-val font-semibold">{score.breakdown.routeEfficiency}</span>
        </div>
      </div>

      {score.insights && score.insights.length > 0 && (
        <div className="score-insights-list">
          {score.insights.map((insight, idx) => (
            <div key={idx} className={`score-insight-item ${insight.type}`}>
              <span className="insight-bullet">
                {insight.type === 'good' ? '✓' : '⚠'}
              </span>
              <span className="insight-text">{insight.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
