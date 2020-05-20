import React from "react";
import { Row, Col } from "react-bootstrap";

export const MapContainer = () => {
  return (
    <div
      style={{
        margin: "0.3rem 1rem",
        padding: "0 1rem",
      }}
    >
      <Row
        style={{
          margin: "0 0 60px 0",
        }}
      >
        <Col md={12} lg={8}>
          <MapChart />
        </Col>
        <Col md={12} lg={4}>
          <Board />
        </Col>
      </Row>
    </div>
  );
};
