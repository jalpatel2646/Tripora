// src/components/packing/PackingInsights.jsx
import React from 'react';
import './PackingInsights.css';

export default function PackingInsights({ trip, weatherData }) {
  // Weather counts
  let rainyDays = 0;
  let hotDays = 0;
  let coldDays = 0;

  Object.values(weatherData).forEach((w) => {
    const cond = (w.condition || '').toLowerCase();
    if (cond.includes('rain') || cond.includes('storm')) rainyDays++;
    if (cond.includes('hot') || w.maxTemp > 32) hotDays++;
    if (cond.includes('cold') || w.maxTemp < 15) coldDays++;
  });

  // Activity counts
  let beachActs = 0;
  let hikeActs = 0;
  let foodTours = 0;

  if (trip.itinerary) {
    trip.itinerary.forEach((dayObj) => {
      dayObj.activities.forEach((act) => {
        const name = (act.name || '').toLowerCase();
        if (name.includes('beach') || name.includes('water sport') || name.includes('surf')) beachActs++;
        if (name.includes('trek') || name.includes('hike') || name.includes('climb')) hikeActs++;
        if (name.includes('food') || name.includes('cook') || name.includes('dine') || name.includes('dinner')) foodTours++;
      });
    });
  }

  const hasWeatherInsight = rainyDays > 0 || hotDays > 0 || coldDays > 0;
  const hasActivityInsight = beachActs > 0 || hikeActs > 0 || foodTours > 0;

  if (!hasWeatherInsight && !hasActivityInsight) return null;

  return (
    <div className="packing-insights-grid animate-fade">
      {hasWeatherInsight && (
        <div className="insight-card-item weather-insight">
          <h4 className="insight-card-title">🌦 Weather Insight</h4>
          <p className="insight-card-desc">
            {rainyDays > 0 && `Rain expected on ${rainyDays} ${rainyDays === 1 ? 'day' : 'days'}. We added rain gear.`}
            {hotDays > 0 && rainyDays === 0 && `Sunny weather (>32°C) expected. We added sun-safe gear.`}
            {coldDays > 0 && `Cold climate expected. We added winter insulating clothing layers.`}
          </p>
          <div className="insight-added-list">
            {rainyDays > 0 && <span>✓ Umbrella, Raincoat, Waterproof phone pouch</span>}
            {hotDays > 0 && <span>✓ Sunscreen SPF 50, Sunglasses, Sun Hat</span>}
            {coldDays > 0 && <span>✓ Thermal Wear, Winter Jacket, Gloves</span>}
          </div>
        </div>
      )}

      {hasActivityInsight && (
        <div className="insight-card-item activity-insight">
          <h4 className="insight-card-title">🧳 Activity Insight</h4>
          <div className="insight-activity-summary-tags">
            {beachActs > 0 && <span className="act-summary-tag">🏖 {beachActs} Beach Activities</span>}
            {hikeActs > 0 && <span className="act-summary-tag">🥾 {hikeActs} Hiking Trails</span>}
            {foodTours > 0 && <span className="act-summary-tag">🍽 {foodTours} Food Tours</span>}
          </div>
          <p className="insight-card-desc">
            We've customized your checklist to include corresponding gear and shoe types.
          </p>
        </div>
      )}
    </div>
  );
}
