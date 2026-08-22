import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './UserTrends.css';

export default function UserTrends({ userGrowthData, tripsCreatedData, platformUsageData }) {
  const COLORS = ['#B8C0FF', '#93C5FD', '#6EE7B7', '#FCD34D', '#E7D8FF'];

  return (
    <div className="utrends-container">
      {/* Row 1: User Growth & Trips Created */}
      <div className="utrends-charts-grid">
        {/* User Growth Line Chart */}
        <div className="utrends-chart-card">
          <h3 className="ut-chart-title">User Growth</h3>
          <p className="ut-chart-subtitle">Monthly user registrations</p>
          <div className="ut-chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={userGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDFF" vertical={false} />
                <XAxis dataKey="month" stroke="#6B6880" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B6880" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E7D8FF',
                    borderRadius: '8px',
                    fontFamily: 'inherit',
                    fontSize: '0.80rem',
                    color: '#252238'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#B8C0FF"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trips Created Bar Chart */}
        <div className="utrends-chart-card">
          <h3 className="ut-chart-title">Trips Created</h3>
          <p className="ut-chart-subtitle">Trip plans created per month</p>
          <div className="ut-chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={tripsCreatedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDFF" vertical={false} />
                <XAxis dataKey="month" stroke="#6B6880" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B6880" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E7D8FF',
                    borderRadius: '8px',
                    fontFamily: 'inherit',
                    fontSize: '0.80rem',
                    color: '#252238'
                  }}
                />
                <Bar dataKey="trips" fill="#E7D8FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Platform Usage & Engagement Metrics */}
      <div className="utrends-usage-grid">
        {/* Platform Usage Donut Chart */}
        <div className="utrends-chart-card">
          <h3 className="ut-chart-title">Platform Usage</h3>
          <p className="ut-chart-subtitle">Distribution of features accessed by users</p>
          <div className="ut-chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={platformUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {platformUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Usage Share']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E7D8FF',
                    borderRadius: '8px',
                    fontFamily: 'inherit',
                    fontSize: '0.80rem',
                    color: '#252238'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  iconType="circle"
                  iconSize={6}
                  formatter={(value) => <span className="ut-legend-text">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Card */}
        <div className="utrends-chart-card engagement-card">
          <h3 className="ut-chart-title">Engagement Metrics</h3>
          <p className="ut-chart-subtitle">User interaction statistics</p>

          <div className="engagement-metrics-list">
            <div className="eng-metric-item">
              <span className="eng-label">Avg. Trips Per User</span>
              <span className="eng-val">4.2</span>
            </div>
            <div className="eng-metric-item">
              <span className="eng-label">Avg. Activities Per Trip</span>
              <span className="eng-val">12.8</span>
            </div>
            <div className="eng-metric-item">
              <span className="eng-label">Most Active Month</span>
              <span className="eng-val">December</span>
            </div>
            <div className="eng-metric-item">
              <span className="eng-label">Community Posts Created</span>
              <span className="eng-val">840</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
