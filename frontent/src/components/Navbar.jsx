import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import triporaLogo from '../assets/tripora_logo.png';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="tp-navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo" aria-label="Tripora Home">
          <img src={triporaLogo} alt="Tripora" className="navbar-logo-img" />
        </Link>

        {/* Links */}
        <div className="navbar-menu">
          <Link to="/home" className={`menu-item${isActive('/home') ? ' is-active' : ''}`}>
            Home
          </Link>
          <Link to="/my-trips" className={`menu-item${isActive('/my-trips') ? ' is-active' : ''}`}>
            My Trips
          </Link>
          <Link to="/explore" className={`menu-item${isActive('/explore') ? ' is-active' : ''}`}>
            Explore
          </Link>
          <Link to="/community" className={`menu-item${isActive('/community') ? ' is-active' : ''}`}>
            Community
          </Link>
          <Link to="/calendar" className={`menu-item${isActive('/calendar') ? ' is-active' : ''}`}>
            Calendar
          </Link>
          <Link to="/admin" className={`menu-item${isActive('/admin') ? ' is-active' : ''}`}>
            Admin
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
