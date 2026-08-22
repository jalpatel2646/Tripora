import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateTrip from './pages/CreateTrip';
import BuildItinerary from './pages/BuildItinerary';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ItineraryView from './pages/ItineraryView';

function RootRoute() {
  const hasSession = Boolean(localStorage.getItem('tripora_access_token'));
  return hasSession ? <Home /> : <Navigate to="/login" replace />;
}
import Community from './pages/Community';
import CalendarView from './pages/CalendarView';
import AdminDashboard from './pages/AdminDashboard';
import AITripPlanner from './pages/AITripPlanner';
import Landing from './pages/Landing';
import PackingList from './pages/PackingList';

// Client-side wrappers to preserve SPA navigation
function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onRegister={() => navigate('/register')} />;
}

function RegisterWrapper() {
  const navigate = useNavigate();
  return <Register onLogin={() => navigate('/login')} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Dashboard / Home Screen */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        
        {/* User Trips Listing Screen */}
        <Route path="/my-trips" element={<MyTrips />} />

        {/* Explore Cities & Activities Screen */}
        <Route path="/explore" element={<Explore />} />

        {/* User Profile Screen */}
        <Route path="/profile" element={<Profile />} />

        {/* Itinerary View Screen with Budget Section */}
        <Route path="/itinerary-view" element={<ItineraryView />} />

        {/* Community Tab Screen */}
        <Route path="/community" element={<Community />} />

        {/* Calendar View Screen */}
        <Route path="/calendar" element={<CalendarView />} />

        {/* Admin Panel / Analytics Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* AI Trip Planner Screen */}
        <Route path="/ai-planner" element={<AITripPlanner />} />

        {/* Smart Packing List Screen */}
        <Route path="/trip/:id/packing" element={<PackingList />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/register" element={<RegisterWrapper />} />
        
        {/* Create trip placeholder */}
        <Route path="/create-trip" element={<CreateTrip />} />

        {/* Build Itinerary Screen */}
        <Route path="/build-itinerary" element={<BuildItinerary />} />

        {/* Fallback route redirection to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
