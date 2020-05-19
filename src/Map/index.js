import React, { memo, useState, useContext, useEffect } from "react";

import "./index.css";
import { Context as WorldMapContext } from "../context/worldMapContext";

import MapHeadDisplay from "./statisticsDisplay";

import WorldMapChart from "./WolrdMapChart";
import Tabs from "../Component/Tabs";

const MapChart = () => {
  const {
    state: { worldMapData, Global },
    addData,
    fetchData,
  } = useContext(WorldMapContext);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Tabs />
      <div
        style={{
          border: "1px solid black",
          borderRadius: "20px",
          overflow: "auto",
        }}
      >
        {WorldMapChart(worldMapData, Global.TotalConfirmed, loading)}
        {MapHeadDisplay(Global)}
      </div>
    </>
  );
};

export default memo(MapChart);
