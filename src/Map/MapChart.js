import React, { memo, useState } from "react";

import WorldMapChart from "./WolrdMapChart";
import USMapChart from "./USMapChart";

import Tabs from "../Component/Tabs";
import { SourceDisplay } from "../Component/SourceDisplay";

const MapChart = () => {
  const [map, setMap] = useState("World");

  const mapDisplay = (map) => {
    switch (map) {
      case "World":
        return <WorldMapChart />;
      case "United States":
        return <USMapChart />;
      case "European":
        return (
          <div
            style={{
              height: 600,
              textAlign: "center",
              paddingTop: "30%",
            }}
          >
            <h1>Comming Soon...</h1>
          </div>
        );
      default:
        return <WorldMapChart />;
    }
  };

  return (
    <>
      <Tabs setMap={setMap} />
      <div
        style={{
          border: "1px solid black",
          borderRadius: "20px",
          overflow: "auto",
        }}
      >
        {mapDisplay(map)}
      </div>
      <SourceDisplay map={map} />
    </>
  );
};

export default memo(MapChart);
