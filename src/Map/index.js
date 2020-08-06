import React, { useContext } from "react";
import { Map, TileLayer } from "react-leaflet";
import { Context as dataContext } from "../Context/dataContext";
import { showDataOnMap } from "../utils";
import "./index.css";

const MapCompo = () => {
  const {
    state: { mapCountries, casesType, mapCenter, mapZoom },
  } = useContext(dataContext);

  console.log(mapCountries, casesType);

  return (
    <div className="map">
      <Map center={mapCenter} zoom={mapZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(mapCountries, casesType)}
      </Map>
    </div>
  );
};

export default MapCompo;
