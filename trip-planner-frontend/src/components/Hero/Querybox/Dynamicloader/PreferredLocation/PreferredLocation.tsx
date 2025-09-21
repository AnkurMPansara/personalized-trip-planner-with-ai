import React, { useState } from "react";
import "./PreferredLocation.css";

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface PreferredLocationProps {
  onNext: (step: number) => void;
}

const PreferredLocation: React.FC<PreferredLocationProps> = ({onNext}) => {
  const [location, setLocation] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};
    userData.preferred_location = location;
    setCookie(cookieName, JSON.stringify(userData), 7);
    setLocation("");
    onNext(7);
  };

  return (
    <div className="preferred-location">
      <div className="master-prompt">
        Which type of destination do you prefer for your journey?
      </div>

      <input
        type="text"
        className="location-input"
        placeholder="For example: beach, mountains, countryside, or city…"
        value={location}
        onChange={handleChange}
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Location
      </button>
    </div>
  );
};

export default PreferredLocation;
