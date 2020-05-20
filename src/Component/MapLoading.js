import React from "react";
import { Spinner } from "react-bootstrap";

export const MapLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        paddingTop: "40%",
        height: 600,
      }}
    >
      <h3>
        <Spinner animation="grow" /> Loading...
      </h3>
    </div>
  );
};
