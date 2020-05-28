/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import { colorPick, colorCalculate } from "../helper";

import { Context as MapContext } from "../context/MapContext";

import { OverlayTrigger } from "react-bootstrap";

import allStates from "../Data/allStates.json";

import MapCaseSummary from "./MapCaseSummary";

import { MapLoading } from "../Component/MapLoading";
import PopoverComp from "../Component/PopoverComp";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const USMapChart = () => {
  const {
    state: { loading, USMapData, mapSummaryData },
    setLoading,
    fetchUSData,
  } = useContext(MapContext);

  useEffect(() => {
    setLoading();
    fetchUSData();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <ComposableMap
            projectionConfig={{ scale: 900 }}
            width={750}
            height={500}
            projection="geoAlbersUsa"
          >
            <Geographies geography={USMapData}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => {
                    const {
                      name,
                      cases,
                      todayCases,
                      deaths,
                      todayDeaths,
                      tests,
                    } = geo.properties;

                    return (
                      <OverlayTrigger
                        trigger={["focus", "hover", "click"]}
                        placement="right"
                        key={geo.rsmKey}
                        overlay={PopoverComp({
                          NAME: name,
                          TotalConfirmed: cases,
                          NewConfirmed: todayCases,
                          TotalDeaths: deaths,
                          NewDeaths: todayDeaths,
                          Test: tests,
                        })}
                      >
                        <Geography
                          key={geo.rsmKey}
                          stroke="#FFF"
                          geography={geo}
                          // fill="#DDD"
                          style={{
                            default: {
                              fill: `${colorPick(
                                colorCalculate(
                                  mapSummaryData.TotalConfirmed,
                                  cases
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
                  })}

                  {geographies.map((geo) => {
                    const centroid = geoCentroid(geo);
                    const cur = allStates.find((s) => s.val === geo.id);
                    return (
                      <g key={geo.rsmKey + "-name"}>
                        {cur &&
                          centroid[0] > -160 &&
                          centroid[0] < -67 &&
                          (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                            <Marker coordinates={centroid}>
                              <text
                                y="2"
                                fontSize={14}
                                textAnchor="middle"
                                style={{
                                  userSelect: "none",
                                }}
                              >
                                {cur.id}
                              </text>
                            </Marker>
                          ) : (
                            <Annotation
                              subject={centroid}
                              dx={offsets[cur.id][0]}
                              dy={offsets[cur.id][1]}
                            >
                              <text
                                x={4}
                                fontSize={14}
                                alignmentBaseline="middle"
                              >
                                {cur.id}
                              </text>
                            </Annotation>
                          ))}
                      </g>
                    );
                  })}
                </>
              )}
            </Geographies>
            }
          </ComposableMap>
          <MapCaseSummary />
        </>
      ) : (
        <MapLoading />
      )}
    </>
  );
};

export default USMapChart;
