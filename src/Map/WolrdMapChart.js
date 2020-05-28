/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import { Context as MapContext } from "../context/MapContext";

import { OverlayTrigger } from "react-bootstrap";

import { colorPick, colorCalculate } from "../helper";

import { MapLoading } from "../Component/MapLoading";
import PopoverComp from "../Component/PopoverComp";
import MapCaseSummary from "./MapCaseSummary";
import ZoomButton from "./ZoomButton";

export const WolrdMapChart = () => {
  // const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const {
    state: { worldMapData, mapSummaryData, loading },
    setLoading,
    fetchWorldData,
  } = useContext(MapContext);

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  useEffect(() => {
    setLoading();
    fetchWorldData();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <ComposableMap
            projectionConfig={{ scale: 125, rotation: [-11, 0, 0] }}
            width={750}
            height={500}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
            >
              <Graticule stroke="#eeeeee" />
              <Geographies geography={worldMapData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const {
                      NAME,
                      NewConfirmed,
                      TotalConfirmed,
                      TotalDeaths,
                      NewDeaths,
                      TotalRecovered,
                      NewRecovered,
                    } = geo.properties;

                    return (
                      <OverlayTrigger
                        trigger={["focus", "hover", "click"]}
                        placement="right"
                        key={geo.rsmKey}
                        overlay={PopoverComp({
                          NAME,
                          TotalConfirmed,
                          NewConfirmed,
                          TotalDeaths,
                          NewDeaths,
                          TotalRecovered,
                          NewRecovered,
                        })}
                      >
                        <Geography
                          geography={geo}
                          style={{
                            default: {
                              fill: `${colorPick(
                                colorCalculate(
                                  mapSummaryData.TotalConfirmed,
                                  TotalConfirmed
                                )
                              )}`,
                              stroke: "#adb5bd",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            hover: {
                              fill: "#F53",
                              stroke: "#adb5bd",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#E42",
                              stroke: "#adb5bd",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                          }}
                        />
                      </OverlayTrigger>
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <ZoomButton position={position} setPosition={setPosition} />
          {MapCaseSummary()}
        </>
      ) : (
        <MapLoading />
      )}
    </>
  );
};

export default WolrdMapChart;
