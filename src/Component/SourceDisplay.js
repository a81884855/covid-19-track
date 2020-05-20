import React from "react";

export const SourceDisplay = (map) => {
  const source = (map) => {
    switch (map) {
      case "World":
        return ["https://www.covid19api.com", "covid19api.com"];
      default:
        return ["https://www.covid19api.com", "covid19api.com"];
    }
  };

  const sourceURl = source(map);

  return (
    <p
      style={{
        fontSize: "0.75rem",
        margin: 3,
      }}
    >
      Source from{" "}
      <a href={sourceURl[0]} target="_blank" rel="noopener noreferrer">
        {sourceURl[1]}
      </a>
    </p>
  );
};
