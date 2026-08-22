import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { api } from '../lib/api';
import './CreateTrip.css';

// Suggestion mock data mapped by place
const SUGGESTIONS_BY_PLACE = {
  Goa: [
    { id: 1, name: 'Baga Beach Watersports', category: 'Adventure', rating: 4.7, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Fort Aguada Sunset View', category: 'Sightseeing', rating: 4.5, image: 'https://images.unsplash.com/photo-1587922446474-3c8b516b4a5d?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Dudhsagar Waterfalls Trek', category: 'Nature', rating: 4.8, image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Scuba Diving at Grand Island', category: 'Adventure', rating: 4.9, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Basilica of Bom Jesus', category: 'Heritage', rating: 4.6, image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Anjuna Beach Flea Market', category: 'Shopping', rating: 4.4, image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80' }
  ],
  Manali: [
    { id: 1, name: 'Paragliding in Solang Valley', category: 'Adventure', rating: 4.9, image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Rohtang Pass Snow Trek', category: 'Adventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Hadimba Temple Visit', category: 'Culture', rating: 4.6, image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Jogini Waterfalls Hike', category: 'Nature', rating: 4.7, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Old Manali Cafe Crawl', category: 'Food & Drink', rating: 4.5, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Vashisht Hot Water Springs', category: 'Wellness', rating: 4.3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80' }
  ],
  Jaipur: [
    { id: 1, name: 'Amber Fort Elephant Ride / Tour', category: 'Heritage', rating: 4.8, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Hawa Mahal Photography', category: 'Sightseeing', rating: 4.6, image: 'https://images.unsplash.com/photo-1477587458883-471a5ed942e5?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'City Palace Heritage Museum', category: 'Heritage', rating: 4.7, image: 'https://images.unsplash.com/photo-1598890790684-14ad5c9772d1?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Chokhi Dhani Cultural Dinner', category: 'Food & Culture', rating: 4.5, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Nahargarh Sunset View', category: 'Sightseeing', rating: 4.9, image: 'https://images.unsplash.com/photo-1561361049-5e74cd49cc45?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Johari Bazaar Jewellery Shopping', category: 'Shopping', rating: 4.4, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' }
  ]
};

// Default fallback activities when no destination is matches
const DEFAULT_SUGGESTIONS = [
  { id: 1, name: 'Local Sightseeing Tour', category: 'General', rating: 4.5, image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Traditional Cultural Evening', category: 'Culture', rating: 4.6, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Nature Trekking Expeditions', category: 'Nature', rating: 4.7, image: 'https://images.unsplash.com/photo-1551632613-c5d841238912?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Authentic Food Tasting Trail', category: 'Food & Drink', rating: 4.8, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Adventure Outdoor Activities', category: 'Adventure', rating: 4.4, image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Souvenir & Craft Shopping', category: 'Shopping', rating: 4.3, image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80' }
];

export default function CreateTrip() {
  const navigate = useNavigate();

  // Form Field States
  const [tripName, setTripName]       = useState('');
  const [place, setPlace]             = useState('Goa');
  const [startDate, setStartDate]     = useState('');
  const [endDate, setEndDate]         = useState('');
  const [addedActivities, setAddedActivities] = useState([]);
  const [formErrors, setFormErrors]   = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Suggestion Fetch
  const suggestions = SUGGESTIONS_BY_PLACE[place] || DEFAULT_SUGGESTIONS;

  const handleToggleActivity = (activity) => {
    if (addedActivities.find((a) => a.id === activity.id)) {
      setAddedActivities((prev) => prev.filter((a) => a.id !== activity.id));
    } else {
      setAddedActivities((prev) => [...prev, activity]);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!tripName.trim()) errors.tripName = 'Trip name is required.';
    if (!startDate) errors.startDate = 'Start date is required.';
    if (!endDate) errors.endDate = 'End date is required.';
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      errors.endDate = 'End date cannot be earlier than start date.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const draft = {
        tripName,
        place,
        startDate,
        endDate,
        addedActivities
      };
      setIsSubmitting(true); setSubmitError('');
      try {
        const result = await api.createTrip({ name: tripName, description: `Trip to ${place}`, startDate, endDate });
        localStorage.setItem('tripora_draft_trip', JSON.stringify({ ...draft, tripId: result.data._id }));
        navigate('/build-itinerary', { state: { ...draft, tripId: result.data._id } });
      } catch (error) { setSubmitError(error.message); }
      finally { setIsSubmitting(false); }
    }
  };

  return (
    <div className="ct-page-wrapper">
      {/* ── Header Navbar ── */}
      <Navbar />

      <main className="ct-main-content">
        <div className="ct-layout-container">
          
          <header className="ct-page-header">
            <h1 className="ct-page-title">Create a new Trip</h1>
            <p className="ct-page-subtitle">Draft your itinerary, choose destinations, and pick activities.</p>
          </header>

          <form className="ct-main-form" onSubmit={handleCreateSubmit} noValidate>
            {submitError && <div className="ct-error-msg" role="alert">{submitError}</div>}
            
            {/* ── Plan a New Trip Form Panel ── */}
            <fieldset className="ct-form-panel">
              <legend className="ct-panel-legend">Plan a new trip</legend>

              <div className="ct-form-grid">
                {/* Trip Name */}
                <div className={`ct-form-group${formErrors.tripName ? ' has-error' : ''}`}>
                  <label htmlFor="ct-tripName" className="ct-label">Trip Title / Name:</label>
                  <input
                    id="ct-tripName"
                    type="text"
                    className="ct-input"
                    placeholder="e.g. Summer Vacation, Weekend Getaway"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    aria-describedby={formErrors.tripName ? 'ct-tripName-error' : undefined}
                    aria-invalid={!!formErrors.tripName}
                  />
                  {formErrors.tripName && (
                    <span id="ct-tripName-error" className="ct-error-msg" role="alert">{formErrors.tripName}</span>
                  )}
                </div>

                {/* Destination Selector */}
                <div className="ct-form-group">
                  <label htmlFor="ct-place" className="ct-label">Select a Place:</label>
                  <select
                    id="ct-place"
                    className="ct-select"
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                      setAddedActivities([]); // Clear added activities on place change
                    }}
                  >
                    <option value="Goa">Goa</option>
                    <option value="Manali">Manali</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Ladakh">Ladakh</option>
                  </select>
                </div>

                {/* Start Date */}
                <div className={`ct-form-group${formErrors.startDate ? ' has-error' : ''}`}>
                  <label htmlFor="ct-startDate" className="ct-label">Start Date:</label>
                  <input
                    id="ct-startDate"
                    type="date"
                    className="ct-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    aria-describedby={formErrors.startDate ? 'ct-startDate-error' : undefined}
                    aria-invalid={!!formErrors.startDate}
                  />
                  {formErrors.startDate && (
                    <span id="ct-startDate-error" className="ct-error-msg" role="alert">{formErrors.startDate}</span>
                  )}
                </div>

                {/* End Date */}
                <div className={`ct-form-group${formErrors.endDate ? ' has-error' : ''}`}>
                  <label htmlFor="ct-endDate" className="ct-label">End Date:</label>
                  <input
                    id="ct-endDate"
                    type="date"
                    className="ct-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    aria-describedby={formErrors.endDate ? 'ct-endDate-error' : undefined}
                    aria-invalid={!!formErrors.endDate}
                  />
                  {formErrors.endDate && (
                    <span id="ct-endDate-error" className="ct-error-msg" role="alert">{formErrors.endDate}</span>
                  )}
                </div>
              </div>
            </fieldset>

            {/* ── Suggestions Section ── */}
            <section className="ct-suggestions-section" aria-labelledby="ct-suggestions-heading">
              <h2 id="ct-suggestions-heading" className="ct-suggestions-title">
                Suggestions for Places to Visit / Activities to perform
              </h2>

              <div className="ct-suggestions-grid">
                {suggestions.map((act) => {
                  const isAdded = addedActivities.some((a) => a.id === act.id);
                  return (
                    <article key={act.id} className={`ct-activity-card${isAdded ? ' is-added' : ''}`}>
                      <div className="ct-card-image-wrap">
                        <img src={act.image} alt={act.name} className="ct-card-img" />
                        <div className="ct-card-overlay" />
                        <span className="ct-card-badge">{act.category}</span>
                        <button
                          type="button"
                          className="ct-card-add-btn"
                          onClick={() => handleToggleActivity(act)}
                          aria-label={isAdded ? `Remove ${act.name}` : `Add ${act.name}`}
                        >
                          {isAdded ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                      <div className="ct-card-body">
                        <h3 className="ct-card-name">{act.name}</h3>
                        <div className="ct-card-meta">
                          <span className="ct-card-rating">★ {act.rating}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* ── Submit Row ── */}
            <div className="ct-submit-row">
              <button
                type="button"
                className="ct-cancel-btn"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ct-save-btn"
              >
                {isSubmitting ? 'Creating…' : 'Create Itinerary'}
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}
