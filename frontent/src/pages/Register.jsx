import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, saveSession } from '../lib/api';
import './Register.css';

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */
const IconUser = () => (
  <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconEmail = () => (
  <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconPhone = () => (
  <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.31 6.31l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconCity = () => (
  <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M9 21V7l6-4v18M9 11h6" />
  </svg>
);

const IconGlobe = () => (
  <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconLock = () => (
  <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

/* ── Left panel travel illustration (same as Login) ── */
const TravelIllustration = () => (
  <svg className="rg-travel-illustration" viewBox="0 0 340 320" fill="none" aria-hidden="true">
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

/* ── Default avatar inside the photo circle ── */
const DefaultAvatar = () => (
  <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="#e7d8ff" />
    <circle cx="40" cy="30" r="11" fill="#6c5ce7" opacity="0.70" />
    <ellipse cx="40" cy="62" rx="19" ry="12" fill="#6c5ce7" opacity="0.55" />
  </svg>
);

/* ═══════════════════════════════════════════
   Validation
   ═══════════════════════════════════════════ */
const rules = {
  firstName:       (v) => v.trim() ? '' : 'First name is required.',
  lastName:        (v) => v.trim() ? '' : 'Last name is required.',
  email:           (v) => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email.';
    return '';
  },
  phone:           (v) => v.trim() ? '' : 'Phone number is required.',
  city:            (v) => v.trim() ? '' : 'City is required.',
  country:         (v) => v.trim() ? '' : 'Country is required.',
  password:        (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 6) return 'Minimum 6 characters.';
    return '';
  },
  confirmPassword: (v, all) => {
    if (!v) return 'Please confirm your password.';
    if (v !== all.password) return 'Passwords do not match.';
    return '';
  },
};

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', phone: '',
  city: '', country: '', bio: '',
  password: '', confirmPassword: '',
};
const INITIAL_ERRORS  = Object.fromEntries(Object.keys(INITIAL_FORM).map((k) => [k, '']));
const INITIAL_TOUCHED = Object.fromEntries(Object.keys(INITIAL_FORM).map((k) => [k, false]));

/* ── FieldGroup sub-component ── */
function FieldGroup({ id, label, icon, error, touched, children }) {
  return (
    <div className={`rg-field-group${error && touched ? ' has-error' : ''}`}>
      <label htmlFor={id} className="rg-label">{label}</label>
      <div className="rg-input-wrap">
        {icon}
        {children}
      </div>
      {error && touched && (
        <span id={`${id}-err`} className="rg-error" role="alert">{error}</span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
export default function Register({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm]               = useState(INITIAL_FORM);
  const [errors, setErrors]           = useState(INITIAL_ERRORS);
  const [touched, setTouched]         = useState(INITIAL_TOUCHED);
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [photoSrc, setPhotoSrc]       = useState(null);
  const fileInputRef                  = useRef(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name, value) => {
    const fn = rules[name];
    return fn ? fn(value, { ...form, [name]: value }) : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => setPhotoSrc(evt.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    const allErrors  = Object.fromEntries(Object.keys(form).map((k) => [k, validate(k, form[k])]));
    setTouched(allTouched);
    setErrors(allErrors);
    if (!Object.values(allErrors).some(Boolean)) {
      setIsSubmitting(true); setSubmitError('');
      try { const result = await api.register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password, phone: form.phone, city: form.city, country: form.country, bio: form.bio }); saveSession(result.data); navigate('/home'); }
      catch (error) {
        setSubmitError(error.message?.toLowerCase().includes('already registered')
          ? 'Your account already registered please login'
          : error.message);
      }
      finally { setIsSubmitting(false); }
      return;
      alert('Registration successful! 🎉 (UI demo only)');
    }
  };

  const ip = (name) => ({
    id: `rg-${name}`, name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': !!(errors[name] && touched[name]),
  });

  return (
    <div className="rg-page">

      {/* ══ LEFT PANEL (same as Login) ══ */}
      <aside className="rg-left" aria-label="Tripora branding">
        <div className="rg-blob rg-blob-1" aria-hidden="true" />
        <div className="rg-blob rg-blob-2" aria-hidden="true" />
        <div className="rg-blob rg-blob-3" aria-hidden="true" />

        <div className="rg-left-content">
          <div className="rg-brand-logo">
            <span className="rg-brand-icon" aria-hidden="true">✈</span>
          </div>
          <h1 className="rg-brand-name">Tripora</h1>
          <p className="rg-brand-tagline">Plan Your Journey. Your Way.</p>

          <TravelIllustration />

          <div className="rg-left-features">
            <div className="rg-feature-badge"><span>🗺️</span><span>Smart Itineraries</span></div>
            <div className="rg-feature-badge"><span>📍</span><span>Discover Destinations</span></div>
            <div className="rg-feature-badge"><span>🌐</span><span>Travel Community</span></div>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT PANEL — registration form ══ */}
      <main className="rg-right" aria-label="Registration form">

        {/* Mobile brand header */}
        <div className="rg-mobile-brand">
          <span className="rg-mobile-brand-icon">✈</span>
          <span className="rg-mobile-brand-name">Tripora</span>
          <p className="rg-mobile-brand-tagline">Plan Your Journey. Your Way.</p>
        </div>

        <div className="rg-card" role="region" aria-label="Create account card">

          {/* ── Photo avatar ── */}
          <div className="rg-photo-section">
            <button
              type="button"
              className="rg-photo-btn"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload profile photo"
            >
              <div className="rg-photo-circle">
                {photoSrc
                  ? <img src={photoSrc} alt="Profile preview" className="rg-photo-img" />
                  : <DefaultAvatar />}
                <div className="rg-photo-overlay"><IconCamera /></div>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="rg-photo-hidden"
              onChange={handlePhotoChange}
              aria-label="Choose profile photo"
            />
            <p className="rg-photo-label">Upload Photo</p>
          </div>

          {/* ── Heading ── */}
          <h2 className="rg-card-title">Create Your Account</h2>
          <p className="rg-card-subtitle">Join Tripora and start planning your journeys.</p>

          <form className="rg-form" onSubmit={handleSubmit} noValidate>
            {submitError && <div className="rg-error" role="alert">{submitError}</div>}

            {/* ── Personal Info ── */}
            <div className="rg-section-title">Personal Information</div>

            <div className="rg-grid-2">
              <FieldGroup id="rg-firstName" label="First Name" icon={<IconUser />} error={errors.firstName} touched={touched.firstName}>
                <input type="text" className="rg-input" placeholder="Enter first name" autoComplete="given-name" {...ip('firstName')} />
              </FieldGroup>

              <FieldGroup id="rg-lastName" label="Last Name" icon={<IconUser />} error={errors.lastName} touched={touched.lastName}>
                <input type="text" className="rg-input" placeholder="Enter last name" autoComplete="family-name" {...ip('lastName')} />
              </FieldGroup>

              <FieldGroup id="rg-email" label="Email Address" icon={<IconEmail />} error={errors.email} touched={touched.email}>
                <input type="email" className="rg-input" placeholder="Enter your email" autoComplete="email" {...ip('email')} />
              </FieldGroup>

              <FieldGroup id="rg-phone" label="Phone Number" icon={<IconPhone />} error={errors.phone} touched={touched.phone}>
                <input type="tel" className="rg-input" placeholder="Enter phone number" autoComplete="tel" {...ip('phone')} />
              </FieldGroup>

              <FieldGroup id="rg-city" label="City" icon={<IconCity />} error={errors.city} touched={touched.city}>
                <input type="text" className="rg-input" placeholder="Enter your city" autoComplete="address-level2" {...ip('city')} />
              </FieldGroup>

              <FieldGroup id="rg-country" label="Country" icon={<IconGlobe />} error={errors.country} touched={touched.country}>
                <input type="text" className="rg-input" placeholder="Enter your country" autoComplete="country-name" {...ip('country')} />
              </FieldGroup>
            </div>

            {/* ── Additional Info ── */}
            <div className="rg-section-title rg-section-title--mt">Additional Information</div>
            <textarea
              id="rg-bio"
              name="bio"
              className="rg-textarea"
              placeholder="Tell us about your travel interests, favorite destinations..."
              value={form.bio}
              onChange={handleChange}
              rows={3}
              aria-label="Travel interests"
            />

            {/* ── Passwords ── */}
            <div className="rg-grid-2 rg-grid-2--mt">
              <FieldGroup id="rg-password" label="Password" icon={<IconLock />} error={errors.password} touched={touched.password}>
                <input type={showPass ? 'text' : 'password'} className="rg-input rg-input--eye" placeholder="Create password" autoComplete="new-password" {...ip('password')} />
                <button type="button" className="rg-eye-btn" onClick={() => setShowPass((v) => !v)} aria-label={showPass ? 'Hide' : 'Show'}>
                  {showPass ? <IconEyeClosed /> : <IconEyeOpen />}
                </button>
              </FieldGroup>

              <FieldGroup id="rg-confirmPassword" label="Confirm Password" icon={<IconLock />} error={errors.confirmPassword} touched={touched.confirmPassword}>
                <input type={showConfirm ? 'text' : 'password'} className="rg-input rg-input--eye" placeholder="Confirm password" autoComplete="new-password" {...ip('confirmPassword')} />
                <button type="button" className="rg-eye-btn" onClick={() => setShowConfirm((v) => !v)} aria-label={showConfirm ? 'Hide' : 'Show'}>
                  {showConfirm ? <IconEyeClosed /> : <IconEyeOpen />}
                </button>
              </FieldGroup>
            </div>

            {/* ── Submit ── */}
            <button id="rg-submit-btn" type="submit" className="rg-submit-btn" disabled={isSubmitting}>
              Create Account
            </button>
          </form>

          <p className="rg-login-prompt">
            Already have an account?{' '}
            <a href="#login" className="rg-login-link" onClick={(e) => { e.preventDefault(); onLogin?.(); }}>Login</a>
          </p>
        </div>
      </main>
    </div>
  );
}
