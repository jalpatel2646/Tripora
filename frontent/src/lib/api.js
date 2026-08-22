let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
if (API_BASE && !API_BASE.endsWith('/api/v1')) {
  API_BASE = API_BASE.replace(/\/$/, '') + '/api/v1';
}

async function request(path, options = {}) {
  const token = localStorage.getItem('tripora_access_token');
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) } });
  const payload = await response.json().catch(() => ({ message: 'Invalid server response' }));
  if (!response.ok) throw new Error(payload.message || 'Request failed');
  return payload;
}
export const api = { register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }), login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }), listTrips: () => request('/trips'), createTrip: (data) => request('/trips', { method: 'POST', body: JSON.stringify(data) }), destinations: (query = '') => request(`/destinations${query ? `?q=${encodeURIComponent(query)}` : ''}`), activities: (query = '') => request(`/activities${query ? `?q=${encodeURIComponent(query)}` : ''}`) };
export function saveSession(data) { localStorage.setItem('tripora_access_token', data.accessToken); localStorage.setItem('tripora_user', JSON.stringify(data.user)); }
