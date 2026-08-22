// src/components/ai-planner/TripSummary.jsx
import React from 'react';

export default function TripSummary({ formData }) {
  const hasDestination = formData.to && formData.to.trim().length > 0;
  
  const formatDateRange = () => {
    if (!formData.startDate) return '';
    const options = { day: 'numeric', month: 'short' };
    const startStr = new Date(formData.startDate).toLocaleDateString('en-IN', options);
    if (!formData.endDate) return startStr;
    const endStr = new Date(formData.endDate).toLocaleDateString('en-IN', options);
    return `${startStr} — ${endStr}`;
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff + 1 : 0;
  };

  const tripDays = calculateDays();

  if (!hasDestination) {
    return (
      <aside className="ai-planner-sidebar" aria-label="Trip overview summary">
        <h3 className="sidebar-heading">Your Trip</h3>
        <div className="sidebar-empty-state">
          <div className="sidebar-empty-icon">🌍</div>
          <p className="sidebar-empty-text">Your adventure starts here.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="ai-planner-sidebar" aria-label="Trip overview summary">
      <h3 className="sidebar-heading">Your Trip</h3>
      
      <div className="summary-flow">
        {formData.from && (
          <>
            <div className="summary-loc-name">{formData.from}</div>
            <div className="summary-arrow-down">↓</div>
          </>
        )}
        <div className="summary-loc-name destination">{formData.to}</div>
      </div>

      <div className="summary-details-list">
        {formatDateRange() && (
          <div className="summary-detail-item">
            <span className="detail-icon">📅</span>
            <div className="detail-content">
              <div className="detail-val">{formatDateRange()}</div>
              {tripDays > 0 && <div className="detail-sub">{tripDays} Days</div>}
            </div>
          </div>
        )}

        {formData.budget > 0 && (
          <div className="summary-detail-item">
            <span className="detail-icon">💰</span>
            <div className="detail-content">
              <div className="detail-val">₹{formData.budget.toLocaleString('en-IN')} Budget</div>
            </div>
          </div>
        )}

        <div className="summary-detail-item">
          <span className="detail-icon">👥</span>
          <div className="detail-content">
            <div className="detail-val">
              {formData.travelerCount} {formData.travelerCount === 1 ? 'Traveler' : 'Travelers'}
            </div>
            <div className="detail-sub text-capitalize">{formData.travelerType}</div>
          </div>
        </div>

        <div className="summary-detail-item">
          <span className="detail-icon">⚡</span>
          <div className="detail-content">
            <div className="detail-val text-capitalize">{formData.pace} Pace</div>
          </div>
        </div>

        {formData.interests && formData.interests.length > 0 && (
          <div className="summary-detail-item interests-detail-item">
            <span className="detail-icon">✨</span>
            <div className="detail-content">
              <div className="detail-val">Interests</div>
              <div className="summary-interests-chips">
                {formData.interests.map((interest) => (
                  <span key={interest} className="summary-interest-chip">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
