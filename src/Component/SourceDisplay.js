import React from "react";

export const SourceDisplay = ({ map }) => {
  const source = (map) => {
    switch (map) {
      case "World":
        return ["https://www.covid19api.com", "covid19api.com"];
      case "United States":
        return ["https://corona.lmao.ninja", "corona.lmao.ninja"];
      default:
        return ["https://www.covid19api.com", "covid19api.com"];
    }
  };

  const Source = source(map);

  return (
    <p
      style={{
        fontSize: "0.75rem",
        margin: 3,
      }}
    >
      Source from{" "}
      <a href={Source[0]} target="_blank" rel="noopener noreferrer">
        {Source[1]}
      </a>
    </p>
  );
};
