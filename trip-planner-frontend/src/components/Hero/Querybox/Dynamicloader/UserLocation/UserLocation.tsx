import React, { useState } from "react";
import "./UserLocation.css";

// Helper functions to get and set cookies
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface UserLocationProps {
  onNext: (step: number) => void;
}

const UserLocation: React.FC<UserLocationProps> = ({ onNext }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (location.trim() === "") return;

    // Read existing cookie
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};

    // Only update the key we care about
    userData.user_location = location;

    // Save back to cookie
    setCookie(cookieName, JSON.stringify(userData), 7);

    setLocation(""); // clear input
    onNext(1); // move to next step/component
  };

  return (
    <div className="user-location">
      <label htmlFor="location-input">Where will your adventure begin?</label>
      <input
        id="location-input"
        type="text"
        placeholder="Type your location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserLocation;
