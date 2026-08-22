import React, { useState } from 'react';
import './CreatePost.css';

export default function CreatePost({ onPublish }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('Travel Story');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => setImagePreview(evt.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newPost = {
      id: Date.now(),
      user: {
        name: 'Vishwa Patel',
        location: 'Ahmedabad, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        badge: 'Traveler'
      },
      title,
      destination: destination || 'India',
      description,
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      image: imagePreview || null,
      likes: 0,
      comments: 0,
      commentsList: [],
      time: 'Just now',
      isSaved: false,
      isLiked: false
    };

    onPublish(newPost);
    setTitle('');
    setDestination('');
    setCategory('Travel Story');
    setDescription('');
    setTags('');
    setImagePreview(null);
    setExpanded(false);
  };

  return (
    <div className="create-post-wrapper">
      {!expanded ? (
        /* Compact Bar */
        <div className="cp-compact-bar" onClick={() => setExpanded(true)}>
          <div className="cp-user-avatar-mini">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Your avatar"
            />
          </div>
          <div className="cp-placeholder-text">Share your travel experience...</div>
          <button
            type="button"
            className="cp-create-btn"
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
          >
            ✏ Create Post
          </button>
        </div>
      ) : (
        /* Expanded Form */
        <form className="cp-expanded-form" onSubmit={handlePublish} noValidate>
          <div className="cp-form-header">
            <h3 className="cp-form-title">Create a Community Post</h3>
            <button type="button" className="cp-close-btn" onClick={() => setExpanded(false)}>✕</button>
          </div>

          <div className="cp-form-grid">
            <div className="cp-form-group cp-full-width">
              <label className="cp-label">Post Title *</label>
              <input
                type="text"
                className="cp-input"
                placeholder="e.g. My 3 Days in Goa 🌴"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="cp-form-group">
              <label className="cp-label">Destination</label>
              <input
                type="text"
                className="cp-input"
                placeholder="e.g. Goa, India"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="cp-form-group">
              <label className="cp-label">Category</label>
              <select
                className="cp-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Travel Story</option>
                <option>Activities</option>
                <option>Food</option>
                <option>Hotels</option>
                <option>Adventure</option>
                <option>Budget Tips</option>
              </select>
            </div>

            <div className="cp-form-group cp-full-width">
              <label className="cp-label">Description *</label>
              <textarea
                className="cp-textarea"
                placeholder="Share your travel experience, tips, or recommendations..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="cp-form-group">
              <label className="cp-label">Tags (comma separated)</label>
              <input
                type="text"
                className="cp-input"
                placeholder="Beach, Food, Nightlife"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="cp-form-group">
              <label className="cp-label">Add Photo</label>
              <input type="file" accept="image/*" className="cp-file-input" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="cp-image-preview" />}
            </div>
          </div>

          <div className="cp-form-actions">
            <button type="button" className="cp-btn-cancel" onClick={() => setExpanded(false)}>Cancel</button>
            <button type="submit" className="cp-btn-publish">🚀 Publish Post</button>
          </div>
        </form>
      )}
    </div>
  );
}
