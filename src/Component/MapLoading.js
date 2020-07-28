import React from "react";
import { Spinner } from "react-bootstrap";

export const MapLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        height: "100%",
        position: "relative",
        height: 550,
        display: "block",
        paddingTop: " 35%",
      }}
    >
      <h3>
        <Spinner animation="grow" /> Loading...
      </h3>
    </div>
  );
};
