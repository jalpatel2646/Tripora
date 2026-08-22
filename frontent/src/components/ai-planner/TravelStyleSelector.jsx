// src/components/ai-planner/TravelStyleSelector.jsx
import React from 'react';

const STYLE_OPTIONS = [
  { id: 'budget', label: 'Budget', desc: 'Save more experiences' },
  { id: 'balanced', label: 'Balanced', desc: 'Best value for money' },
  { id: 'luxury', label: 'Luxury', desc: 'Premium experience' }
];

export default function TravelStyleSelector({ selected = 'balanced', onChange }) {
  return (
    <div className="travel-style-selector-container">
      {STYLE_OPTIONS.map((style) => {
        const isSelected = selected === style.id;
        return (
          <button
            key={style.id}
            type="button"
            className={`travel-style-card ${isSelected ? 'is-selected' : ''}`}
            onClick={() => onChange(style.id)}
            aria-pressed={isSelected}
          >
            <div className="style-card-label">{style.label}</div>
            <div className="style-card-desc">{style.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
