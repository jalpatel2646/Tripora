import React from 'react';
import './AdminTabs.css';

export default function AdminTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'users', label: 'Users' },
    { id: 'cities', label: 'Cities' },
    { id: 'activities', label: 'Activities' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="adm-tabs-row" role="tablist" aria-label="Admin Sections">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`adm-tab-btn${activeTab === t.id ? ' is-active' : ''}`}
          onClick={() => setActiveTab(t.id)}
          role="tab"
          aria-selected={activeTab === t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
