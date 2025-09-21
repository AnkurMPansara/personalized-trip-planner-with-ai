import React from "react";
import "./QueryBox.css";
import Dynamicloader from "./Dynamicloader/Dynamicloader";

const QueryBox: React.FC = () => {
  return (
    <section className="query-box">
        <Dynamicloader />
    </section>
  );
};

export default QueryBox;
