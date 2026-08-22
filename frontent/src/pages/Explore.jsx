import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchControls from '../components/SearchControls';
import CityResultCard from '../components/CityResultCard';
import ActivityResultCard from '../components/ActivityResultCard';
import './Explore.css';
import jaipurImage from '../assets/jaipur.jpg';
import ladakhImage from '../assets/ladakh.jpg';

// Dummy City Data
const CITIES_DATA = [
  {
    id: 1,
    name: 'Goa',
    country: 'India',
    description: 'Famous for sun-kissed beaches, vibrant nightlife, seafood and Portuguese colonial heritage.',
    costLevel: '₹₹',
    numericCost: 2000,
    rating: 4.8,
    popularity: 98,
    bestTime: 'Nov - Feb',
    type: 'India',
    tags: ['Beaches', 'Nightlife', 'Food'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Jaipur',
    country: 'India',
    description: 'The Pink City of India known for majestic forts, royal palaces, vibrant bazaars and rich heritage.',
    costLevel: '₹₹',
    numericCost: 1800,
    rating: 4.7,
    popularity: 95,
    bestTime: 'Oct - Mar',
    type: 'India',
    tags: ['Heritage', 'Culture', 'Shopping'],
    image: jaipurImage
  },
  {
    id: 3,
    name: 'Manali',
    country: 'India',
    description: 'Nestled in the Himalayas, popular for snow peaks, Solang Valley sports and peaceful mountain retreats.',
    costLevel: '₹',
    numericCost: 1200,
    rating: 4.6,
    popularity: 92,
    bestTime: 'Oct - Jun',
    type: 'India',
    tags: ['Mountains', 'Adventure', 'Nature'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Kerala',
    country: 'India',
    description: 'God’s Own Country renowned for tranquil backwaters, tea plantations, and relaxing Ayurvedic spas.',
    costLevel: '₹₹',
    numericCost: 2200,
    rating: 4.9,
    popularity: 96,
    bestTime: 'Sep - Mar',
    type: 'India',
    tags: ['Nature', 'Wellness', 'Relaxation'],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Ladakh',
    country: 'India',
    description: 'High-altitude mountain desert featuring Pangong Tso Lake, ancient monasteries and motorcycling passes.',
    costLevel: '₹₹₹',
    numericCost: 3500,
    rating: 4.9,
    popularity: 90,
    bestTime: 'May - Sep',
    type: 'India',
    tags: ['Adventure', 'Scenery', 'Trekking'],
    image: ladakhImage
  },
  {
    id: 6,
    name: 'Paris',
    country: 'France',
    description: 'Global center for art, fashion, gastronomy and culture with iconic landmarks like the Eiffel Tower.',
    costLevel: '₹₹₹',
    numericCost: 8500,
    rating: 4.8,
    popularity: 99,
    bestTime: 'Apr - Oct',
    type: 'International',
    tags: ['Romantic', 'Culture', 'Sightseeing'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'
  }
];

// Dummy Activity Data
const ACTIVITIES_DATA = [
  {
    id: 101,
    name: 'Water Sports Combo',
    city: 'Goa',
    country: 'India',
    category: 'Adventure',
    duration: '2 Hours',
    cost: 1800,
    rating: 4.7,
    popularity: 97,
    description: 'Enjoy thrilling jet skiing, parasailing, banana boat ride and speed boating at Baga Beach.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 102,
    name: 'Amber Fort Guided Heritage Tour',
    city: 'Jaipur',
    country: 'India',
    category: 'Sightseeing',
    duration: '3 Hours',
    cost: 1200,
    rating: 4.8,
    popularity: 95,
    description: 'Explore the grand corridors, Sheesh Mahal, and courtyards of hilltop Amer Fort with a local historian.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 103,
    name: 'Paragliding in Solang Valley',
    city: 'Manali',
    country: 'India',
    category: 'Adventure',
    duration: '1.5 Hours',
    cost: 2500,
    rating: 4.9,
    popularity: 94,
    description: 'Soar high above snow-capped Solang Valley peaks with experienced tandem paragliding pilots.',
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 104,
    name: 'Alleppey Backwater Houseboat Cruise',
    city: 'Kerala',
    country: 'India',
    category: 'Nature',
    duration: '6 Hours',
    cost: 3500,
    rating: 4.8,
    popularity: 96,
    description: 'Relax on a traditional Kerala Kettuvallam houseboat sailing through palm-fringed lagoons.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 105,
    name: 'Old City Street Food Trail',
    city: 'Jaipur',
    country: 'India',
    category: 'Food',
    duration: '2.5 Hours',
    cost: 900,
    rating: 4.6,
    popularity: 91,
    description: 'Sample famous Rajasthani kachoris, lassi, kulfi and ghewar in traditional bustling bazaars.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 106,
    name: 'Scuba Diving at Grand Island',
    city: 'Goa',
    country: 'India',
    category: 'Adventure',
    duration: '4 Hours',
    cost: 3200,
    rating: 4.8,
    popularity: 93,
    description: 'PADI-guided deep underwater diving experience with coral reef fish and video recordings.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Explore() {
  // Mode State: 'cities' vs 'activities'
  const [searchType, setSearchType]   = useState('cities');
  
  // Search & Filter State
  const [search, setSearch]           = useState('');
  const [groupBy, setGroupBy]         = useState('all');
  const [filter, setFilter]           = useState('all');
  const [sortBy, setSortBy]           = useState('popularity');

  // Selected items state
  const [selectedItems, setSelectedItems] = useState([]);

  const isCities = searchType === 'cities';

  const handleToggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic for Cities
  const getFilteredCities = () => {
    let list = [...CITIES_DATA];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (filter !== 'all') {
      if (filter === 'India') list = list.filter((c) => c.type === 'India');
      if (filter === 'International') list = list.filter((c) => c.type === 'International');
      if (filter === 'Budget Friendly') list = list.filter((c) => c.costLevel === '₹' || c.numericCost <= 1500);
      if (filter === 'Popular') list = list.filter((c) => c.popularity >= 95);
    }

    list.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'costLowToHigh') return a.numericCost - b.numericCost;
      if (sortBy === 'costHighToLow') return b.numericCost - a.numericCost;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  };

  // Filter & Sort Logic for Activities
  const getFilteredActivities = () => {
    let list = [...ACTIVITIES_DATA];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }

    if (filter !== 'all') {
      list = list.filter((a) => a.category.toLowerCase() === filter.toLowerCase());
    }

    list.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'costLowToHigh') return a.cost - b.cost;
      if (sortBy === 'costHighToLow') return b.cost - a.cost;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  };

  const currentResults = isCities ? getFilteredCities() : getFilteredActivities();

  return (
    <div className="explore-page-container">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="explore-main">
        <div className="explore-layout-wrapper">
          
          {/* ── 2. Page Heading ── */}
          <header className="explore-header">
            <h1 className="explore-title">Explore Cities & Activities</h1>
            <p className="explore-subtitle">
              Discover destinations and experiences for your next journey.
            </p>
          </header>

          {/* ── 3. Search Type Toggle Tabs ── */}
          <div className="explore-tabs-bar" role="tablist" aria-label="Search mode toggle">
            <button
              type="button"
              className={`explore-tab${isCities ? ' is-active' : ''}`}
              onClick={() => {
                setSearchType('cities');
                setFilter('all');
                setSearch('');
              }}
              role="tab"
              aria-selected={isCities}
            >
              🏢 Cities
            </button>
            <button
              type="button"
              className={`explore-tab${!isCities ? ' is-active' : ''}`}
              onClick={() => {
                setSearchType('activities');
                setFilter('all');
                setSearch('');
              }}
              role="tab"
              aria-selected={!isCities}
            >
              🏄 Activities
            </button>
          </div>

          {/* ── 4 & 5. Search Bar and Dropdown Controls ── */}
          <SearchControls
            searchType={searchType}
            search={search}
            setSearch={setSearch}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* ── 6. Results Header ── */}
          <div className="explore-results-header">
            <h2 className="results-title">
              Results <span className="results-count">({currentResults.length})</span>
            </h2>
          </div>

          {/* ── 7 & 8. Result Cards List ── */}
          {currentResults.length > 0 ? (
            <div className="results-cards-list">
              {isCities
                ? currentResults.map((city) => (
                    <CityResultCard
                      key={city.id}
                      city={city}
                      isSelected={selectedItems.includes(city.id)}
                      onToggleSelect={handleToggleSelect}
                    />
                  ))
                : currentResults.map((activity) => (
                    <ActivityResultCard
                      key={activity.id}
                      activity={activity}
                      isSelected={selectedItems.includes(activity.id)}
                      onToggleSelect={handleToggleSelect}
                    />
                  ))}
            </div>
          ) : (
            /* ── 13. Empty Search State ── */
            <div className="explore-empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">No results found</h3>
              <p className="empty-state-subtitle">
                Try changing your search keywords or clearing your filters.
              </p>
              <button
                type="button"
                className="empty-state-reset-btn"
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                }}
              >
                Reset Search
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
