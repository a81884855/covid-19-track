import React, { memo, useState, useContext, useEffect } from "react";

import "./index.css";
import { Context as WorldMapContext } from "../context/worldMapContext";

import MapHeadDisplay from "./statisticsDisplay";

import WorldMapChart from "./WolrdMapChart";
import USMapChart from "./USMapChart";

import Tabs from "../Component/Tabs";

const MapChart = () => {
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState("World");

  const {
    state: { worldMapData, Global },
    addData,
    fetchData,
  } = useContext(WorldMapContext);

  useEffect(() => {
    let fetch = async () => {
      try {
        let data = await fetchData();
        await addData(data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  const mapSwitch = (map) => {
    switch (map) {
      case "World":
        return (
          <WorldMapChart
            loading={loading}
            worldMapData={worldMapData}
            GlobalTotalConfirmed={Global.TotalConfirmed}
          />
        );
      case "United States":
        return <USMapChart />;
      default:
        return (
          <WorldMapChart
            loading={loading}
            worldMapData={worldMapData}
            GlobalTotalConfirmed={Global.TotalConfirmed}
          />
        );
    }
  };

  console.log(map);
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
        {mapSwitch(map)}
        {MapHeadDisplay(Global)}
      </div>
    </>
  );
};

export default memo(MapChart);
