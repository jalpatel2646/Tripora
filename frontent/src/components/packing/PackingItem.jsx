// src/components/packing/PackingItem.jsx
import React, { useState } from 'react';
import './PackingItem.css';

export default function PackingItem({ item, onToggle, onUpdateQty, onDelete }) {
  const [showWhy, setShowWhy] = useState(false);

  const canAdjustQty = ['clothing', 'footwear'].includes(item.category.toLowerCase()) && item.quantity !== undefined;

  return (
    <div className={`packing-item-row ${item.packed ? 'is-packed' : ''}`}>
      <div className="item-left-cell">
        <label className="checkbox-container-wrap">
          <input
            type="checkbox"
            className="item-checkbox-input"
            checked={item.packed}
            onChange={() => onToggle(item.id)}
          />
          <span className="checkbox-custom-check" />
          <span className="item-label-name font-semibold">{item.name}</span>
        </label>

        {item.why && (
          <div className="why-recommendation-popover-wrap">
            <button
              type="button"
              className="why-trigger-link"
              onClick={(e) => {
                e.stopPropagation();
                setShowWhy(!showWhy);
              }}
            >
              Why?
            </button>
            {showWhy && (
              <div className="why-text-bubble-box animate-fade">
                {item.why}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="item-right-cell">
        {/* Quantity Controls */}
        {canAdjustQty && (
          <div className="item-qty-selector">
            <button
              type="button"
              className="qty-action-btn minus"
              onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="qty-number-display">{item.quantity}</span>
            <button
              type="button"
              className="qty-action-btn plus"
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
        )}

        {/* Delete Action button */}
        <button
          type="button"
          className="item-row-delete-btn"
          onClick={() => onDelete(item.id)}
          title="Delete Item"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
