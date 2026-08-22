// src/components/packing/AddPackingItem.jsx
import React, { useState } from 'react';
import './AddPackingItem.css';

const CATEGORIES = [
  'Essentials',
  'Clothing',
  'Footwear',
  'Toiletries',
  'Electronics',
  'Documents',
  'Health & Safety',
  'Activity Gear',
  'Weather Essentials'
];

export default function AddPackingItem({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Essentials');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      category,
      quantity: Number(quantity) || 1,
      why: 'User added custom item.'
    });

    setName('');
    setCategory('Essentials');
    setQuantity(1);
    setIsOpen(false);
  };

  return (
    <div className="add-packing-item-container">
      {!isOpen ? (
        <button
          type="button"
          className="add-custom-trigger-btn"
          onClick={() => setIsOpen(true)}
        >
          + Add Custom Item
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="add-custom-item-form animate-fade">
          <h4 className="form-title">Add Custom Item</h4>
          
          <div className="form-fields-row">
            <div className="form-group-cell name-cell">
              <label htmlFor="custom-item-name" className="item-input-label">Item Name</label>
              <input
                id="custom-item-name"
                type="text"
                className="item-input-text"
                placeholder="e.g. Swimming Goggles, Novel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group-cell cat-cell">
              <label htmlFor="custom-item-category" className="item-input-label">Category</label>
              <select
                id="custom-item-category"
                className="item-select-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-cell qty-cell">
              <label htmlFor="custom-item-quantity" className="item-input-label">Qty</label>
              <input
                id="custom-item-quantity"
                type="number"
                min="1"
                className="item-input-text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions-row">
            <button
              type="button"
              className="form-btn-link cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-btn-submit"
            >
              Add Item
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
// Stub AddPackingItem.jsx for resolution
