import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './CityAnalytics.css';

export default function CityAnalytics({ data }) {
  // Pastel color shades belonging to the theme
  const colors = ['#B8C0FF', '#C7CEFF', '#D6DCFF', '#E7D8FF', '#F1E6FF'];

  return (
    <div className="city-analytics-card">
      <h3 className="ca-title">Popular Cities</h3>
      <p className="ca-subtitle">Top cities by number of user trip itineraries</p>

      <div className="ca-grid-content">
        {/* Chart View */}
        <div className="ca-chart-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EDFF" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#6B6880"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B6880"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E7D8FF',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontSize: '0.82rem',
                  color: '#252238'
                }}
                cursor={{ fill: 'rgba(184, 192, 255, 0.08)' }}
              />
              <Bar dataKey="trips" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ranked List */}
        <div className="ca-ranked-list">
          <h4 className="ca-list-title">Ranked Destinations</h4>
          <ol className="ca-list">
            {data.map((city, idx) => (
              <li key={city.name} className="ca-list-item">
                <div className="ca-rank-badge">#{idx + 1}</div>
                <div className="ca-item-name">{city.name}</div>
                <div className="ca-item-count">{city.trips.toLocaleString('en-IN')} Trips</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
