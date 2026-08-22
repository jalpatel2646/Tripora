// src/components/ai-planner/GenerationLoader.jsx
import React, { useState, useEffect } from 'react';

export default function GenerationLoader({ destination }) {
  const [step, setStep] = useState(0);

  const steps = [
    'Understanding your preferences',
    'Balancing your budget',
    'Finding the best activities',
    'Building your itinerary'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ai-generation-loader-container">
      <div className="loader-content">
        <h2 className="loader-title">Creating your {destination} adventure...</h2>
        <div className="loader-steps-list">
          {steps.map((text, idx) => {
            let icon = '○';
            let statusClass = 'pending';
            
            if (step > idx) {
              icon = '✓';
              statusClass = 'completed';
            } else if (step === idx) {
              icon = '●';
              statusClass = 'active';
            }

            return (
              <div key={text} className={`loader-step-item ${statusClass}`}>
                <span className="step-bullet">{icon}</span>
                <span className="step-label-text">{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
