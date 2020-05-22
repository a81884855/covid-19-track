import React from "react";
import "./countryIcons.css";

const default_arr = ["USA", "UK", "Russia", "Brazil", "Italy", "China"];

const CountryIcons = ({ arr = default_arr, active, handleActive }) => {
  return (
    <div>
      {arr.map((country) => (
        <img
          className={`${active.has(country) && "active"} country-icons`}
          src={`/country_icons/${country}.png`}
          alt={`${country}_icon`}
          onClick={() => handleActive(country)}
        />
      ))}
    </div>
  );
};

export default CountryIcons;
