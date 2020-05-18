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

import MapHeadDisplay from "./MapHeadDisplay";

const MapChart = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
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
                              <span className="confirmedCase">
                                {rounded(TotalConfirmed)}
                              </span>
                              <span
                                className="confirmedCase font-weight-bold"
                                style={{
                                  fontSize: "0.6rem",
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
                              <span className="deathCase">
                                {rounded(TotalDeaths)}
                              </span>
                              <span
                                className="deathCase font-weight-bold"
                                style={{
                                  fontSize: "0.6rem",
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
                              <span className="recoveredCase">
                                {rounded(TotalRecovered)}
                              </span>
                              <span
                                className="recoveredCase font-weight-bold"
                                style={{
                                  fontSize: "0.6rem",
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
      {MapHeadDisplay(Global)}
    </>
  );
};

export default memo(MapChart);
