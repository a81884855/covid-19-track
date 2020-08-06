import React from "react";
import { Circle, Tooltip } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 400,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 800,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num > 10000) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num;
  }
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Tooltip>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases:
            <div>
              <span>{rounded(country.cases)} </span>
              <small>
                + {country.todayCases}
                {" new"}
              </small>
            </div>
          </div>
          <div className="info-recovered">
            Recovered:
            <div>
              <span>{rounded(country.recovered)} </span>
              <small>
                + {country.todayRecovered}
                {" new"}
              </small>
            </div>
          </div>
          <div className="info-deaths">
            Deaths:
            <div>
              <span>{rounded(country.deaths)} </span>
              <small>
                + {country.todayDeaths}
                {" new"}
              </small>
            </div>
          </div>
        </div>
      </Tooltip>
    </Circle>
  ));
