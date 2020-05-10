import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import "./App.css";

import WorldMapChart from "./WorldMap";

function App() {
  const [content, setContent] = useState("");
  return (
    <div
      style={{
        margin: 50,
      }}
    >
      <WorldMapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
