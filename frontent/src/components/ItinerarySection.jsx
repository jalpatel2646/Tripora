import React from 'react';

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function ItinerarySection({
  section,
  index,
  onUpdate,
  onDelete,
  isDeleteable,
  errors = {}
}) {
  const handleChange = (field, value) => {
    onUpdate(index, field, value);
  };

  return (
    <article className="iti-section-card" aria-label={`Itinerary Section ${index + 1}`}>
      {/* Card Header */}
      <div className="iti-card-header">
        <div className="iti-badge-title-wrap">
          <span className="iti-badge" aria-hidden="true">{index + 1}</span>
          <h3 className="iti-section-title">Section {index + 1}</h3>
        </div>
        {isDeleteable && (
          <button
            type="button"
            className="iti-delete-btn"
            onClick={() => onDelete(index)}
            aria-label={`Delete Section ${index + 1}`}
          >
            <TrashIcon />
            <span>Delete</span>
          </button>
        )}
      </div>

      <div className="iti-card-grid">
        {/* Section Type Dropdown */}
        <div className={`iti-form-group${errors.type ? ' has-error' : ''}`}>
          <label htmlFor={`iti-type-${index}`} className="iti-label">Section Type</label>
          <select
            id={`iti-type-${index}`}
            className="iti-select"
            value={section.type}
            onChange={(e) => handleChange('type', e.target.value)}
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? `iti-type-err-${index}` : undefined}
          >
            <option value="">Select type</option>
            <option value="Travel">Travel</option>
            <option value="Hotel">Hotel</option>
            <option value="Activity">Activity</option>
            <option value="Food">Food</option>
            <option value="Sightseeing">Sightseeing</option>
            <option value="Other">Other</option>
          </select>
          {errors.type && <span id={`iti-type-err-${index}`} className="iti-error-text" role="alert">{errors.type}</span>}
        </div>

        {/* Location / City Input */}
        <div className="iti-form-group">
          <label htmlFor={`iti-location-${index}`} className="iti-label">Location / City</label>
          <input
            id={`iti-location-${index}`}
            type="text"
            className="iti-input"
            placeholder="Enter city or location"
            value={section.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        {/* Section Details Textarea (Full Width span) */}
        <div className={`iti-form-group span-2${errors.description ? ' has-error' : ''}`}>
          <label htmlFor={`iti-details-${index}`} className="iti-label">Section Details</label>
          <textarea
            id={`iti-details-${index}`}
            className="iti-textarea"
            placeholder="Add information about this section (e.g. flight numbers, hotel names, booked slots)..."
            value={section.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? `iti-desc-err-${index}` : undefined}
          />
          {errors.description && <span id={`iti-desc-err-${index}`} className="iti-error-text" role="alert">{errors.description}</span>}
        </div>

        {/* Date Range Inputs */}
        <div className="iti-form-group span-2-desktop">
          <label className="iti-label">Date Range</label>
          <div className="iti-date-range-inputs">
            <div className={`iti-date-wrapper${errors.startDate ? ' has-error' : ''}`}>
              <input
                type="date"
                className="iti-input iti-input-date"
                aria-label="Start Date"
                value={section.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                aria-invalid={!!errors.startDate}
              />
              {errors.startDate && <span className="iti-error-text" role="alert">{errors.startDate}</span>}
            </div>
            <span className="iti-date-separator" aria-hidden="true">→</span>
            <div className={`iti-date-wrapper${errors.endDate ? ' has-error' : ''}`}>
              <input
                type="date"
                className="iti-input iti-input-date"
                aria-label="End Date"
                value={section.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                aria-invalid={!!errors.endDate}
              />
              {errors.endDate && <span className="iti-error-text" role="alert">{errors.endDate}</span>}
            </div>
          </div>
        </div>

        {/* Budget Input */}
        <div className={`iti-form-group${errors.budget ? ' has-error' : ''}`}>
          <label htmlFor={`iti-budget-${index}`} className="iti-label">Budget of this Section</label>
          <div className="iti-budget-wrapper">
            <span className="iti-currency-symbol" aria-hidden="true">₹</span>
            <input
              id={`iti-budget-${index}`}
              type="number"
              className="iti-input iti-input-budget"
              placeholder="Enter budget"
              value={section.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              min="0"
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? `iti-budget-err-${index}` : undefined}
            />
          </div>
          {errors.budget && <span id={`iti-budget-err-${index}`} className="iti-error-text" role="alert">{errors.budget}</span>}
        </div>
      </div>
    </article>
  );
}
