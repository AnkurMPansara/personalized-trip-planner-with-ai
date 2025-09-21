import React, { useState } from "react";
import "./TripNature.css";

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface TripNatureProps {
  onNext: (step: number) => void;
}

const TripNature: React.FC<TripNatureProps> = ({ onNext }) => {
  const [nature, setNature] = useState("");

  const handleSubmit = () => {
    if (nature.trim() === "") return;
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};
    userData.trip_nature = nature;
    setCookie(cookieName, JSON.stringify(userData), 7);
    setNature("");
    onNext(4);
  };

  return (
    <div className="trip-nature">
      <label htmlFor="location-input">How would you describe your adventure?</label>
      <input
        id="nature-input"
        type="text"
        placeholder="Nature of the trip..."
        value={nature}
        onChange={(e) => setNature(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TripNature;
