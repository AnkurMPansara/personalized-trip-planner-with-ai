import React from 'react';
import './ProcessItinerary.css';

const ProcessItinerary: React.FC = () => {
  return (
    <section className="process-itinerary">
      <div className="thankyou-card">
        <h1 className="thankyou-title">Thank You!</h1>
        <p className="thankyou-message">
          Your trip package has been booked successfully.  
          We’re excited to be part of your journey and will make sure everything is perfect!
        </p>
        <div className="thankyou-footer">
          Safe Travels 💙
        </div>
      </div>
    </section>
  );
};

export default ProcessItinerary;
