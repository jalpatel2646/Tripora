// src/pages/PackingList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PackingProgress from '../components/packing/PackingProgress';
import PackingCategory from '../components/packing/PackingCategory';
import AddPackingItem from '../components/packing/AddPackingItem';
import PackingInsights from '../components/packing/PackingInsights';
import { generatePackingList } from '../utils/packingGenerator';
import { getTripWeather } from '../services/weatherService';
import './PackingList.css';

// Mock Trip Data lookup for the details header
const MOCK_TRIPS = {
  '1': {
    id: 1,
    title: 'Goa Escape',
    from: 'Ahmedabad',
    to: 'Goa',
    startDate: '2026-08-12',
    endDate: '2026-08-17',
    days: 6,
    travelerCount: 4,
    itinerary: [
      { day: 1, date: '2026-08-12', city: 'Mumbai', activities: [{ name: 'Ahmedabad to Mumbai Flight', type: 'Travel', time: '09:00 AM' }] },
      { day: 2, date: '2026-08-13', city: 'Goa', activities: [{ name: 'Beachside Resort Check-in', type: 'Hotel', time: '02:00 PM' }] },
      { day: 3, date: '2026-08-14', city: 'Goa', activities: [{ name: 'Water Sports & Parasailing', type: 'Adventure', time: '10:00 AM' }, { name: 'Fort Aguada Heritage Tour', type: 'Sightseeing', time: '03:00 PM' }] }
    ]
  },
  'draft': {
    id: 'draft',
    title: 'Goa Escape',
    from: 'Ahmedabad',
    to: 'Goa',
    startDate: '2026-08-12',
    endDate: '2026-08-17',
    days: 6,
    travelerCount: 4,
    itinerary: [
      { day: 1, date: '2026-08-12', city: 'Mumbai', activities: [{ name: 'Ahmedabad to Mumbai Flight', type: 'Travel', time: '09:00 AM' }] },
      { day: 2, date: '2026-08-13', city: 'Goa', activities: [{ name: 'Beachside Resort Check-in', type: 'Hotel', time: '02:00 PM' }] },
      { day: 3, date: '2026-08-14', city: 'Goa', activities: [{ name: 'Water Sports & Parasailing', type: 'Adventure', time: '10:00 AM' }] }
    ]
  }
};

const DEFAULT_TRIP = {
  id: 'default',
  title: 'My Trip',
  from: 'Ahmedabad',
  to: 'Goa',
  startDate: '2026-08-12',
  endDate: '2026-08-17',
  days: 6,
  travelerCount: 4,
  itinerary: []
};

export default function PackingList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(DEFAULT_TRIP);
  const [weather, setWeather] = useState({});
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'unpacked' | 'packed' | 'essentials' | 'weather' | 'activities'
  const [customItems, setCustomItems] = useState([]);

  // Load trip and generate list
  useEffect(() => {
    // 1. Fetch trip data
    const selectedTrip = MOCK_TRIPS[id] || DEFAULT_TRIP;
    setTrip(selectedTrip);

    // 2. Fetch weather for trip
    getTripWeather(selectedTrip.itinerary || []).then((weatherMap) => {
      setWeather(weatherMap);

      // 3. Load or generate packing list items
      const localKey = `tripora_packing_${id}`;
      const savedItems = localStorage.getItem(localKey);
      
      const customKey = `tripora_packing_custom_${id}`;
      const savedCustom = localStorage.getItem(customKey);
      if (savedCustom) {
        try { setCustomItems(JSON.parse(savedCustom)); } catch(e) {}
      }

      if (savedItems) {
        try {
          setItems(JSON.parse(savedItems));
        } catch (e) {
          generateAndSaveList(selectedTrip, weatherMap);
        }
      } else {
        generateAndSaveList(selectedTrip, weatherMap);
      }
    });
  }, [id]);

  const generateAndSaveList = (tripData, weatherMap) => {
    const list = generatePackingList(tripData, weatherMap);
    setItems(list);
    localStorage.setItem(`tripora_packing_${id}`, JSON.stringify(list));
  };

  // State Persistence sync
  const saveState = (updatedList, updatedCustom = customItems) => {
    setItems(updatedList);
    setCustomItems(updatedCustom);
    localStorage.setItem(`tripora_packing_${id}`, JSON.stringify(updatedList));
    localStorage.setItem(`tripora_packing_custom_${id}`, JSON.stringify(updatedCustom));
  };

  // Item Check / Toggle
  const handleToggleItem = (itemId) => {
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    saveState(updated);
  };

  // Item quantity update
  const handleUpdateQty = (itemId, newQty) => {
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQty } : item
    );
    saveState(updated);
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    const updated = items.filter((item) => item.id !== itemId);
    const updatedCustom = customItems.filter((item) => item.id !== itemId);
    saveState(updated, updatedCustom);
  };

  // Add custom item
  const handleAddCustomItem = (newItem) => {
    const customObj = {
      ...newItem,
      id: `custom-${Date.now()}`,
      packed: false
    };
    const updated = [customObj, ...items];
    const updatedCustom = [customObj, ...customItems];
    saveState(updated, updatedCustom);
  };

  // Re-generate checklist
  const handleRegenerate = () => {
    if (window.confirm("This will rebuild recommended items from your current trip. Your custom items will be kept.")) {
      const generatedList = generatePackingList(trip, weather);
      // Merge custom items back at the top
      const mergedList = [...customItems, ...generatedList];
      saveState(mergedList);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Don't Forget / Critical section (Essentials marked as critical)
  const getCriticalItems = () => {
    return items.filter((i) => i.isEssential && ['documents', 'health & safety'].includes(i.category.toLowerCase()));
  };

  const criticalItems = getCriticalItems();

  // Category groupings
  const getGroupedCategories = () => {
    // Filter and search
    let list = [...items];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }

    // Tab filter
    if (activeFilter === 'unpacked') list = list.filter((i) => !i.packed);
    if (activeFilter === 'packed')   list = list.filter((i) => i.packed);
    if (activeFilter === 'essentials') list = list.filter((i) => i.isEssential);
    if (activeFilter === 'weather') list = list.filter((i) => i.tags && i.tags.includes('weather'));
    if (activeFilter === 'activities') list = list.filter((i) => i.tags && i.tags.includes('activity'));

    const groups = {};
    list.forEach((item) => {
      // Exclude critical essentials from clothing/toiletries category to avoid duplicate check listing
      if (item.isEssential && ['documents', 'health & safety'].includes(item.category.toLowerCase())) {
        return;
      }
      
      const cat = item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });

    return groups;
  };

  const groupedCategories = getGroupedCategories();
  const packedCount = items.filter((i) => i.packed).length;
  const totalCount = items.length;

  return (
    <div className="packing-list-page-container">
      <Navbar />

      <main className="packing-list-main">
        <div className="packing-layout-width animate-fade">
          
          {/* Back button */}
          <div className="back-nav-row">
            <button type="button" className="planner-back-btn" onClick={() => navigate('/itinerary-view')}>
              ← Back to Itinerary
            </button>
          </div>

          {/* Header Info */}
          <header className="packing-header">
            <div className="header-left">
              <span className="packing-badge-label">SMART PACKING LIST 🧳</span>
              <h1 className="packing-title">Pack smarter for {trip.to}</h1>
              <p className="packing-subtitle">
                {trip.days} Days • {trip.travelerCount} Travelers • {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
              </p>
              <p className="packing-desc-line">Based on your itinerary, activities and expected weather.</p>
            </div>
          </header>

          {/* Progress Widget */}
          <PackingProgress packedCount={packedCount} totalCount={totalCount} />

          {/* Insights widget */}
          <PackingInsights trip={trip} weatherData={weather} />

          {/* Toolbar (Search & Filter) */}
          <section className="packing-toolbar-section">
            <div className="packing-search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="packing-search-input"
                placeholder="Search packing items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="packing-filters-row">
              {[
                { id: 'all', label: 'All' },
                { id: 'unpacked', label: 'Unpacked' },
                { id: 'packed', label: 'Packed' },
                { id: 'essentials', label: 'Essentials' },
                { id: 'weather', label: 'Weather' },
                { id: 'activities', label: 'Activities' }
              ].map((filterTab) => (
                <button
                  key={filterTab.id}
                  type="button"
                  className={`filter-tab-btn ${activeFilter === filterTab.id ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(filterTab.id)}
                >
                  {filterTab.label}
                </button>
              ))}
            </div>
          </section>

          {/* Don't Forget / Critical Essentials section */}
          {criticalItems.length > 0 && activeFilter === 'all' && !search && (
            <section className="dont-forget-section">
              <h2 className="dont-forget-title">⚠️ Don't Forget</h2>
              <div className="dont-forget-grid">
                {criticalItems.map((item) => (
                  <label key={item.id} className={`dont-forget-checkbox-card ${item.packed ? 'is-packed' : ''}`}>
                    <input
                      type="checkbox"
                      className="df-checkbox"
                      checked={item.packed}
                      onChange={() => handleToggleItem(item.id)}
                    />
                    <span className="df-custom-check" />
                    <div className="df-text-wrap">
                      <span className="df-name font-bold">{item.name}</span>
                      <span className="df-cat-label">{item.category}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          )}

          {/* Grouped Categories Lists */}
          <div className="packing-categories-list-wrapper">
            {Object.keys(groupedCategories).length === 0 ? (
              <div className="empty-results-box">
                <span className="empty-results-icon">🔍</span>
                <p className="empty-results-text">No items found matching your filters.</p>
              </div>
            ) : (
              Object.entries(groupedCategories).map(([title, catItems]) => (
                <PackingCategory
                  key={title}
                  title={title}
                  items={catItems}
                  onToggleItem={handleToggleItem}
                  onUpdateQty={handleUpdateQty}
                  onDeleteItem={handleDeleteItem}
                />
              ))
            )}
          </div>

          {/* Add custom item form widget */}
          <AddPackingItem onAdd={handleAddCustomItem} />

          {/* Bottom Actions Row */}
          <footer className="packing-actions-footer">
            <button
              type="button"
              className="regenerate-list-action-btn"
              onClick={handleRegenerate}
            >
              🔄 Regenerate Recommendations
            </button>
          </footer>

        </div>
      </main>
    </div>
  );
}
