import React, { useContext } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { Context as dataContext } from "../Context/dataContext";
import { showDataOnMap } from "../utils";
import "./index.css";

const Map = () => {
  const {
    state: { mapCountries, casesType, mapCenter, mapZoom },
  } = useContext(dataContext);

  return (
    <div className="map">
      <LeafletMap center={mapCenter} zoom={mapZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(mapCountries, casesType)}
      </LeafletMap>
    </div>
  );
};

export default Map;
