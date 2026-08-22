import React from 'react';
import './DestinationCard.css';

export default function DestinationCard({ name, country, image, rating }) {
  // Simple stars builder helper
  const renderStars = (num) => {
    return '★'.repeat(Math.round(num)) + '☆'.repeat(5 - Math.round(num));
  };

  return (
    <article className="destination-card" role="button" tabIndex="0" aria-label={`View itinerary for ${name}, ${country}`}>
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="destination-image" loading="lazy" />
        <div className="card-gradient-overlay" />
        <div className="card-rating" aria-label={`Rating: ${rating} out of 5 stars`}>
          <span className="star-text">{renderStars(rating)}</span>
          <span className="rating-num">{rating}</span>
        </div>
      </div>
      <div className="card-info">
        <h3 className="destination-name">{name}</h3>
        <p className="destination-country">{country}</p>
      </div>
    </article>
  );
}
