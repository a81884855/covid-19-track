import React, { useState } from "react";
import "./countryIcons.css";
import { Tooltip } from "@material-ui/core";

const default_arr = [
  "USA",
  "UK",
  "Canada",
  "Russia",
  "Italy",
  "Spain",
  "France",
  "Brazil",
  "India",
  "Iran",
  "Mexico",
  "Malaysia",
  "Portugal",
  "Switzerland",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Turkey",
  "Japan",
  "S. Korea",
  "China",
  "Thailand",
  "Vietnam",
  "Argentina",
  "Peru",
];

const CountryIcons = ({ arr = default_arr, active, handleActive }) => {
  const [max, setMax] = useState(8);
  return (
    <div
      style={{
        margin: "1rem",
        padding: "0.5rem 1.5rem 0 0.5rem",
        overflow: "auto",
      }}
    >
      {arr.slice(0, max).map((country) => (
        <div
          style={{
            display: "inline-block",
          }}
          key={country}
        >
          <Tooltip title={country}>
            <img
              className={`${active.has(country) && "active"} country-icons`}
              src={`/country_icons/${country}.png`}
              alt={`${country}_icon`}
              onClick={() => handleActive(country)}
            />
          </Tooltip>
        </div>
      ))}

      {arr.length > max ? (
        <div
          style={{
            display: "inline-block",
            position: "absolute",
          }}
          onClick={() => setMax(max + 8)}
        >
          <div
            className="country-icons"
            style={{
              border: "1px solid lightgrey",
              height: 60,
              padding: 15,
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontWeight: 800,
              }}
            >
              {arr.length - max}+
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CountryIcons;
