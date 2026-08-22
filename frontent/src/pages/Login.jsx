import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, saveSession } from '../lib/api';
import './Login.css';

/* ─── SVG Icon helpers (inline, no external deps) ─── */
const IconEmail = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconLock = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeClosed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ─── Globe / travel decorative SVG for left panel ─── */
const TravelIllustration = () => (
  <svg className="travel-illustration" viewBox="0 0 340 320" fill="none" aria-hidden="true">
    <circle cx="170" cy="155" r="110" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
    <circle cx="170" cy="155" r="110" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="40" />
    <ellipse cx="170" cy="155" rx="110" ry="42" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
    <ellipse cx="170" cy="155" rx="110" ry="80" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" />
    <path d="M170 45 Q210 155 170 265" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
    <path d="M170 45 Q130 155 170 265" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
    <line x1="60" y1="155" x2="280" y2="155" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
    <circle cx="170" cy="155" r="110" stroke="rgba(255,255,255,0.30)" strokeWidth="2" />
    <g transform="translate(68, 70) rotate(-30)">
      <path d="M0 12 L28 0 L24 12 L28 24 Z" fill="rgba(255,255,255,0.85)" />
      <path d="M12 8 L24 0 L22 12 Z" fill="rgba(255,255,255,0.5)" />
      <path d="M8 16 L20 24 L18 12 Z" fill="rgba(255,255,255,0.5)" />
    </g>
    <g transform="translate(205, 95)">
      <circle cx="0" cy="0" r="10" fill="rgba(255,255,255,0.90)" />
      <circle cx="0" cy="0" r="4" fill="#6c5ce7" />
      <line x1="0" y1="10" x2="0" y2="22" stroke="rgba(255,255,255,0.80)" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g transform="translate(130, 185)">
      <circle cx="0" cy="0" r="8" fill="rgba(255,255,255,0.75)" />
      <circle cx="0" cy="0" r="3" fill="#6c5ce7" />
      <line x1="0" y1="8" x2="0" y2="18" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g transform="translate(225, 180)">
      <circle cx="0" cy="0" r="7" fill="rgba(255,255,255,0.70)" />
      <circle cx="0" cy="0" r="3" fill="#6c5ce7" />
      <line x1="0" y1="7" x2="0" y2="17" stroke="rgba(255,255,255,0.60)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <path d="M205 95 Q185 140 130 185" stroke="rgba(255,255,255,0.40)" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
    <path d="M130 185 Q178 183 225 180" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
    <circle cx="60" cy="50" r="2.5" fill="rgba(255,255,255,0.60)" />
    <circle cx="300" cy="80" r="2" fill="rgba(255,255,255,0.50)" />
    <circle cx="290" cy="240" r="3" fill="rgba(255,255,255,0.45)" />
    <circle cx="50" cy="230" r="2" fill="rgba(255,255,255,0.40)" />
    <circle cx="170" cy="25" r="2" fill="rgba(255,255,255,0.55)" />
    <circle cx="170" cy="285" r="2" fill="rgba(255,255,255,0.50)" />
  </svg>
);

const AvatarIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="url(#avatarGrad)" />
    <circle cx="40" cy="32" r="14" fill="rgba(255,255,255,0.90)" />
    <ellipse cx="40" cy="68" rx="22" ry="14" fill="rgba(255,255,255,0.75)" />
    <defs>
      <linearGradient id="avatarGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6c5ce7" />
        <stop offset="1" stopColor="#b8c0ff" />
      </linearGradient>
    </defs>
  </svg>
);

const validateEmail = (value) => {
  if (!value.trim()) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
  return '';
};

const validatePassword = (value) => {
  if (!value) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return '';
};

export default function Login({ onRegister }) {
  const navigate = useNavigate();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError]     = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched]           = useState({ email: false, password: false });
  const [submitError, setSubmitError]   = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (touched.password) setPasswordError(validatePassword(e.target.value));
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    setTouched({ email: true, password: true });
    if (!eErr && !pErr) {
      setIsSubmitting(true); setSubmitError('');
      try { const result = await api.login({ email, password }); saveSession(result.data); navigate('/Home'); }
      catch (error) { setSubmitError(error.message); }
      finally { setIsSubmitting(false); }
      return;
      alert('Login successful! 🎉 (UI demo only)');
    }
  };

  return (
    <div className="login-page">
      {/* ── Left Panel ── */}
      <aside className="login-left" aria-label="Tripora branding">
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />
        <div className="blob blob-3" aria-hidden="true" />

        <div className="left-content">
          <div className="brand-logo">
            <span className="brand-icon" aria-hidden="true">✈</span>
          </div>
          <h1 className="brand-name">Tripora</h1>
          <p className="brand-tagline">Plan Your Journey. Your Way.</p>

          <TravelIllustration />

          <div className="left-features">
            <div className="feature-badge">
              <span>🗺️</span>
              <span>Smart Itineraries</span>
            </div>
            <div className="feature-badge">
              <span>📍</span>
              <span>Discover Destinations</span>
            </div>
            <div className="feature-badge">
              <span>🌐</span>
              <span>Travel Community</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right Panel ── */}
      <main className="login-right" aria-label="Login form">
        <div className="mobile-brand">
          <span className="mobile-brand-icon">✈</span>
          <span className="mobile-brand-name">Tripora</span>
          <p className="mobile-brand-tagline">Plan Your Journey. Your Way.</p>
        </div>

        <div className="login-card" role="region" aria-label="Sign in card">
          <div className="avatar-wrap" aria-hidden="true">
            <AvatarIcon />
          </div>

          <h2 className="card-title">Welcome Back</h2>
          <p className="card-subtitle">Sign in to continue planning your next adventure.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {submitError && <div className="error-msg" role="alert">{submitError}</div>}
            {/* Email */}
            <div className={`form-group${emailError && touched.email ? ' has-error' : ''}`}>
              <label htmlFor="login-email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <IconEmail />
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  autoComplete="email"
                  aria-describedby={emailError ? 'email-error' : undefined}
                  aria-invalid={!!(emailError && touched.email)}
                />
              </div>
              {emailError && touched.email && (
                <span id="email-error" className="error-msg" role="alert">{emailError}</span>
              )}
            </div>

            {/* Password */}
            <div className={`form-group${passwordError && touched.password ? ' has-error' : ''}`}>
              <label htmlFor="login-password" className="form-label">Password</label>
              <div className="input-wrapper">
                <IconLock />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  autoComplete="current-password"
                  aria-describedby={passwordError ? 'password-error' : undefined}
                  aria-invalid={!!(passwordError && touched.password)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <IconEyeClosed /> : <IconEyeOpen />}
                </button>
              </div>
              {passwordError && touched.password && (
                <span id="password-error" className="error-msg" role="alert">{passwordError}</span>
              )}
              <div className="forgot-row">
                <a href="#forgot" className="forgot-link">Forgot Password?</a>
              </div>
            </div>

            <button id="login-submit-btn" type="submit" className="login-btn" disabled={isSubmitting}>
              Login
            </button>
          </form>

          <p className="signup-prompt">
            Don&apos;t have an account?{' '}
            <a href="#signup" className="signup-link" onClick={(e) => { e.preventDefault(); onRegister?.(); }}>Sign Up</a>
          </p>
        </div>
      </main>
    </div>
  );
}
