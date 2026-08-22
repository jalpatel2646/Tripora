// src/components/ai-planner/GeneratedTrip.jsx
import React, { useState } from 'react';
import GeneratedDay from './GeneratedDay';
import BudgetBreakdown from './BudgetBreakdown';
import TripScore from './TripScore';
import { optimizeBudget } from '../../data/aiTripMockData';

export default function GeneratedTrip({ tripData, onRegenerate, onSave, onBack }) {
  const [trip, setTrip] = useState(tripData);
  const [optSuccess, setOptSuccess] = useState('');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const handleRemoveActivity = (activityId) => {
    const updatedItinerary = trip.itinerary.map((day) => {
      const filtered = day.activities.filter((act) => act.id !== activityId);
      const newTotal = filtered.reduce((s, a) => s + (a.totalCost || 0), 0);
      return {
        ...day,
        activities: filtered,
        dayTotal: newTotal
      };
    });

    recalculateCosts(updatedItinerary);
  };

  const handleChangeActivityTime = (activityId, newTime) => {
    const updatedItinerary = trip.itinerary.map((day) => {
      const mapped = day.activities.map((act) => 
        act.id === activityId ? { ...act, time: newTime } : act
      );
      return {
        ...day,
        activities: mapped
      };
    });

    setTrip((prev) => ({
      ...prev,
      itinerary: updatedItinerary
    }));
  };

  const recalculateCosts = (newItinerary) => {
    const newActTotal = newItinerary.reduce((s, d) => s + d.dayTotal, 0);
    const transport   = trip.budgetBreakdown.transport;
    const stay        = trip.budgetBreakdown.stay;
    const food        = trip.budgetBreakdown.food;
    const local       = trip.budgetBreakdown.localTransport;

    const newEstimated = transport + stay + food + local + newActTotal;
    const remaining    = trip.budget - newEstimated;

    setTrip((prev) => ({
      ...prev,
      itinerary: newItinerary,
      budgetBreakdown: {
        ...prev.budgetBreakdown,
        activities: newActTotal
      },
      totalEstimated: newEstimated,
      remaining,
      isOverBudget: remaining < 0
    }));
  };

  const handleOptimize = () => {
    const optimized = optimizeBudget(trip);
    setTrip(optimized);
    setOptSuccess(optimized.optimizationNote || 'Budget optimized successfully!');
    setTimeout(() => setOptSuccess(''), 5000);
  };

  return (
    <div className="generated-trip-wrapper animate-fade">
      {/* Back button */}
      <div className="back-nav-row">
        <button type="button" className="planner-back-btn" onClick={onBack}>
          ← Edit Preferences
        </button>
      </div>

      {/* Header Info */}
      <header className="trip-results-header">
        <div className="results-header-left">
          <span className="results-badge-ai">AI TRIP PLANNER ✨</span>
          <h1 className="results-title">{trip.title}</h1>
          <div className="results-route-line">
            <span className="route-city">{trip.from}</span>
            <span className="route-arrow">─────────────→</span>
            <span className="route-city">{trip.to}</span>
          </div>
        </div>

        <div className="results-header-right">
          <div className="results-dates-pills">
            <span className="res-pill">📅 {formatDate(trip.startDate)} – {formatDate(trip.endDate)}</span>
            <span className="res-pill">🕒 {trip.days} Days</span>
            <span className="res-pill">👥 {trip.travelerCount} {trip.travelerCount === 1 ? 'Traveler' : 'Travelers'}</span>
          </div>
        </div>
      </header>

      {/* Quick Summary Boxes */}
      <section className="results-stats-row">
        <div className="kpi-card">
          <span className="kpi-label">Estimated Cost</span>
          <span className="kpi-value">₹{trip.totalEstimated.toLocaleString('en-IN')}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Your Budget</span>
          <span className="kpi-value">₹{trip.budget.toLocaleString('en-IN')}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Remaining</span>
          <span className={`kpi-value ${trip.isOverBudget ? 'negative' : 'positive'}`}>
            ₹{trip.remaining.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Status</span>
          <span className={`kpi-value status-badge ${trip.isOverBudget ? 'negative' : 'positive'}`}>
            {trip.isOverBudget ? 'Over Budget ⚠' : 'Within Budget ✓'}
          </span>
        </div>
      </section>

      {/* AI text summary */}
      <section className="ai-summary-highlight-card">
        <p className="ai-summary-text">{trip.aiSummary}</p>
      </section>

      {/* Optimized feedback banner */}
      {trip.optimized && (
        <div className="optimized-note-banner">
          ✨ {trip.optimizationNote}
        </div>
      )}

      {/* Budget optimization callout if over budget */}
      {trip.isOverBudget && (
        <div className="budget-warning-banner">
          <div className="warning-banner-text">
            <strong>You're ₹{Math.abs(trip.remaining).toLocaleString('en-IN')} over budget.</strong> Tripora can adjust stay/activities to bring the trip closer to your target.
          </div>
          <button type="button" className="warning-optimize-btn" onClick={handleOptimize}>
            Optimize Budget ✨
          </button>
        </div>
      )}
      {optSuccess && <div className="toast-success-banner">{optSuccess}</div>}

      {/* Desktop Main Grid */}
      <div className="results-main-layout">
        {/* Left Column: Day by Day + Budget Breakdown */}
        <div className="results-left-column">
          <div className="day-by-day-header-row">
            <h2 className="results-subheading">Itinerary Timeline</h2>
          </div>

          <div className="day-wise-list-wrapper">
            {trip.itinerary.map((day) => (
              <GeneratedDay
                key={day.day}
                dayData={day}
                travelStyle={trip.travelStyle}
                travelers={trip.travelerCount}
                onRemoveActivity={handleRemoveActivity}
                onChangeActivityTime={handleChangeActivityTime}
              />
            ))}
          </div>

          <BudgetBreakdown
            breakdown={trip.budgetBreakdown}
            estimated={trip.totalEstimated}
            budget={trip.budget}
            remaining={trip.remaining}
          />
        </div>

        {/* Right Column: Sticky Summary & Score */}
        <div className="results-right-column">
          <div className="sticky-results-sidebar">
            <TripScore score={trip.tripScore} />
          </div>
        </div>
      </div>

      {/* Save / Regenerate CTA bar */}
      <footer className="planner-results-actions-bar">
        <div className="actions-left">
          <button type="button" className="planner-sec-action-btn" onClick={onRegenerate}>
            🔄 Regenerate Trip
          </button>
          <button type="button" className="planner-sec-action-btn" onClick={onBack}>
            ⚙ Customize Preferences
          </button>
        </div>
        <div className="actions-right">
          <button type="button" className="planner-save-primary-btn" onClick={() => onSave(trip)}>
            Save Trip
          </button>
        </div>
      </footer>
    </div>
  );
}
