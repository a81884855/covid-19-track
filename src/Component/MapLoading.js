import React from "react";
import { Spinner } from "react-bootstrap";

export const MapLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        paddingTop: "30%",
        height: 550,
      }}
    >
      <h3>
        <Spinner animation="grow" /> Loading...
      </h3>
    </div>
  );
};
