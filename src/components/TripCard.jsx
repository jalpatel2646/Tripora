import React from 'react';
import './TripCard.css';

export default function TripCard({ name, destination, dates, duration, image, status, onClick }) {
  return (
    <article className="trip-card" onClick={onClick} role="button" tabIndex="0" aria-label={`Open details for ${name}`}>
      <div className="trip-image-wrap">
        <img src={image} alt={name} className="trip-image" loading="lazy" />
        <span className="trip-status-badge">{status}</span>
      </div>

      <div className="trip-details">
        <div className="trip-main-info">
          <h3 className="trip-title">{name}</h3>
          <p className="trip-dest">{destination}</p>
        </div>

        <div className="trip-meta">
          <div className="meta-item">
            <span className="meta-icon" aria-hidden="true">📅</span>
            <span className="meta-text">{dates}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon" aria-hidden="true">⏱</span>
            <span className="meta-text">{duration}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
