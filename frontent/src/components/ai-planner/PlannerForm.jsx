// src/components/ai-planner/PlannerForm.jsx
import React, { useState } from 'react';
import TravelStyleSelector from './TravelStyleSelector';
import InterestSelector from './InterestSelector';

export default function PlannerForm({ formData, onChange, onGenerate }) {
  const [expandPrefs, setExpandPrefs] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSwap = () => {
    onChange('from', formData.to);
    onChange('to', formData.from);
  };

  const handleQuickBudget = (val) => {
    onChange('budget', val);
  };

  const adjustTravelers = (amount) => {
    const next = Math.max(1, (formData.travelerCount || 1) + amount);
    onChange('travelerCount', next);
  };

  const validate = () => {
    const errs = {};
    if (!formData.from?.trim()) errs.from = 'Starting location is required';
    if (!formData.to?.trim()) errs.to = 'Destination is required';
    if (!formData.startDate) errs.startDate = 'Start date is required';
    if (!formData.endDate) errs.endDate = 'End date is required';
    
    if (formData.startDate && formData.endDate) {
      const s = new Date(formData.startDate);
      const e = new Date(formData.endDate);
      if (e < s) {
        errs.endDate = 'End date must be after start date';
      }
    }
    
    if (!formData.budget || formData.budget <= 0) {
      errs.budget = 'Please enter a valid budget greater than 0';
    }
    if (!formData.travelerCount || formData.travelerCount < 1) {
      errs.travelerCount = 'At least 1 traveler is required';
    }
    if (!formData.interests || formData.interests.length === 0) {
      errs.interests = 'Please select at least one interest';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onGenerate();
    }
  };

  return (
    <form className="ai-planner-form" onSubmit={handleSubmit}>
      {/* Starting point and destination */}
      <div className="form-section">
        <h3 className="section-subtitle-label">Where are you going?</h3>
        <div className="destinations-inputs-row">
          <div className="input-group flex-1">
            <label className="input-label" htmlFor="ai-from">Starting From</label>
            <input
              id="ai-from"
              type="text"
              className={`text-input ${errors.from ? 'input-error' : ''}`}
              placeholder="Ahmedabad"
              value={formData.from}
              onChange={(e) => onChange('from', e.target.value)}
            />
            {errors.from && <span className="error-text">{errors.from}</span>}
          </div>

          <button
            type="button"
            className="swap-dest-btn"
            onClick={handleSwap}
            title="Swap Locations"
          >
            ⇄
          </button>

          <div className="input-group flex-1">
            <label className="input-label" htmlFor="ai-to">Destination</label>
            <input
              id="ai-to"
              type="text"
              className={`text-input ${errors.to ? 'input-error' : ''}`}
              placeholder="Goa"
              value={formData.to}
              onChange={(e) => onChange('to', e.target.value)}
            />
            {errors.to && <span className="error-text">{errors.to}</span>}
          </div>
        </div>
      </div>

      {/* Dates Section */}
      <div className="form-section">
        <h3 className="section-subtitle-label">When are you travelling?</h3>
        <div className="dates-inputs-row">
          <div className="input-group flex-1">
            <label className="input-label" htmlFor="ai-start-date">Start Date</label>
            <input
              id="ai-start-date"
              type="date"
              className={`text-input ${errors.startDate ? 'input-error' : ''}`}
              value={formData.startDate}
              onChange={(e) => onChange('startDate', e.target.value)}
            />
            {errors.startDate && <span className="error-text">{errors.startDate}</span>}
          </div>

          <div className="input-group flex-1">
            <label className="input-label" htmlFor="ai-end-date">End Date</label>
            <input
              id="ai-end-date"
              type="date"
              className={`text-input ${errors.endDate ? 'input-error' : ''}`}
              value={formData.endDate}
              onChange={(e) => onChange('endDate', e.target.value)}
            />
            {errors.endDate && <span className="error-text">{errors.endDate}</span>}
          </div>
        </div>
      </div>

      {/* Budget Section */}
      <div className="form-section">
        <h3 className="section-subtitle-label">What's your budget?</h3>
        <div className="budget-input-wrapper">
          <span className="currency-symbol">₹</span>
          <input
            type="number"
            className={`budget-number-input ${errors.budget ? 'input-error' : ''}`}
            placeholder="30000"
            value={formData.budget || ''}
            onChange={(e) => onChange('budget', Number(e.target.value))}
          />
        </div>
        {errors.budget && <span className="error-text">{errors.budget}</span>}

        <div className="quick-budget-row">
          <button type="button" className="quick-budget-chip" onClick={() => handleQuickBudget(15000)}>₹15K</button>
          <button type="button" className="quick-budget-chip" onClick={() => handleQuickBudget(30000)}>₹30K</button>
          <button type="button" className="quick-budget-chip" onClick={() => handleQuickBudget(50000)}>₹50K</button>
          <button type="button" className="quick-budget-chip" onClick={() => handleQuickBudget(75000)}>₹75K+</button>
        </div>

        <div className="style-selection-wrapper">
          <label className="input-label">Travel Style</label>
          <TravelStyleSelector
            selected={formData.travelStyle}
            onChange={(val) => onChange('travelStyle', val)}
          />
        </div>
      </div>

      {/* Travelers selector */}
      <div className="form-section">
        <h3 className="section-subtitle-label">Who's coming along?</h3>
        <div className="travelers-pills-row">
          {['Solo', 'Couple', 'Family', 'Friends'].map((type) => {
            const isSelected = formData.travelerType === type.toLowerCase();
            return (
              <button
                key={type}
                type="button"
                className={`traveler-pill ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange('travelerType', type.toLowerCase());
                  if (type === 'Solo') onChange('travelerCount', 1);
                  if (type === 'Couple') onChange('travelerCount', 2);
                  if (type === 'Family' || type === 'Friends') {
                    if (formData.travelerCount <= 2) onChange('travelerCount', 4);
                  }
                }}
              >
                {type}
              </button>
            );
          })}
        </div>

        {(formData.travelerType === 'family' || formData.travelerType === 'friends') && (
          <div className="counter-wrapper">
            <label className="input-label" htmlFor="ai-num-travelers">Number of Travelers</label>
            <div className="travelers-counter">
              <button type="button" className="counter-btn" onClick={() => adjustTravelers(-1)} disabled={formData.travelerCount <= 1}>-</button>
              <input id="ai-num-travelers" type="number" readOnly className="counter-input" value={formData.travelerCount} />
              <button type="button" className="counter-btn" onClick={() => adjustTravelers(1)}>+</button>
            </div>
            {errors.travelerCount && <span className="error-text">{errors.travelerCount}</span>}
          </div>
        )}
      </div>

      {/* Interests Selector */}
      <div className="form-section">
        <h3 className="section-subtitle-label">What are you into?</h3>
        <p className="section-subtitle-desc">Select as many as you like.</p>
        <InterestSelector
          selected={formData.interests}
          onChange={(interestsList) => onChange('interests', interestsList)}
        />
        {errors.interests && <span className="error-text">{errors.interests}</span>}
      </div>

      {/* Pace selection */}
      <div className="form-section">
        <h3 className="section-subtitle-label">How do you like to travel?</h3>
        <div className="pace-cards-grid">
          {[
            { id: 'relaxed', label: 'Relaxed', desc: '2–3 activities/day' },
            { id: 'balanced', label: 'Balanced', desc: '3–4 activities/day' },
            { id: 'packed', label: 'Packed', desc: '5+ activities/day' }
          ].map((item) => {
            const isSelected = formData.pace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`pace-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onChange('pace', item.id)}
              >
                <div className="pace-card-label">{item.label}</div>
                <div className="pace-card-desc">{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable Preferences */}
      <div className="form-section optional-section">
        <button
          type="button"
          className="expand-prefs-btn"
          onClick={() => setExpandPrefs(!expandPrefs)}
        >
          {expandPrefs ? '− Fewer preferences' : '+ More preferences'}
        </button>

        {expandPrefs && (
          <div className="optional-prefs-fields animate-fade">
            <div className="prefs-field">
              <label className="input-label" htmlFor="ai-pref-transport">Preferred Transport</label>
              <select
                id="ai-pref-transport"
                className="select-input"
                value={formData.transport}
                onChange={(e) => onChange('transport', e.target.value)}
              >
                <option value="any">Any</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
              </select>
            </div>

            <div className="prefs-field">
              <label className="input-label" htmlFor="ai-accommodation">Accommodation</label>
              <select
                id="ai-accommodation"
                className="select-input"
                value={formData.accommodationType}
                onChange={(e) => onChange('accommodationType', e.target.value)}
              >
                <option value="any">Any</option>
                <option value="hostel">Hostel</option>
                <option value="budget hotel">Budget Hotel</option>
                <option value="hotel">Hotel</option>
                <option value="resort">Resort</option>
              </select>
            </div>

            <div className="prefs-field">
              <label className="input-label" htmlFor="ai-food-pref">Food Preference</label>
              <select
                id="ai-food-pref"
                className="select-input"
                value={formData.foodPref}
                onChange={(e) => onChange('foodPref', e.target.value)}
              >
                <option value="any">Any</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div className="prefs-field full-width">
              <label className="input-label" htmlFor="ai-special-requests">Special Request</label>
              <textarea
                id="ai-special-requests"
                rows="3"
                className="textarea-input"
                placeholder="Avoid very early mornings, include local food experiences..."
                value={formData.specialRequests}
                onChange={(e) => onChange('specialRequests', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="form-submit-wrapper">
        <button type="submit" className="ai-generate-submit-btn">
          ✨ Generate My Trip
        </button>
      </div>
    </form>
  );
}
