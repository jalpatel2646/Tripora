import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateTrip from './pages/CreateTrip';
import BuildItinerary from './pages/BuildItinerary';

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
        <Route path="/" element={<Home />} />
        
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
