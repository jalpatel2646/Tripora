import React, { useState } from 'react';
import './CommunityPost.css';

export default function CommunityPost({ post, onLike, onSave }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.commentsList || []);

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    const c = { id: Date.now(), author: 'Vishwa', text: newComment.trim() };
    setComments((prev) => [...prev, c]);
    setNewComment('');
  };

  const handleShareClick = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('Post link copied to clipboard! 📋');
  };

  return (
    <div className="community-post-outer">
      {/* Left: Standalone Avatar */}
      <div className="cp-left-avatar" aria-hidden="true">
        <div className="cp-avatar-circle">
          <img src={post.user.avatar} alt={post.user.name} />
        </div>
        <div className="cp-avatar-line" />
      </div>

      {/* Right: Full Post Card */}
      <article className="community-post-card" aria-label={`Post by ${post.user.name}: ${post.title}`}>
        {/* User Info Row */}
        <div className="cpost-user-row">
          <div className="cpost-user-info">
            <span className="cpost-user-name">{post.user.name}</span>
            {post.user.badge && <span className="cpost-user-badge">{post.user.badge}</span>}
            <span className="cpost-user-location">📍 {post.user.location}</span>
          </div>
          <div className="cpost-meta-right">
            <span className="cpost-category-chip">{post.category}</span>
            <span className="cpost-time">{post.time}</span>
          </div>
        </div>

        {/* Post Title & Destination */}
        <h3 className="cpost-title">{post.title}</h3>
        <p className="cpost-destination">📍 {post.destination}</p>

        {/* Description */}
        <p className="cpost-description">{post.description}</p>

        {/* Post Image */}
        {post.image && (
          <div className="cpost-image-wrap">
            <img src={post.image} alt={post.title} className="cpost-img" loading="lazy" />
          </div>
        )}

        {/* Trip Recommendation Block */}
        {post.tripInfo && (
          <div className="cpost-trip-info">
            <div className="cpost-trip-title">🗺 Trip: <strong>{post.tripInfo.name}</strong></div>
            <div className="cpost-trip-details">
              <span>⏱ {post.tripInfo.duration}</span>
              <span>💰 Est. Cost: {post.tripInfo.cost}</span>
              <span>⭐ Best: {post.tripInfo.bestExperience}</span>
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="cpost-tags-row">
            {post.tags.map((tag, i) => (
              <span key={i} className="cpost-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="cpost-actions-row">
          <button
            type="button"
            className={`cpost-action-btn${post.isLiked ? ' is-liked' : ''}`}
            onClick={() => onLike(post.id)}
            aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
          >
            {post.isLiked ? '♥' : '♡'} {post.isLiked ? 'Liked' : 'Like'}
            {post.likes > 0 && <span className="cpost-count"> {post.likes}</span>}
          </button>

          <button
            type="button"
            className={`cpost-action-btn${showComments ? ' is-active' : ''}`}
            onClick={() => setShowComments((v) => !v)}
          >
            💬 Comment
            {comments.length > 0 && <span className="cpost-count"> {comments.length}</span>}
          </button>

          <button
            type="button"
            className={`cpost-action-btn${post.isSaved ? ' is-saved' : ''}`}
            onClick={() => onSave(post.id)}
          >
            {post.isSaved ? '🔖 Saved ✓' : '🔖 Save'}
          </button>

          <button
            type="button"
            className="cpost-action-btn"
            onClick={handleShareClick}
          >
            ↗ Share
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="cpost-comments-section">
            <h4 className="cpost-comments-title">Comments</h4>

            {comments.length === 0 ? (
              <p className="cpost-no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="cpost-comments-list">
                {comments.map((c) => (
                  <div key={c.id} className="cpost-comment-item">
                    <span className="cpost-comment-author">{c.author}:</span>
                    <span className="cpost-comment-text">{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="cpost-comment-input-row">
              <input
                type="text"
                className="cpost-comment-input"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              />
              <button type="button" className="cpost-comment-send-btn" onClick={handleSendComment}>
                Send
              </button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
