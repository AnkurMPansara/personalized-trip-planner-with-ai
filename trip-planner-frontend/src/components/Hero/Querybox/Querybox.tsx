import React from "react";
import "./QueryBox.css";

const QueryBox: React.FC = () => {
  return (
    <div className="query-box">
      <h2>Ask Your Question</h2>
      <input type="text" placeholder="Type your question..." />
      <button>Submit</button>
    </div>
  );
};

export default QueryBox;
