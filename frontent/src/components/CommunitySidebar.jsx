import React from 'react';
import './CommunitySidebar.css';

const HIGHLIGHTS = {
  trendingDestination: 'Goa',
  popularActivity: 'Water Sports',
  mostLikedPost: '"7 Days in Rajasthan"',
  topContributor: 'Aarav Shah'
};

const TOP_DESTINATIONS = [
  { name: 'Goa', icon: '🏖️', posts: 142 },
  { name: 'Manali', icon: '🏔️', posts: 98 },
  { name: 'Jaipur', icon: '🏰', posts: 87 },
  { name: 'Kerala', icon: '🌴', posts: 76 }
];

export default function CommunitySidebar() {
  return (
    <aside className="community-sidebar" aria-label="Community Highlights">
      {/* Highlights Card */}
      <div className="csb-card">
        <h3 className="csb-card-title">✨ Community Highlights</h3>
        <div className="csb-highlights-list">
          <div className="csb-highlight-item">
            <span className="csb-hi-icon">🔥</span>
            <div>
              <div className="csb-hi-label">Trending Destination</div>
              <div className="csb-hi-value">{HIGHLIGHTS.trendingDestination}</div>
            </div>
          </div>
          <div className="csb-highlight-item">
            <span className="csb-hi-icon">⭐</span>
            <div>
              <div className="csb-hi-label">Popular Activity</div>
              <div className="csb-hi-value">{HIGHLIGHTS.popularActivity}</div>
            </div>
          </div>
          <div className="csb-highlight-item">
            <span className="csb-hi-icon">❤️</span>
            <div>
              <div className="csb-hi-label">Most Liked Post</div>
              <div className="csb-hi-value">{HIGHLIGHTS.mostLikedPost}</div>
            </div>
          </div>
          <div className="csb-highlight-item">
            <span className="csb-hi-icon">👤</span>
            <div>
              <div className="csb-hi-label">Top Contributor</div>
              <div className="csb-hi-value">{HIGHLIGHTS.topContributor}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations Card */}
      <div className="csb-card">
        <h3 className="csb-card-title">🗺 Top Destinations</h3>
        <div className="csb-dest-list">
          {TOP_DESTINATIONS.map((dest, i) => (
            <div key={i} className="csb-dest-item">
              <span className="csb-dest-icon">{dest.icon}</span>
              <span className="csb-dest-name">{dest.name}</span>
              <span className="csb-dest-count">{dest.posts} posts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Community CTA Card */}
      <div className="csb-card csb-cta-card">
        <div className="csb-cta-icon">🌍</div>
        <h4 className="csb-cta-title">Join the Conversation</h4>
        <p className="csb-cta-text">Share your travel stories and inspire other travelers.</p>
      </div>
    </aside>
  );
}
