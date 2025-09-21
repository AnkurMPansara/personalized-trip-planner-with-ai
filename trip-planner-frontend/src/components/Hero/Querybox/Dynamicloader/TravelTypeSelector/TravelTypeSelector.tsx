import React, { useState } from "react";
import "./TravelTypeSelector.css";

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface TravelTypeSelectorProps {
  onNext: (step: number) => void;
};

const TravelTypeSelector: React.FC<TravelTypeSelectorProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<"domestic" | "international" | null>(null);

  const handleSelect = (type: "domestic" | "international") => {
    setSelected(type);
    const isInternational = type === "international";

    // Read existing cookie
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};

    // Only update the key we care about
    userData.is_international_travel = isInternational;

    // Save back to cookie
    setCookie(cookieName, JSON.stringify(userData), 7);

    onNext(2); // move to next step/component
  };

  return (
    <div className="travel-type-selector">
      <label className="travel-label">Where’s your adventure taking you?</label>
      <div className="button-container">
        <button
          className={`travel-btn ${selected === "domestic" ? "selected" : ""}`}
          onClick={() => handleSelect("domestic")}
        >
          Domestic
        </button>
        <button
          className={`travel-btn ${selected === "international" ? "selected" : ""}`}
          onClick={() => handleSelect("international")}
        >
          International
        </button>
      </div>
    </div>
  );
};

export default TravelTypeSelector;
