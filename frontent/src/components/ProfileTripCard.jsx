import React from 'react';
import './ProfileTripCard.css';

export default function ProfileTripCard({ trip, onView }) {
  const { name, destination, date, days, status, image } = trip;
  const statusLower = status.toLowerCase();

  return (
    <article className="pt-card" aria-label={`Trip card for ${name}`}>
      <div className="pt-card-image-wrap">
        <img src={image} alt={name} className="pt-card-img" loading="lazy" />
        <span className={`pt-card-badge badge-${statusLower}`}>
          {status}
        </span>
      </div>

      <div className="pt-card-body">
        <h3 className="pt-card-title">{name}</h3>
        <p className="pt-card-dest">📍 {destination}</p>
        
        <div className="pt-card-meta">
          <span>📅 {date}</span>
          {days && <span>⏱ {days} Days</span>}
        </div>

        <button
          type="button"
          className="pt-card-view-btn"
          onClick={() => onView && onView(trip)}
        >
          View
        </button>
      </div>
    </article>
  );
}
