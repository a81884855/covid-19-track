import React, { useState } from "react";
import "./Tabs.css";
import { Paper } from "@material-ui/core";

const tabs = ["World", "United States", "Europe"];

const Tabs = ({ setMap }) => {
  const [target, setTarget] = useState("World");
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <Paper
          className={`tab ${target === tab ? "active" : ""}`}
          key={tab}
          onClick={() => {
            setMap(tab);
            setTarget(tab);
          }}
          elevation={3}
        >
          {tab}
        </Paper>
      ))}
    </div>
  );
};

export default Tabs;
