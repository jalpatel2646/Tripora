import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ItinerarySection from '../components/ItinerarySection';
import './BuildItinerary.css';
import jaipurImage from '../assets/jaipur.jpg';
import ladakhImage from '../assets/ladakh.jpg';

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

// Image map for places
const PLACE_IMAGES = {
  Goa: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
  Manali: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  Jaipur: jaipurImage,
  Kerala: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
  Ladakh: ladakhImage
};

export default function BuildItinerary() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve draft trip from navigation state or localStorage fallback
  const draftTrip = location.state || (() => {
    try {
      const stored = localStorage.getItem('tripora_draft_trip');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  })();

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
    if (sections.length <= 1) return;

    setSections((prev) => prev.filter((_, idx) => idx !== indexToDelete));
    
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

  // Helper to calculate status based on start & end dates
  const calculateTripStatus = (startStr, endStr) => {
    if (!startStr || !endStr) return 'upcoming';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(startStr);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(endStr);
    endDate.setHours(23, 59, 59, 999);

    if (endDate < today) {
      return 'completed';
    } else if (startDate <= today && today <= endDate) {
      return 'ongoing';
    } else {
      return 'upcoming';
    }
  };

  // Save flow -> Navigates to /my-trips and stores created trip
  const handleSaveItinerary = (e) => {
    e.preventDefault();

    if (!validateItinerary()) {
      alert('Please fix validation errors in the itinerary sections.');
      return;
    }

    // Determine overall start & end date from sections or draft
    const firstSecDate = sections[0]?.startDate || draftTrip?.startDate || '2026-09-01';
    const lastSecDate  = sections[sections.length - 1]?.endDate || draftTrip?.endDate || '2026-09-07';

    // Calculate status (ongoing, upcoming, completed)
    const tripStatus = calculateTripStatus(firstSecDate, lastSecDate);

    // Calculate total budget
    const totalBudget = sections.reduce((acc, curr) => acc + (parseFloat(curr.budget) || 0), 0);

    // Calculate total days
    const diffTime = Math.abs(new Date(lastSecDate) - new Date(firstSecDate));
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 5;

    // Build route string from locations or place
    const locations = sections.map((s) => s.location.trim()).filter(Boolean);
    const routeString = locations.length > 0
      ? locations.join(' → ')
      : (draftTrip?.place || 'Custom Route');

    // Build formatted date string
    const formatDateShort = (dStr) => {
      if (!dStr) return '';
      const d = new Date(dStr);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    };
    const formattedDates = `${formatDateShort(firstSecDate)} – ${formatDateShort(lastSecDate)}`;

    // Place image
    const placeName = draftTrip?.place || 'Goa';
    const coverImage = PLACE_IMAGES[placeName] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';

    // New Trip Object
    const newTrip = {
      id: Date.now(),
      name: draftTrip?.tripName || `${placeName} Trip`,
      route: routeString,
      destination: `${placeName}, India`,
      startDate: firstSecDate,
      endDate: lastSecDate,
      dates: formattedDates,
      days: totalDays,
      stops: sections.length,
      budget: totalBudget > 0 ? totalBudget : 35000,
      status: tripStatus,
      image: coverImage
    };

    // Load existing stored trips or default list
    let existingTrips = [];
    try {
      const stored = localStorage.getItem('tripora_trips');
      if (stored) {
        existingTrips = JSON.parse(stored);
      }
    } catch (err) {
      existingTrips = [];
    }

    const updatedTrips = [newTrip, ...existingTrips];
    localStorage.setItem('tripora_trips', JSON.stringify(updatedTrips));

    alert(`Itinerary Saved! "${newTrip.name}" is now added under ${tripStatus.toUpperCase()} trips. 🎉`);
    navigate('/my-trips');
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
              <p className="iti-page-subtitle">
                {draftTrip ? `Planning: ${draftTrip.tripName} (${draftTrip.place})` : 'Plan your trip section by section'}
              </p>
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
