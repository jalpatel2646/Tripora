import React from 'react';
import './CityResultCard.css';

export default function CityResultCard({ city, isSelected, onToggleSelect }) {
  const { name, country, description, costLevel, rating, bestTime, image, tags } = city;

  return (
    <article className={`city-result-card${isSelected ? ' is-selected' : ''}`} aria-label={`City result for ${name}`}>
      {/* Left side cover image */}
      <div className="crc-image-wrap">
        <img src={image} alt={name} className="crc-img" loading="lazy" />
        <span className="crc-rating-badge">★ {rating}</span>
      </div>

      {/* Center Information */}
      <div className="crc-content">
        <div className="crc-header">
          <h3 className="crc-name">{name}, <span className="crc-country">{country}</span></h3>
          {tags && (
            <div className="crc-tags-row">
              {tags.map((t, idx) => (
                <span key={idx} className="crc-tag">{t}</span>
              ))}
            </div>
          )}
        </div>

        <p className="crc-description">{description}</p>

        <div className="crc-meta-row">
          <span className="crc-meta-pill">💰 Budget: <strong>{costLevel}</strong></span>
          <span className="crc-meta-pill">🗓 Best Time: <strong>{bestTime}</strong></span>
        </div>
      </div>

      {/* Right side Action Button */}
      <div className="crc-action-wrap">
        <button
          type="button"
          className={`crc-add-btn${isSelected ? ' added' : ''}`}
          onClick={() => onToggleSelect(city.id)}
        >
          {isSelected ? 'Added ✓' : 'Add to Trip'}
        </button>
      </div>
    </article>
  );
}
