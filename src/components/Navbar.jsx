import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="tp-navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="Tripora Home">
          <span className="logo-icon" aria-hidden="true">✈</span>
          <span className="logo-text">Tripora</span>
        </Link>

        {/* Links */}
        <div className="navbar-menu">
          <Link to="/" className={`menu-item${isActive('/') ? ' is-active' : ''}`}>
            Home
          </Link>
          <Link to="/my-trips" className={`menu-item${isActive('/my-trips') ? ' is-active' : ''}`}>
            My Trips
          </Link>
          <Link to="/explore" className={`menu-item${isActive('/explore') ? ' is-active' : ''}`}>
            Explore
          </Link>
          <Link to="/profile" className={`menu-item${isActive('/profile') ? ' is-active' : ''}`}>
            Profile
          </Link>
        </div>

        {/* Profile Avatar button */}
        <div className="navbar-profile">
          <Link to="/profile" className="profile-btn" aria-label="User profile settings">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User Avatar"
              className="profile-avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
