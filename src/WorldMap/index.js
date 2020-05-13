import React, { memo, useState, useContext, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";

import { OverlayTrigger, Popover, PopoverContent } from "react-bootstrap";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import "./index.css";
import { rounded, abbrev } from "../helper";
import { Context as WorldMapContext } from "../context/worldMapContext";

// const geoUrl = "http://localhost:4000/";

const MapChart = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const { state, fetchData } = useContext(WorldMapContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      try {
        await fetchData();
        setLoading(true);
      } catch (err) {
        console.log(console.error);
      }
    };

    fetch();
  }, []);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{ scale: 125 }}
        width={700}
        height={400}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Sphere />
          {loading && (
            <Geographies geography={state}>
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
                      trigger={["focus", "hover"]}
                      placement="right"
                      key={geo.rsmKey}
                      overlay={
                        <Popover>
                          <Popover.Title as="h3">{abbrev(NAME)}</Popover.Title>
                          <PopoverContent>
                            <div>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                }}
                              >
                                Total Confirmed:{" "}
                              </span>
                              <span
                                style={{
                                  color: "#427cd2",
                                }}
                              >
                                {rounded(TotalConfirmed)}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.6rem",
                                  color: "#427cd2",
                                  fontWeight: "bold",
                                }}
                              >
                                {typeof NewConfirmed === "number"
                                  ? ` + ${rounded(NewConfirmed)} new`
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
                              <span
                                style={{
                                  color: "#c74333",
                                }}
                              >
                                {rounded(TotalDeaths)}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.6rem",
                                  color: "#c74333",
                                  fontWeight: "bold",
                                }}
                              >
                                {typeof NewDeaths === "number"
                                  ? ` + ${rounded(NewDeaths)} new`
                                  : "N/A"}
                              </span>
                            </div>

                            <div>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                }}
                              >
                                Total Recovered:{" "}
                              </span>
                              <span
                                style={{
                                  color: "#95c183",
                                }}
                              >
                                {rounded(TotalRecovered)}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.6rem",
                                  color: "#95c183",
                                  fontWeight: "bold",
                                }}
                              >
                                {typeof NewRecovered === "number"
                                  ? ` + ${rounded(NewRecovered)} new`
                                  : "N/A"}
                              </span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      }
                    >
                      <Geography
                        geography={geo}
                        style={{
                          default: {
                            fill: "#D6D6DA",
                            outline: "none",
                          },
                          hover: {
                            fill: "#F53",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#E42",
                            outline: "none",
                          },
                        }}
                      />
                    </OverlayTrigger>
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <FaPlusCircle className="controls-icons" onClick={handleZoomIn} />
        <FaMinusCircle className="controls-icons" onClick={handleZoomOut} />
      </div>
    </>
  );
};

export default memo(MapChart);
