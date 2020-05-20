import React, { useState, useEffect, useContext } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import { rounded, colorPick, colorCalculate } from "../helper";

import { Context as MapContext } from "../context/MapContext";

import { OverlayTrigger, Popover, PopoverContent } from "react-bootstrap";

import allStates from "../Data/allStates.json";

import MapCaseSummary from "./MapCaseSummary";
import { MapLoading } from "../Component/MapLoading";

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
  const [loading, setLoading] = useState(false);

  const {
    state: { USMapData, mapSummaryData },
    addUSData,
    fetchUSData,
  } = useContext(MapContext);

  useEffect(() => {
    let fetch = async () => {
      try {
        let data = await fetchUSData();
        await addUSData(data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <ComposableMap
            projectionConfig={{ scale: 900 }}
            width={750}
            height={500}
            projection="geoAlbersUsa"
          >
            {loading && (
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
                          overlay={
                            <Popover>
                              <Popover.Title as="h4">{name}</Popover.Title>
                              <PopoverContent>
                                <div>
                                  <span
                                    style={{
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    Total Confirmed:{" "}
                                  </span>
                                  <span className="confirmedCase">
                                    {rounded(cases)}
                                  </span>
                                  <span
                                    className="confirmedCase font-weight-bold"
                                    style={{
                                      fontSize: "0.6rem",
                                    }}
                                  >
                                    {typeof todayCases === "number"
                                      ? ` + ${rounded(todayCases)} new`
                                      : "N/A"}
                                  </span>
                                </div>

                                <div>
                                  <span
                                    style={{
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    Total Deaths:{" "}
                                  </span>
                                  <span className="deathCase">
                                    {rounded(deaths)}
                                  </span>
                                  <span
                                    className="deathCase font-weight-bold"
                                    style={{
                                      fontSize: "0.6rem",
                                    }}
                                  >
                                    {typeof todayDeaths === "number"
                                      ? ` + ${rounded(todayDeaths)} new`
                                      : "N/A"}
                                  </span>
                                </div>

                                <div>
                                  <span
                                    style={{
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    Total Tests:{" "}
                                  </span>
                                  <span className="recoveredCase">
                                    {rounded(tests)}
                                  </span>
                                </div>
                              </PopoverContent>
                            </Popover>
                          }
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
            )}
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
