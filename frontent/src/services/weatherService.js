// src/services/weatherService.js
// ─────────────────────────────────────────────────────────────
// Weather service module to analyze and calculate activity weather suitability.
// Easily swap out the body of getTripWeather() with a real API request.
// ─────────────────────────────────────────────────────────────

const MOCK_WEATHER_DATA = {
  // Key format: 'YYYY-MM-DD_City'
  '2026-08-12_mumbai': {
    date: '2026-08-12',
    city: 'Mumbai',
    condition: 'Clear',
    minTemp: 26,
    maxTemp: 31,
    precipitation: 10,
    humidity: 65,
    windSpeed: 12
  },
  '2026-08-13_goa': {
    date: '2026-08-13',
    city: 'Goa',
    condition: 'Cloudy',
    minTemp: 25,
    maxTemp: 29,
    precipitation: 25,
    humidity: 78,
    windSpeed: 14
  },
  '2026-08-14_goa': {
    date: '2026-08-14',
    city: 'Goa',
    condition: 'Heavy Rain',
    minTemp: 24,
    maxTemp: 27,
    precipitation: 85,
    humidity: 92,
    windSpeed: 22
  }
};

const SUGGESTED_ALTERNATIVES = {
  Goa: [
    { name: 'Museum of Goa (MOG) Visit', cost: 300, type: 'Culture', duration: '2 Hours', description: 'Explore contemporary art celebrating Goan history and culture in a beautiful indoor space.' },
    { name: 'Indoor Goan Cooking Class', cost: 1200, type: 'Food', duration: '3 Hours', description: 'Learn to cook traditional Goan fish curry and bebinca from a local chef inside a cozy kitchen.' },
    { name: 'Luxury Spa & Wellness Massage', cost: 2500, type: 'Relaxation', duration: '1.5 Hours', description: 'Unwind with an authentic Ayurvedic massage while the rain falls outside.' },
    { name: 'Panaji Indoor Shopping Arcade', cost: 0, type: 'Shopping', duration: '2 Hours', description: 'Shop for premium cashews, feni, and spices in a sheltered marketplace.' }
  ],
  Mumbai: [
    { name: 'National Gallery of Modern Art', cost: 150, type: 'Culture', duration: '2 Hours', description: 'Marvel at stellar art collections in a fully air-conditioned heritage building.' },
    { name: 'Colaba Indoors High Tea', cost: 900, type: 'Food', duration: '1.5 Hours', description: 'Enjoy warm tea, scones, and pastries at the historical Taj Mahal Palace hotel.' }
  ]
};

const DEFAULT_ALTERNATIVES = [
  { name: 'Local Art Museum', cost: 200, type: 'Culture', duration: '2 Hours', description: 'Explore regional arts and historical artifacts in a covered gallery.' },
  { name: 'Indoor Food Tasting Tour', cost: 600, type: 'Food', duration: '2 Hours', description: 'Taste regional delicacies in selected covered local eateries.' },
  { name: 'Boutique Shopping Mall', cost: 0, type: 'Shopping', duration: '1.5 Hours', description: 'Browse local souvenirs and clothes inside a sheltered arcade.' }
];

export const getTripWeather = async (itinerary) => {
  // Simulate network latency of 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));

  const weatherMap = {};
  itinerary.forEach((dayObj) => {
    const key = `${dayObj.date}_${dayObj.city.toLowerCase()}`;
    // Return mock data if exists, otherwise generate basic sunny weather
    weatherMap[dayObj.day] = MOCK_WEATHER_DATA[key] || {
      date: dayObj.date,
      city: dayObj.city,
      condition: 'Clear',
      minTemp: 24,
      maxTemp: 32,
      precipitation: 5,
      humidity: 50,
      windSpeed: 10
    };
  });
  return weatherMap;
};

export const getWeatherSuitability = (activity, weather) => {
  if (!weather) return 'GOOD';

  const type = (activity.type || '').toLowerCase();
  const cond = (weather.condition || '').toLowerCase();

  // If heavy rain or rain, outdoors are poor
  if (cond.includes('rain') || cond.includes('storm')) {
    if (type === 'adventure' || type === 'sightseeing' || type === 'shopping' || type === 'beaches') {
      return 'POOR';
    }
    if (type === 'food') {
      // Shacks or outdoor food is fair
      return 'FAIR';
    }
  }

  // If very hot, afternoon outdoor activities are poor/fair
  if (weather.maxTemp > 35 && (type === 'adventure' || type === 'sightseeing')) {
    const hour = parseInt(activity.time || '12');
    const isAfternoon = (activity.time.includes('PM') && hour !== 12 && hour < 5) || (activity.time.includes('AM') && hour === 12);
    if (isAfternoon) return 'POOR';
    return 'FAIR';
  }

  return 'GOOD';
};

export const getWeatherAlternatives = (weather, city) => {
  const c = city || 'Goa';
  return SUGGESTED_ALTERNATIVES[c] || DEFAULT_ALTERNATIVES;
};
