import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Landing.css';

// Navigation Component specific to the Landing Page aesthetics
const LandingNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="landing-navbar">
      <div className="nav-left">
        <span className="landing-brand-logo" onClick={() => navigate('/')}>Tripora</span>
      </div>
      <div className="nav-center hide-mobile">
        <Link to="/explore/cities">Destinations</Link>
        <a href="#pricing">Pricing</a>
        <a href="#reviews">Reviews</a>
      </div>
      <div className="nav-right">
        <button className="nav-login-btn" onClick={() => navigate('/login')}>Log In</button>
        <button className="nav-signup-btn primary-cta" onClick={() => navigate('/register')}>Sign Up</button>
      </div>
    </nav>
  );
};

export default function Home() {
  const navigate = useNavigate();

  // Scroll animations on mount
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleQuickPlan = (e) => {
    e.preventDefault();
    navigate('/register'); // Redirect to register/login for auth
  };

  return (
    <div className="tripora-landing">
      {/* 01 Navigation */}
      <LandingNavbar />

      {/* 02 Hero Section */}
      <section className="hero-section">
        <div className="hero-content fade-up">
          <span className="eyebrow">THE SMARTER WAY TO TRAVEL</span>
          <h1 className="hero-headline display-font">Your next journey <br/> starts here.</h1>
          <p className="hero-subtitle">
            Discover unforgettable destinations, build personalized itineraries, and keep every part of your journey in one beautiful place.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/register')}>Plan Your Trip</button>
            <button className="btn-secondary" onClick={() => navigate('/explore/cities')}>Explore Destinations</button>
          </div>
        </div>
        <div className="hero-visual fade-up">
          <div className="hero-image-wrapper">
            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80" alt="Paris Journey" className="hero-image" />
            <div className="floating-trip-card">
              <div className="ftc-header">Mumbai → Goa</div>
              <div className="ftc-details">
                <span className="ftc-duration">8 days</span>
                <span className="ftc-budget">₹42,500 estimated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Quick Trip Planner */}
      <section className="quick-planner-section fade-up">
        <form className="quick-planner-bar" onSubmit={handleQuickPlan}>
          <div className="qp-field">
            <label>Where to?</label>
            <input type="text" placeholder="e.g. Goa, Paris..." required />
          </div>
          <div className="qp-divider"></div>
          <div className="qp-field">
            <label>Dates</label>
            <input type="text" placeholder="10 Jun — 18 Jun" required />
          </div>
          <div className="qp-divider"></div>
          <div className="qp-field">
            <label>Travelers</label>
            <input type="number" min="1" placeholder="2 Travelers" required />
          </div>
          <button type="submit" className="qp-btn">Plan My Trip</button>
        </form>
      </section>

      {/* 04 Best Destinations */}
      <section className="destinations-section fade-up">
        <div className="section-header text-center">
          <h2>Where will you go next?</h2>
          <p>Handpicked places worth adding to your map.</p>
        </div>
        <div className="destination-grid">
          {[
            { id: 1, name: 'Santorini', country: 'Greece', desc: 'Whitewashed villages, deep blue seas and unforgettable sunsets.', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80' },
            { id: 2, name: 'Bali', country: 'Indonesia', desc: 'Lush landscapes, sacred temples and vibrant culture.', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
            { id: 3, name: 'Swiss Alps', country: 'Switzerland', desc: 'Majestic peaks, crystal lakes and alpine adventure.', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },
            { id: 4, name: 'Kyoto', country: 'Japan', desc: 'Ancient temples, cherry blossoms and timeless traditions.', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' }
          ].map(dest => (
            <div className="dest-card" key={dest.id} onClick={() => navigate(`/explore`)}>
              <img src={dest.img} alt={dest.name} className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-location">{dest.country}</div>
                <h3 className="display-font">{dest.name}</h3>
                <p>{dest.desc}</p>
                <button className="explore-dest-btn">Explore →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 Interactive World Map */}
      <section className="world-map-section fade-up">
        <div className="section-header text-center">
          <h2 className="display-font">Your world is waiting.</h2>
          <p>Explore destinations, discover new routes, and turn inspiration into your next adventure.</p>
        </div>
        <div className="map-container">
          <svg viewBox="0 0 1000 500" className="vector-world-map">
            {/* Abstract simplified world map path (placeholder rendering) */}
            <path d="M100 150 Q 200 50 300 200 T 500 150 T 700 250 T 900 150 Q 950 300 800 400 T 500 450 T 200 400 Z" fill="#DCE6D3" opacity="0.3" stroke="#A7C4A0" strokeWidth="2" strokeDasharray="5,5"/>
            <path d="M600 50 Q 700 100 650 200" fill="none" stroke="#B8C0FF" strokeWidth="2" strokeDasharray="4"/>
            <circle cx="150" cy="200" r="6" fill="#8FB18A" className="map-marker" />
            <circle cx="350" cy="180" r="6" fill="#8FB18A" className="map-marker" />
            <circle cx="650" cy="150" r="8" fill="#B8C0FF" className="map-marker active-marker" />
            <circle cx="750" cy="280" r="6" fill="#8FB18A" className="map-marker" />

            <foreignObject x="660" y="100" width="200" height="100" className="map-tooltip">
              <div className="tooltip-content">
                <h4>Dubai, UAE</h4>
                <p>Futuristic architecture and desert charm.</p>
                <span>[ Explore ]</span>
              </div>
            </foreignObject>
          </svg>
        </div>
      </section>

      {/* 06 How Tripora Works */}
      <section className="how-it-works-section fade-up">
        <div className="section-header text-center">
          <h2>From idea to itinerary.</h2>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Discover</h3>
            <p>Find destinations and experiences that match your travel style.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Plan</h3>
            <p>Build your multi-city itinerary, activities and schedule.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Go</h3>
            <p>Track your journey, manage your budget and share your adventure.</p>
          </div>
        </div>
      </section>

      {/* 07 Feature Highlights */}
      <section className="features-section fade-up">
        <div className="section-header text-center">
          <h2>Everything your journey needs.</h2>
        </div>
        <div className="features-grid">
          <div className="feat-card">
            <h4>Smart Itineraries</h4><p>Build detailed day-by-day plans without the planning chaos.</p>
          </div>
          <div className="feat-card">
            <h4>Multi-City Trips</h4><p>Connect multiple destinations into one seamless journey.</p>
          </div>
          <div className="feat-card">
            <h4>Budget Tracking</h4><p>Know what your trip will cost before you go.</p>
          </div>
          <div className="feat-card">
            <h4>Activity Discovery</h4><p>Find experiences worth adding to your itinerary.</p>
          </div>
          <div className="feat-card">
            <h4>Travel Calendar</h4><p>See your entire journey at a glance.</p>
          </div>
          <div className="feat-card">
            <h4>Trip Sharing</h4><p>Share your adventures or copy trips from the community.</p>
          </div>
        </div>
      </section>

      {/* 08 Pricing */}
      <section id="pricing" className="pricing-section fade-up">
        <div className="section-header text-center">
          <h2>Travel your way.</h2>
        </div>
        <div className="pricing-cards">
          <div className="plan-card">
            <h3>FREE</h3>
            <p className="plan-target">For casual explorers.</p>
            <div className="plan-price">₹0 <span>/ forever</span></div>
            <ul>
              <li>Destination discovery</li>
              <li>Basic trip planning</li>
              <li>Basic itinerary</li>
              <li>Community access</li>
            </ul>
            <button className="btn-secondary" onClick={() => navigate('/register')}>Start Free</button>
          </div>
          <div className="plan-card popular-plan">
            <div className="popular-badge">MOST POPULAR</div>
            <h3>EXPLORER</h3>
            <p className="plan-target">For frequent travelers.</p>
            <div className="plan-price">₹799 <span>/ month</span></div>
            <ul>
              <li>Unlimited trips</li>
              <li>Advanced itineraries</li>
              <li>Budget tracking</li>
              <li>Trip sharing</li>
              <li>Calendar planning</li>
            </ul>
            <button className="btn-primary" onClick={() => navigate('/register')}>Start Exploring</button>
          </div>
          <div className="plan-card">
            <h3>WANDERER</h3>
            <p className="plan-target">For serious travelers.</p>
            <div className="plan-price">₹1899 <span>/ month</span></div>
            <ul>
              <li>Everything in Explorer</li>
              <li>Advanced AI recommendations</li>
              <li>Itinerary optimization</li>
              <li>Priority features</li>
              <li>Advanced travel insights</li>
            </ul>
            <button className="btn-secondary" onClick={() => navigate('/register')}>Go Further</button>
          </div>
        </div>
      </section>

      {/* 09 People Reviews */}
      <section id="reviews" className="reviews-section fade-up">
        <div className="section-header text-center">
          <h2>Travelers are already planning differently.</h2>
        </div>
        <div className="reviews-container">
          <div className="review-card">
            <p>"Tripora completely changed how I plan multi-city trips. I went from scattered notes and spreadsheets to having my entire journey organized in one place."</p>
            <div className="reviewer">
              <div className="rev-avatar">M</div>
              <div className="rev-info">
                <strong>Maya</strong><span>Mumbai</span>
              </div>
            </div>
          </div>
          <div className="review-card">
            <p>"I discovered places I wouldn't have found on my own, and the budget breakdown made planning so much easier."</p>
            <div className="reviewer">
              <div className="rev-avatar">A</div>
              <div className="rev-info">
                <strong>Arjun</strong><span>Bangalore</span>
              </div>
            </div>
          </div>
          <div className="review-card">
            <p>"The itinerary builder is incredibly satisfying. I can see my whole trip before I even leave home."</p>
            <div className="reviewer">
              <div className="rev-avatar">E</div>
              <div className="rev-info">
                <strong>Emma</strong><span>London</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Final CTA */}
      <section className="final-cta-section fade-up">
        <div className="final-cta-content">
          <h2 className="display-font">Your next adventure is closer than you think.</h2>
          <p>Stop collecting travel ideas. Start turning them into journeys.</p>
          <div className="hero-actions justify-center">
            <button className="btn-primary" onClick={() => navigate('/register')}>Plan Your Trip</button>
            <button className="btn-secondary dark-sec" onClick={() => navigate('/explore/cities')}>Explore Destinations</button>
          </div>
        </div>
      </section>

      {/* 11 Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="foot-brand">
            <h2 className="display-font">Tripora</h2>
            <p>"Plan less. Travel more."</p>
            <div className="social-icons">
              <span>Instagram</span> • <span>X</span> • <span>LinkedIn</span>
            </div>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <Link to="/explore/cities">Destinations</Link>
            <Link to="/explore/activities">Activities</Link>
            <Link to="/community">Community</Link>
          </div>
          <div className="foot-col">
            <h4>Plan</h4>
            <Link to="/register">Create Trip</Link>
            <Link to="/register">My Trips</Link>
            <Link to="/register">Budget</Link>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Tripora. All rights reserved. "Made for travelers who love the journey."</p>
          <div className="legal">
            <span>Privacy</span><span>Terms</span><span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}