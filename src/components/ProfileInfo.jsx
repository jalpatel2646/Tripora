import React, { useState, useRef } from 'react';
import './ProfileInfo.css';

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const DefaultAvatar = () => (
  <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="#E7D8FF" />
    <circle cx="40" cy="30" r="12" fill="#6C5CE7" opacity="0.80" />
    <ellipse cx="40" cy="62" rx="20" ry="12" fill="#6C5CE7" opacity="0.65" />
  </svg>
);

export default function ProfileInfo({ user, isEditing, setIsEditing, onSaveUser }) {
  const [formData, setFormData] = useState(user);
  const [previewImage, setPreviewImage] = useState(user.profileImage);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPreviewImage(evt.target.result);
      setFormData((prev) => ({ ...prev, profileImage: evt.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setPreviewImage(user.profileImage);
    setIsEditing(false);
  };

  return (
    <section className="profile-info-section" aria-label="User Profile Details">
      {/* ── Left Side: Profile Photo ── */}
      <div className="pi-photo-wrapper">
        <button
          type="button"
          className="pi-photo-circle-btn"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload profile photo"
        >
          <div className="pi-photo-circle">
            {previewImage ? (
              <img src={previewImage} alt={`${user.firstName} ${user.lastName}`} className="pi-photo-img" />
            ) : (
              <DefaultAvatar />
            )}
            <div className="pi-photo-overlay" aria-hidden="true">
              <CameraIcon />
            </div>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="pi-file-input"
          onChange={handleImageChange}
        />
        <span className="pi-photo-caption">Click to update photo</span>
      </div>

      {/* ── Right Side: Details / Edit Form ── */}
      <div className="pi-details-wrapper">
        {!isEditing ? (
          /* View Mode */
          <div className="pi-view-mode">
            <div className="pi-view-header">
              <div>
                <h2 className="pi-user-name">{user.firstName} {user.lastName}</h2>
                <p className="pi-user-location">📍 {user.city}{user.country ? `, ${user.country}` : ''}</p>
              </div>
              <button
                type="button"
                className="pi-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏ Edit Profile
              </button>
            </div>

            <div className="pi-contact-grid">
              <div className="pi-contact-item">
                <span className="pi-contact-label">Email:</span>
                <span className="pi-contact-value">{user.email}</span>
              </div>
              <div className="pi-contact-item">
                <span className="pi-contact-label">Phone:</span>
                <span className="pi-contact-value">{user.phone}</span>
              </div>
              <div className="pi-contact-item">
                <span className="pi-contact-label">City:</span>
                <span className="pi-contact-value">{user.city}</span>
              </div>
              <div className="pi-contact-item">
                <span className="pi-contact-label">Country:</span>
                <span className="pi-contact-value">{user.country}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form className="pi-edit-form" onSubmit={handleSave} noValidate>
            <h2 className="pi-edit-form-title">Edit Personal Details</h2>

            <div className="pi-form-grid">
              <div className="pi-form-group">
                <label htmlFor="pi-firstName" className="pi-form-label">First Name</label>
                <input
                  id="pi-firstName"
                  name="firstName"
                  type="text"
                  className="pi-form-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pi-form-group">
                <label htmlFor="pi-lastName" className="pi-form-label">Last Name</label>
                <input
                  id="pi-lastName"
                  name="lastName"
                  type="text"
                  className="pi-form-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pi-form-group">
                <label htmlFor="pi-email" className="pi-form-label">Email Address</label>
                <input
                  id="pi-email"
                  name="email"
                  type="email"
                  className="pi-form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pi-form-group">
                <label htmlFor="pi-phone" className="pi-form-label">Phone Number</label>
                <input
                  id="pi-phone"
                  name="phone"
                  type="tel"
                  className="pi-form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pi-form-group">
                <label htmlFor="pi-city" className="pi-form-label">City</label>
                <input
                  id="pi-city"
                  name="city"
                  type="text"
                  className="pi-form-input"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pi-form-group">
                <label htmlFor="pi-country" className="pi-form-label">Country</label>
                <input
                  id="pi-country"
                  name="country"
                  type="text"
                  className="pi-form-input"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pi-form-actions">
              <button type="button" className="pi-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="pi-btn-save">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
