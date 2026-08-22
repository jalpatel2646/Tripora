import React from 'react';
import './ActivityResultCard.css';

export default function ActivityResultCard({ activity, isSelected, onToggleSelect }) {
  const { name, city, country, category, description, duration, cost, rating, image } = activity;

  const formattedCost = cost ? `₹${Number(cost).toLocaleString('en-IN')}` : 'Free';

  return (
    <article className={`activity-result-card${isSelected ? ' is-selected' : ''}`} aria-label={`Activity result for ${name}`}>
      {/* Left side cover image */}
      <div className="arc-image-wrap">
        <img src={image} alt={name} className="arc-img" loading="lazy" />
        <span className="arc-category-badge">{category}</span>
      </div>

      {/* Center Information */}
      <div className="arc-content">
        <div className="arc-header">
          <div>
            <h3 className="arc-name">{name}</h3>
            <p className="arc-location">📍 {city}{country ? `, ${country}` : ''}</p>
          </div>
          <span className="arc-rating-text">★ {rating}</span>
        </div>

        <p className="arc-description">{description}</p>

        <div className="arc-meta-row">
          <span className="arc-meta-pill">⏱ Duration: <strong>{duration}</strong></span>
          <span className="arc-meta-pill arc-cost-pill">💵 Cost: <strong>{formattedCost}</strong></span>
        </div>
      </div>

      {/* Right side Action Button */}
      <div className="arc-action-wrap">
        <button
          type="button"
          className={`arc-add-btn${isSelected ? ' added' : ''}`}
          onClick={() => onToggleSelect(activity.id)}
        >
          {isSelected ? 'Added ✓' : 'Add Activity'}
        </button>
      </div>
    </article>
  );
}
