import React from 'react';
import './TripCard.css';

export default function TripCard({
  variant = 'compact',
  name,
  destination,
  route,
  dates,
  startDate,
  endDate,
  duration,
  days,
  stops,
  budget,
  image,
  status = 'completed',
  onClick,
  onView,
  onEdit,
  onCopy,
  onDelete
}) {
  // Normalize display variables
  const titleText     = name || 'Trip Title';
  const destText      = route || destination || '';
  const datesText     = dates || (startDate && endDate ? `${startDate} – ${endDate}` : '');
  const durationText  = duration || (days ? `${days} Days` : '');
  const formattedBudget = budget ? `₹${Number(budget).toLocaleString('en-IN')}` : null;
  const statusLower   = status.toLowerCase();

  // Wide layout used on MyTrips screen
  if (variant === 'wide') {
    return (
      <article className={`trip-card-wide status-${statusLower}`} role="article" aria-label={`Trip: ${titleText}`}>
        {/* Cover Image */}
        <div className="tc-wide-image-wrap">
          <img src={image} alt={titleText} className="tc-wide-img" loading="lazy" />
          <span className={`tc-status-badge badge-${statusLower}`}>
            {statusLower.charAt(0).toUpperCase() + statusLower.slice(1)}
          </span>
        </div>

        {/* Content Details */}
        <div className="tc-wide-content">
          <div className="tc-wide-header">
            <div className="tc-title-route">
              <h3 className="tc-wide-title">{titleText}</h3>
              {destText && <p className="tc-wide-route">📍 {destText}</p>}
            </div>
            <span className={`tc-status-badge-desktop badge-${statusLower}`}>
              {statusLower.charAt(0).toUpperCase() + statusLower.slice(1)}
            </span>
          </div>

          <div className="tc-wide-meta">
            {datesText && (
              <span className="tc-meta-pill">
                📅 {datesText} {durationText ? `• ${durationText}` : ''}
              </span>
            )}
            {stops && <span className="tc-meta-pill">🏱 {stops} Stops</span>}
            {formattedBudget && <span className="tc-meta-pill tc-budget-pill">💰 {formattedBudget}</span>}
          </div>

          {/* Action Buttons */}
          <div className="tc-wide-actions">
            <button
              type="button"
              className="tc-btn tc-btn-primary"
              onClick={onView || onClick}
            >
              View Trip
            </button>

            {statusLower !== 'completed' && onEdit && (
              <button
                type="button"
                className="tc-btn tc-btn-secondary"
                onClick={onEdit}
              >
                Edit
              </button>
            )}

            {statusLower === 'completed' && onCopy && (
              <button
                type="button"
                className="tc-btn tc-btn-secondary"
                onClick={onCopy}
              >
                Copy Trip
              </button>
            )}

            {statusLower === 'completed' && onDelete && (
              <button
                type="button"
                className="tc-btn tc-btn-danger"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default compact layout for Home Dashboard
  return (
    <article className="trip-card" onClick={onClick} role="button" tabIndex="0" aria-label={`Open details for ${titleText}`}>
      <div className="trip-image-wrap">
        <img src={image} alt={titleText} className="trip-image" loading="lazy" />
        <span className={`trip-status-badge badge-${statusLower}`}>
          {statusLower.charAt(0).toUpperCase() + statusLower.slice(1)}
        </span>
      </div>

      <div className="trip-details">
        <div className="trip-main-info">
          <h3 className="trip-title">{titleText}</h3>
          <p className="trip-dest">{destText}</p>
        </div>

        <div className="trip-meta">
          <div className="meta-item">
            <span className="meta-icon" aria-hidden="true">📅</span>
            <span className="meta-text">{datesText}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon" aria-hidden="true">⏱</span>
            <span className="meta-text">{durationText}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
