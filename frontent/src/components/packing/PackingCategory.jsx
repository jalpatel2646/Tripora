// src/components/packing/PackingCategory.jsx
import React, { useState } from 'react';
import PackingItem from './PackingItem';
import './PackingCategory.css';

export default function PackingCategory({ title, items = [], onToggleItem, onUpdateQty, onDeleteItem }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (items.length === 0) return null;

  const packedCount = items.filter((i) => i.packed).length;

  return (
    <section className={`packing-category-section ${isCollapsed ? 'is-collapsed' : ''}`} aria-labelledby={`cat-title-${title}`}>
      <header className="cat-header-row" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="cat-header-left">
          <h3 id={`cat-title-${title}`} className="cat-title">{title}</h3>
          <span className="cat-progress-count">
            {packedCount} / {items.length} packed
          </span>
        </div>
        <span className="cat-collapse-arrow">{isCollapsed ? '▼' : '▲'}</span>
      </header>

      {!isCollapsed && (
        <div className="cat-items-list-container animate-fade">
          {items.map((item) => (
            <PackingItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
              onUpdateQty={onUpdateQty}
              onDelete={onDeleteItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}
