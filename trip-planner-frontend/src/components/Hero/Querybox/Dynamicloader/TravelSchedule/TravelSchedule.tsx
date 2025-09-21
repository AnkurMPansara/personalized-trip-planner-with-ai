import React, { useState } from "react";
import "./TravelSchedule.css";

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface TravelScheduleProps {
  onNext: (step: number) => void;
}

const TravelSchedule: React.FC<TravelScheduleProps> = ({ onNext }) => {
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState("");

  const increment = () => setDays((prev) => prev + 1);
  const decrement = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = () => {
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};
    userData.travel_days = days;
    userData.travel_date_time = startDate;

    setCookie(cookieName, JSON.stringify(userData), 7);
    setDays(0);
    setStartDate("");
    onNext(3);
  };

  return (
    <div className="travel-schedule">
      <div className="master-prompt">Let's plan your epic adventure!</div>

      <div className="input-section">
        <div className="input-block">
          <label className="input-label">Trip Duration</label>
          <div className="counter-wrapper">
            <button className="counter-btn" onClick={decrement}>&lt;</button>
            <span className="counter-value">{days}</span>
            <button className="counter-btn" onClick={increment}>&gt;</button>
          </div>
        </div>

        <div className="input-block">
          <label className="input-label">Trip Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TravelSchedule;
