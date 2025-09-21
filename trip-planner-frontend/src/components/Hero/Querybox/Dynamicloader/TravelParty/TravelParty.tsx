import React, { useState } from "react";
import "./TravelParty.css";

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface TravelPartyProps {
  onNext: (step: number) => void;
}

const TravelParty: React.FC<TravelPartyProps> = ({ onNext }) => {
  const [people, setPeople] = useState(1);
  const [demographics, setDemographics] = useState<string[]>([]);

  const increment = () => setPeople((prev) => prev + 1);
  const decrement = () => setPeople((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleDemographic = (type: string) => {
    setDemographics((prev) =>
      prev.includes(type)
        ? prev.filter((d) => d !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = () => {
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};
    userData.person_count = people;
    userData.group_demographic = demographics.join(' + ');
    setCookie(cookieName, JSON.stringify(userData), 7);
    setPeople(0);
    setDemographics([]);
    onNext(5);
  };

  return (
    <div className="travel-party">
      <div className="master-prompt">Who’s coming on this adventure?</div>

      <div className="input-section">
        <div className="input-block">
          <label className="input-label">Number of People</label>
          <div className="counter-wrapper">
            <button className="counter-btn" onClick={decrement}>&lt;</button>
            <span className="counter-value">{people}</span>
            <button className="counter-btn" onClick={increment}>&gt;</button>
          </div>
        </div>

        <div className="input-block">
          <label className="input-label">Demographics</label>
          <div className="demographic-buttons">
            {["Adults", "Children", "Seniors"].map((type) => (
              <button
                key={type}
                className={`demo-btn ${demographics.includes(type) ? "selected" : ""}`}
                onClick={() => toggleDemographic(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TravelParty;
