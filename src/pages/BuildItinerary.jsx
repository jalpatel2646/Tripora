import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ItinerarySection from '../components/ItinerarySection';
import './BuildItinerary.css';

// Initial state creator helper
const createEmptySection = (id) => ({
  id,
  type: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  budget: ''
});

export default function BuildItinerary() {
  // Initially load 3 sections as per the wireframe
  const [sections, setSections] = useState([
    createEmptySection(Date.now()),
    createEmptySection(Date.now() + 1),
    createEmptySection(Date.now() + 2)
  ]);

  const [validationErrors, setValidationErrors] = useState({});

  // Add another empty section card
  const handleAddSection = () => {
    setSections((prev) => [...prev, createEmptySection(Date.now())]);
  };

  // Delete section card at a specific index
  const handleDeleteSection = (indexToDelete) => {
    // Only allow deletion if there are multiple sections
    if (sections.length <= 1) return;

    setSections((prev) => prev.filter((_, idx) => idx !== indexToDelete));
    
    // Shift errors down accordingly
    setValidationErrors((prev) => {
      const updated = {};
      Object.keys(prev).forEach((key) => {
        const idx = parseInt(key, 10);
        if (idx < indexToDelete) {
          updated[idx] = prev[idx];
        } else if (idx > indexToDelete) {
          updated[idx - 1] = prev[idx];
        }
      });
      return updated;
    });
  };

  // Update a single field inside a specific section
  const handleUpdateSection = (idx, field, value) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });

    // Proactively clear validation error once the user types
    if (validationErrors[idx]?.[field]) {
      setValidationErrors((prev) => {
        const secErrors = { ...prev[idx] };
        delete secErrors[field];
        return { ...prev, [idx]: secErrors };
      });
    }
  };

  // Perform itinerary validation
  const validateItinerary = () => {
    const errorsMap = {};
    let isValid = true;

    sections.forEach((sec, idx) => {
      const secErrors = {};

      if (!sec.type) {
        secErrors.type = 'Section Type is required.';
        isValid = false;
      }
      if (!sec.description.trim()) {
        secErrors.description = 'Section Details are required.';
        isValid = false;
      }
      if (!sec.startDate) {
        secErrors.startDate = 'Start date is required.';
        isValid = false;
      }
      if (!sec.endDate) {
        secErrors.endDate = 'End date is required.';
        isValid = false;
      }
      if (sec.startDate && sec.endDate && new Date(sec.startDate) > new Date(sec.endDate)) {
        secErrors.endDate = 'End date cannot be before start date.';
        isValid = false;
      }
      if (sec.budget !== '' && parseFloat(sec.budget) < 0) {
        secErrors.budget = 'Budget cannot be negative.';
        isValid = false;
      }

      if (Object.keys(secErrors).length > 0) {
        errorsMap[idx] = secErrors;
      }
    });

    setValidationErrors(errorsMap);
    return isValid;
  };

  // Save flow
  const handleSaveItinerary = (e) => {
    e.preventDefault();
    if (validateItinerary()) {
      console.log('--- Saved Itinerary Sections ---');
      console.log(sections);
      alert('Itinerary saved successfully! 🎉 (Data logged to console)');
    } else {
      alert('Please fix validation errors in the itinerary sections.');
    }
  };

  return (
    <div className="iti-page-container">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="iti-main">
        <div className="iti-card-wrapper">
          
          {/* ── Header Area ── */}
          <header className="iti-page-header">
            <div className="iti-header-text">
              <h1 className="iti-page-title">Build Itinerary</h1>
              <p className="iti-page-subtitle">Plan your trip section by section</p>
            </div>
            <div className="iti-header-icon" aria-hidden="true">
              📅
            </div>
          </header>

          {/* ── Itinerary Cards List ── */}
          <div className="iti-sections-list">
            {sections.map((sec, idx) => (
              <ItinerarySection
                key={sec.id}
                section={sec}
                index={idx}
                onUpdate={handleUpdateSection}
                onDelete={handleDeleteSection}
                isDeleteable={sections.length > 1}
                errors={validationErrors[idx] || {}}
              />
            ))}
          </div>

          {/* ── Add Section Action Button ── */}
          <button
            type="button"
            className="iti-add-section-btn"
            onClick={handleAddSection}
          >
            + Add another Section
          </button>

          {/* ── Save / Submission Button ── */}
          <div className="iti-save-row">
            <button
              type="submit"
              className="iti-save-itinerary-btn"
              onClick={handleSaveItinerary}
            >
              Save Itinerary
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
