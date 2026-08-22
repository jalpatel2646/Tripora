import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ItineraryDay from '../components/ItineraryDay';
import BudgetSummary from '../components/BudgetSummary';
import './SharedItineraryView.css';
import '../pages/ItineraryView.css'; // Reuse core styles

// Initial Itinerary Dummy Data for demonstration
const INITIAL_ITINERARY = [
  {
    day: 1,
    date: '12 Aug 2026',
    city: 'Mumbai',
    activities: [
      { id: 1, time: '09:00 AM', name: 'Ahmedabad to Mumbai Flight', type: 'Travel', duration: '1h 20m', description: 'Flight from Ahmedabad Airport to Mumbai.', expense: 4500 },
      { id: 2, time: '01:00 PM', name: 'Hotel Check-in & Rest', type: 'Hotel', duration: '1 Day', description: 'Stay at Taj Lands End, Mumbai.', expense: 3000 },
      { id: 3, time: '06:00 PM', name: 'Marine Drive Sunset Walk', type: 'Sightseeing', duration: '2 Hours', description: 'Evening stroll along the Queen\'s Necklace coastline.', expense: 0 }
    ]
  },
  {
    day: 2,
    date: '13 Aug 2026',
    city: 'Goa',
    activities: [
      { id: 4, time: '08:30 AM', name: 'Mumbai to Goa Connecting Flight', type: 'Travel', duration: '1h 15m', description: 'Morning flight to Dabolim Airport, Goa.', expense: 2500 },
      { id: 6, time: '05:30 PM', name: 'Baga Beach Sunset & Seafood Dinner', type: 'Food', duration: '3 Hours', description: 'Dinner and fresh candlelit seafood at beach shacks.', expense: 1800 }
    ]
  }
];

export default function SharedItineraryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Calculate dynamic overall total expense
  const totalExpense = INITIAL_ITINERARY.reduce((tripTotal, dayObj) => {
    return tripTotal + dayObj.activities.reduce((dayTotal, act) => dayTotal + (parseFloat(act.expense) || 0), 0);
  }, 0);

  // Calculate totals by category
  const categoryTotals = INITIAL_ITINERARY.reduce((acc, dayObj) => {
    dayObj.activities.forEach((act) => {
      const typeKey = act.type.toLowerCase();
      acc[typeKey] = (acc[typeKey] || 0) + (parseFloat(act.expense) || 0);
    });
    return acc;
  }, {});

  const handleCopyTrip = () => {
    // Logic to copy trip into user's account goes here (API call)
    alert('Journey duplicated! This trip has been added to your Account.');
    navigate('/create-trip'); // Redirect to their builder where they can edit it
  };

  const shareUrl = window.location.href;

  const handleSocialShare = (platform) => {
    const text = encodeURIComponent('Check out this amazing Trip Itinerary on Tripora!');
    const url = encodeURIComponent(shareUrl);
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="iv-page-container shared-page-container">
      <Navbar />

      <main className="iv-main">
        <div className="iv-layout-wrapper">
          
          {/* Public Banner & Actions */}
          <div className="public-banner-area">
            <div className="banner-content glass-panel">
              <div className="banner-text">
                <span className="public-badge">🌐 Public Itinerary</span>
                <h2>You're viewing a shared journey</h2>
                <p>Created by <strong>Jane Traveler</strong> • Copied {Math.floor(Math.random() * 50) + 12} times</p>
              </div>
              <div className="banner-actions">
                <button className="primary-action-btn copy-trip-btn" onClick={handleCopyTrip}>
                  <span className="icon">📄</span> Duplicate & Edit
                </button>
              </div>
            </div>
            
            {/* Social Share Ribbon */}
            <div className="social-share-ribbon">
              <span>Share this trip:</span>
              <button className="social-btn copy-link" onClick={() => handleSocialShare('copy')}>
                🔗 {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="social-btn twitter" onClick={() => handleSocialShare('twitter')}>
                🐦 Twitter
              </button>
              <button className="social-btn facebook" onClick={() => handleSocialShare('facebook')}>
                📘 Facebook
              </button>
              <button className="social-btn whatsapp" onClick={() => handleSocialShare('whatsapp')}>
                💬 WhatsApp
              </button>
            </div>
          </div>

          {/* Itinerary Header */}
          <header className="iv-trip-header">
            <div className="iv-header-top-row">
              <span className="iv-header-subtitle-label">YOUR ITINERARY</span>
            </div>

            <h1 className="iv-trip-title">Goa Escape - Public View</h1>

            {/* Route Visualization */}
            <div className="iv-route-visualization" aria-label="Trip Route">
              <div className="iv-route-point">
                <span className="iv-route-dot"></span>
                <span className="iv-route-city">Ahmedabad</span>
              </div>
              <div className="iv-route-line"></div>
              <div className="iv-route-point">
                <span className="iv-route-dot"></span>
                <span className="iv-route-city">Mumbai</span>
              </div>
              <div className="iv-route-line"></div>
              <div className="iv-route-point">
                <span className="iv-route-dot"></span>
                <span className="iv-route-city">Goa</span>
              </div>
            </div>

            {/* Simplified Trip Info */}
            <div className="iv-trip-info-summary">
              <div className="iv-info-block">
                <span className="iv-info-label">DATES</span>
                <span className="iv-info-value">12 Aug — 20 Aug</span>
              </div>
              <div className="iv-info-block">
                <span className="iv-info-label">DURATION</span>
                <span className="iv-info-value">8 Days • 3 Cities</span>
              </div>
              <div className="iv-info-block iv-budget-block">
                <span className="iv-info-label">ESTIMATED BUDGET</span>
                <span className="iv-info-value">₹{totalExpense.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </header>

          {/* Itinerary List */}
          <div className="iv-content-layout">
            <div className="iv-main-itinerary-area read-only-mode">
              <div className="iv-section-title-row">
                <h2 className="iv-section-title">Your Itinerary</h2>
                <span className="iv-section-subtitle">
                  {INITIAL_ITINERARY.length} {INITIAL_ITINERARY.length === 1 ? 'day' : 'days'} • {INITIAL_ITINERARY.reduce((sum, d) => sum + d.activities.length, 0)} activities
                </span>
              </div>
              <div className="iv-days-list">
                {INITIAL_ITINERARY.map((dayData) => (
                  <ItineraryDay key={dayData.day} dayData={dayData} />
                ))}
              </div>
            </div>

            <aside className="iv-sidebar-column">
              <BudgetSummary
                categoryTotals={categoryTotals}
                totalExpense={totalExpense}
                plannedBudget={50000}
              />
            </aside>
          </div>

        </div>
      </main>
    </div>
  );
}
