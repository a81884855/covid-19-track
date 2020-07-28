import React, { memo, useState } from "react";

import WorldMapChart from "./WolrdMapChart";
import USMapChart from "./USMapChart";

import Tabs from "../Component/Tabs";
import { SourceDisplay } from "../Component/SourceDisplay";
// import { Paper } from "@material-ui/core";
import MapCaseSummary from "./MapCaseSummary";

const MapChart = () => {
  const [map, setMap] = useState("World");

  const mapDisplay = (map) => {
    switch (map) {
      case "World":
        return <WorldMapChart />;
      case "United States":
        return <USMapChart />;
      case "Europe":
        return (
          <div
            style={{
              height: 600,
              textAlign: "center",
              paddingTop: "25%",
            }}
          >
            <h1>Comming Soon...</h1>
          </div>
        );
      default:
        return null;
      // return <WorldMapChart />;
    }
  };

  return (
    <>
      <Tabs setMap={setMap} />
      <div
        style={{
          minHeight: "calc(100vh - 115px)",
        }}
        elevation={3}
      >
        {mapDisplay(map)}
      </div>
      {MapCaseSummary()}
      <SourceDisplay map={map} />
    </>
  );
};

export default memo(MapChart);
