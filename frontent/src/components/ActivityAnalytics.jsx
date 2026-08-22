import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './ActivityAnalytics.css';

export default function ActivityAnalytics({ data }) {
  // Theme palette color matching other screens
  const COLORS = ['#B8C0FF', '#93C5FD', '#6EE7B7', '#FCD34D', '#E7D8FF'];

  return (
    <div className="act-analytics-card">
      <h3 className="aa-title">Popular Activities</h3>
      <p className="aa-subtitle">Breakdown of activities users add to their travel plans</p>

      <div className="aa-grid-content">
        {/* Pie Chart / Donut Chart */}
        <div className="aa-chart-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E7D8FF',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontSize: '0.82rem',
                  color: '#252238'
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="aa-legend-text">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown List */}
        <div className="aa-breakdown-list">
          <h4 className="aa-list-title">Activity Share</h4>
          <div className="aa-list">
            {data.map((act, idx) => (
              <div key={act.name} className="aa-list-item">
                <span
                  className="aa-color-dot"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="aa-item-name">{act.name}</span>
                <span className="aa-item-value">{act.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
