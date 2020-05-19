import React, { useState } from "react";
import "./Tabs.css";

const tabs = ["World", "United States", "European"];

const Tabs = () => {
  const [target, setTarget] = useState("World");
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          className={`tab ${target === tab ? "active" : ""}`}
          key={tab}
          onClick={() => setTarget(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
