import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CommunityControls from '../components/CommunityControls';
import CommunityPost from '../components/CommunityPost';
import CommunitySidebar from '../components/CommunitySidebar';
import CreatePost from '../components/CreatePost';
import './Community.css';

// ── Dummy Community Data ──────────────────────────────────────────────────────
const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: 'Aarav Shah',
      location: 'Ahmedabad, India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      badge: 'Traveler'
    },
    title: 'My 3 Days in Goa 🌴',
    destination: 'Goa, India',
    description: 'Spent an incredible three days in North Goa exploring vibrant beach shacks, sipping coconut water at Baga Beach, and dancing at a rooftop party. The seafood was absolutely divine — definitely try the Prawn Balchão!',
    category: 'Travel Story',
    tags: ['Beach', 'Food', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tripInfo: {
      name: 'Goa Escape',
      duration: '3 Days',
      cost: '₹15,000',
      bestExperience: 'Baga Beach sunset'
    },
    likes: 124,
    comments: 18,
    commentsList: [
      { id: 1, author: 'Riya', text: 'This place looks amazing! Goa has been on my list.' },
      { id: 2, author: 'Karan', text: 'How much did the hotel cost per night?' }
    ],
    time: '2 hours ago',
    isSaved: false,
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: 'Priya Mehta',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      badge: 'Explorer'
    },
    title: 'Hidden Cafés of Jaipur ☕🏰',
    destination: 'Jaipur, India',
    description: 'Found the most charming heritage café tucked inside a 200-year-old haveli. If you\'re visiting Jaipur, skip the crowded tourist spots and explore the by-lanes of the Old City. You\'ll thank me later!',
    category: 'Food',
    tags: ['Food', 'Culture', 'Heritage'],
    image: 'https://images.unsplash.com/photo-1477587458883-471a5ed942e5?auto=format&fit=crop&w=800&q=80',
    tripInfo: null,
    likes: 89,
    comments: 12,
    commentsList: [
      { id: 1, author: 'Ankit', text: 'What is the name of the café? Would love to visit!' }
    ],
    time: '5 hours ago',
    isSaved: false,
    isLiked: false
  },
  {
    id: 3,
    user: {
      name: 'Rohan Verma',
      location: 'Pune, India',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      badge: 'Adventurer'
    },
    title: 'Paragliding in Manali — Must Do! 🪂',
    destination: 'Manali, Himachal Pradesh',
    description: 'Took the tandem paragliding experience at Solang Valley. The views over the snow-capped peaks took my breath away — literally! The whole experience costs around ₹2,500 and is absolutely worth every rupee.',
    category: 'Adventure',
    tags: ['Adventure', 'Mountains', 'Nature'],
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80',
    tripInfo: {
      name: 'Himachal Expedition',
      duration: '5 Days',
      cost: '₹22,000',
      bestExperience: 'Paragliding at Solang Valley'
    },
    likes: 203,
    comments: 31,
    commentsList: [
      { id: 1, author: 'Sneha', text: 'I did this last year! It was absolutely terrifying but amazing.' },
      { id: 2, author: 'Dev', text: 'Is it beginner friendly?' },
      { id: 3, author: 'Rohan Verma', text: 'Yes! The instructors handle everything. Just enjoy the view.' }
    ],
    time: '1 day ago',
    isSaved: false,
    isLiked: false
  },
  {
    id: 4,
    user: {
      name: 'Meera Nair',
      location: 'Kochi, India',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      badge: 'Local Guide'
    },
    title: 'Kerala Backwaters on a Budget 🌴🛶',
    destination: 'Alleppey, Kerala',
    description: 'You don\'t need a luxury houseboat to experience Kerala\'s magic. I booked a shared day cruise for just ₹800 and it was hands down the most peaceful experience of my life. The early morning mist over the backwaters is something you\'ll never forget.',
    category: 'Budget Tips',
    tags: ['Budget', 'Nature', 'Backwaters'],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    tripInfo: null,
    likes: 178,
    comments: 24,
    commentsList: [
      { id: 1, author: 'Aditya', text: 'Budget tips are always welcome! Sharing this with my friends.' }
    ],
    time: '2 days ago',
    isSaved: false,
    isLiked: false
  },
  {
    id: 5,
    user: {
      name: 'Kabir Singh',
      location: 'Delhi, India',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      badge: 'Traveler'
    },
    title: '7 Days in Rajasthan — Royal Experience 👑',
    destination: 'Jaipur → Jodhpur → Udaipur',
    description: 'A week-long road trip through the royal state of Rajasthan. From staying in a heritage haveli hotel in Jodhpur to watching the sunset over Lake Pichola in Udaipur — every single day felt like a chapter from a storybook.',
    category: 'Travel Story',
    tags: ['Heritage', 'Royal', 'Road Trip'],
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tripInfo: {
      name: 'Rajasthan Royal Tour',
      duration: '7 Days',
      cost: '₹45,000',
      bestExperience: 'Sunset at Lake Pichola'
    },
    likes: 312,
    comments: 47,
    commentsList: [
      { id: 1, author: 'Sana', text: 'Absolutely stunning! Which haveli did you stay at?' },
      { id: 2, author: 'Neel', text: 'Rajasthan is on my bucket list. This post just moved it up!' }
    ],
    time: '3 days ago',
    isSaved: false,
    isLiked: false
  }
];

export default function Community() {
  // Posts state initialized from dummy data
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Search & Filter State
  const [search, setSearch]   = useState('');
  const [groupBy, setGroupBy] = useState('destination');
  const [filter, setFilter]   = useState('all');
  const [sortBy, setSortBy]   = useState('latest');

  // Toggle like
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  // Toggle save
  const handleSave = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  // Add new post from CreatePost
  const handlePublish = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Process posts: search → filter → sort
  const getProcessedPosts = () => {
    let list = [...posts];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.user.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Filter by category
    if (filter !== 'all') {
      list = list.filter((p) => p.category === filter);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'mostLiked') return b.likes - a.likes;
      if (sortBy === 'mostCommented') return b.comments - a.comments;
      if (sortBy === 'oldest') return a.id - b.id;
      return b.id - a.id; // latest (default)
    });

    return list;
  };

  const processedPosts = getProcessedPosts();

  return (
    <div className="community-page-container">
      {/* ── Top Navbar ── */}
      <Navbar />

      <main className="community-main">
        <div className="community-layout">

          {/* ── Left: Feed Column ── */}
          <div className="community-feed-column">
            {/* Page Header */}
            <header className="community-page-header">
              <h1 className="community-page-title">Community</h1>
              <p className="community-page-subtitle">
                Discover travel stories, tips, and experiences shared by other travelers.
              </p>
            </header>

            {/* Search & Filters */}
            <CommunityControls
              search={search} setSearch={setSearch}
              groupBy={groupBy} setGroupBy={setGroupBy}
              filter={filter} setFilter={setFilter}
              sortBy={sortBy} setSortBy={setSortBy}
            />

            {/* Create Post Section */}
            <CreatePost onPublish={handlePublish} />

            {/* Feed Title */}
            <div className="feed-section-header">
              <h2 className="feed-section-title">
                Community Feed
                <span className="feed-count"> ({processedPosts.length})</span>
              </h2>
            </div>

            {/* Posts Feed */}
            {processedPosts.length > 0 ? (
              <div className="community-posts-list">
                {processedPosts.map((post) => (
                  <CommunityPost
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onSave={handleSave}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="community-empty-state">
                <div className="empty-icon">🌍</div>
                <h3 className="empty-title">
                  {posts.length === 0 ? 'Be the first traveler to share an experience!' : 'No posts found'}
                </h3>
                <p className="empty-subtitle">
                  {posts.length === 0
                    ? 'Share your journey and inspire other travelers.'
                    : 'Try changing your search terms or clearing the active filters.'}
                </p>
                {search || filter !== 'all' ? (
                  <button
                    type="button"
                    className="empty-reset-btn"
                    onClick={() => { setSearch(''); setFilter('all'); }}
                  >
                    Reset Filters
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {/* ── Right: Sidebar ── */}
          <CommunitySidebar />
        </div>
      </main>
    </div>
  );
}
