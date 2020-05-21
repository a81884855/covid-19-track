import React, { useState } from "react";
import "./Tabs.css";

const tabs = ["World", "United States", "Europe"];

const Tabs = ({ setMap }) => {
  const [target, setTarget] = useState("World");
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          className={`tab ${target === tab ? "active" : ""}`}
          key={tab}
          onClick={() => {
            setMap(tab);
            setTarget(tab);
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
