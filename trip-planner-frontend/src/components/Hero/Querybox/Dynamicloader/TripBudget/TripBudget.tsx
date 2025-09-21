import React, { useState } from "react";
import "./TripBudget.css";

// Convert number to words (simple for <= millions)
const numberToWords = (num: number): string => {
  if (num === 0) return "Zero rupees";

  const a = ["", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + inWords(n % 100) : "");
    if (n < 1000000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
    return n.toString();
  };

  return inWords(num) + " rupees";
};

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface TripBudgetProps {
  onNext: (step: number) => void;
}

const TripBudget: React.FC<TripBudgetProps> = ({ onNext }) => {
  const [budget, setBudget] = useState<number>(500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 0) setBudget(val);
  };

  const handleSubmit = () => {
    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};
    userData.budget = budget.toString() + " INR";
    setCookie(cookieName, JSON.stringify(userData), 7);
    setBudget(0);
    onNext(6);
  };

  return (
    <div className="trip-budget">
      <div className="master-prompt">What's your budget for this adventure?</div>

      <div className="input-section">
        <div className="currency-wrapper">
          <span className="currency-symbol">₹</span>
          <input
            type="number"
            value={budget}
            onChange={handleChange}
            className="budget-input"
            min={0}
          />
        </div>
        <div className="budget-in-words">{numberToWords(budget)}</div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Budget
      </button>
    </div>
  );
};

export default TripBudget;
