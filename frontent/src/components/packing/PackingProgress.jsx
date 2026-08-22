// src/components/packing/PackingProgress.jsx
import React from 'react';
import './PackingProgress.css';

export default function PackingProgress({ packedCount, totalCount }) {
  const pct = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;
  const isDone = pct === 100 && totalCount > 0;

  return (
    <div className="packing-progress-bar-card">
      <div className="progress-bar-row">
        <span className="progress-bar-nums font-bold">
          {packedCount} / {totalCount} packed
        </span>
        <span className="progress-bar-percent font-bold">{pct}%</span>
      </div>

      <div className="progress-track-wrapper">
        <div
          className={`progress-fill-indicator ${isDone ? 'is-complete' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {isDone && (
        <div className="packing-complete-toast animate-fade">
          🎉 You're ready to go! ✓
        </div>
      )}
    </div>
  );
}
