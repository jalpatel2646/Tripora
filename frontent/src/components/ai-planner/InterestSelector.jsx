// src/components/ai-planner/InterestSelector.jsx
import React from 'react';

const INTEREST_OPTIONS = [
  'Beaches',
  'Adventure',
  'Food',
  'Nature',
  'History',
  'Culture',
  'Shopping',
  'Nightlife',
  'Photography',
  'Relaxation',
  'Wildlife',
  'Local Experiences'
];

export default function InterestSelector({ selected = [], onChange }) {
  const handleToggle = (interest) => {
    const nextSelected = selected.includes(interest)
      ? selected.filter((item) => item !== interest)
      : [...selected, interest];
    onChange(nextSelected);
  };

  return (
    <div className="interest-selector-container">
      {INTEREST_OPTIONS.map((interest) => {
        const isSelected = selected.includes(interest);
        return (
          <button
            key={interest}
            type="button"
            className={`interest-chip-btn ${isSelected ? 'is-selected' : ''}`}
            onClick={() => handleToggle(interest)}
            aria-pressed={isSelected}
          >
            {interest}
          </button>
        );
      })}
    </div>
  );
}
