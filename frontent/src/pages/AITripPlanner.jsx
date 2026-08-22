// src/pages/AITripPlanner.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlannerForm from '../components/ai-planner/PlannerForm';
import TripSummary from '../components/ai-planner/TripSummary';
import GenerationLoader from '../components/ai-planner/GenerationLoader';
import GeneratedTrip from '../components/ai-planner/GeneratedTrip';
import { generateAITrip } from '../data/aiTripMockData';
import { api } from '../lib/api';
import './AITripPlanner.css';

const INITIAL_FORM = {
  from: '',
  to: '',
  startDate: '',
  endDate: '',
  budget: 30000,
  travelStyle: 'balanced',
  travelerType: 'solo',
  travelerCount: 1,
  interests: [],
  pace: 'balanced',
  transport: 'any',
  accommodationType: 'any',
  foodPref: 'any',
  specialRequests: ''
};

// Destination images matching other screens
const IMAGES_BY_DESTINATION = {
  goa: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
  jaipur: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
  manali: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
  mumbai: 'https://images.unsplash.com/photo-1529250833832-89668f9ffb55?auto=format&fit=crop&w=600&q=80',
  kerala: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
  udaipur: 'https://images.unsplash.com/photo-1598890790684-14ad5c9772d1?auto=format&fit=crop&w=600&q=80',
};

export default function AITripPlanner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [screen, setScreen] = useState('form'); // 'form' | 'loading' | 'results'
  const [generatedData, setGeneratedData] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState('');

  const handleFormChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleGenerate = () => {
    setScreen('loading');
    
    // Simulate mock delay of 1.8 seconds for AI build feel
    setTimeout(() => {
      try {
        const res = generateAITrip(formData);
        setGeneratedData(res);
        setScreen('results');
      } catch (err) {
        alert('An error occurred during generation: ' + err.message);
        setScreen('form');
      }
    }, 1800);
  };

  const handleRegenerate = () => {
    setScreen('loading');
    setTimeout(() => {
      try {
        const nextVersion = generatedData ? generatedData.version : 1;
        const res = generateAITrip(formData, nextVersion);
        setGeneratedData(res);
        setScreen('results');
      } catch (err) {
        alert('An error occurred during regeneration: ' + err.message);
        setScreen('results');
      }
    }, 1500);
  };

  const getDestImg = (dest) => {
    const d = (dest || '').toLowerCase();
    for (const [key, url] of Object.entries(IMAGES_BY_DESTINATION)) {
      if (d.includes(key)) return url;
    }
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';
  };

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const handleSave = async (finalTrip) => {
    try {
      // 1. Try backend storage if access token exists
      const token = localStorage.getItem('tripora_access_token');
      if (token) {
        await api.createTrip({
          name: finalTrip.title,
          description: finalTrip.aiSummary,
          startDate: finalTrip.startDate,
          endDate: finalTrip.endDate
        });
      }

      // 2. LocalStorage storage to ensure integration with My Trips page
      const newListItem = {
        id: Date.now(),
        name: finalTrip.title,
        route: `${finalTrip.from} → ${finalTrip.to}`,
        destination: finalTrip.to,
        startDate: finalTrip.startDate,
        endDate: finalTrip.endDate,
        dates: `${formatDateLabel(finalTrip.startDate)} – ${formatDateLabel(finalTrip.endDate)}`,
        days: finalTrip.days,
        stops: 1,
        budget: finalTrip.budget,
        status: 'upcoming',
        image: getDestImg(finalTrip.to)
      };

      const existingStr = localStorage.getItem('tripora_trips');
      let existingList = [];
      if (existingStr) {
        try {
          const parsed = JSON.parse(existingStr);
          if (Array.isArray(parsed)) existingList = parsed;
        } catch (e) {}
      }
      
      const updatedList = [newListItem, ...existingList];
      localStorage.setItem('tripora_trips', JSON.stringify(updatedList));

      setSaveSuccess('Trip saved successfully! Redirecting to My Trips...');
      setTimeout(() => {
        navigate('/my-trips');
      }, 1500);

    } catch (error) {
      alert('Failed to save trip: ' + error.message);
    }
  };

  return (
    <div className="ai-planner-page-container">
      <Navbar />

      <main className="ai-planner-main">
        <div className="ai-planner-layout-width">
          {saveSuccess && <div className="toast-success-banner">{saveSuccess}</div>}

          {screen === 'form' && (
            <div className="animate-fade">
              {/* Header */}
              <header className="ai-planner-header">
                <span className="ai-planner-badge">AI Trip Planner ✨</span>
                <h1 className="ai-planner-title">Plan less. Travel more.</h1>
                <p className="ai-planner-subtitle">
                  Tell us where you're going and what you love. Tripora will build a personalized itinerary around your time and budget.
                </p>
              </header>

              {/* Main Content Layout */}
              <div className="ai-planner-columns-grid">
                <div className="ai-planner-main-panel">
                  <PlannerForm
                    formData={formData}
                    onChange={handleFormChange}
                    onGenerate={handleGenerate}
                  />
                </div>

                <TripSummary formData={formData} />
              </div>
            </div>
          )}

          {screen === 'loading' && (
            <GenerationLoader destination={formData.to || 'your'} />
          )}

          {screen === 'results' && generatedData && (
            <GeneratedTrip
              tripData={generatedData}
              onRegenerate={handleRegenerate}
              onSave={handleSave}
              onBack={() => setScreen('form')}
            />
          )}
        </div>
      </main>
    </div>
  );
}
