import React from "react";

import "./index.css";
import { Row, Col } from "react-bootstrap";
import MapChart from "./MapChart";
import Board from "../caseNumBoard";

const MapContainer = () => {
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
        <Col lg={12} xl={8}>
          <MapChart />
        </Col>
        <Col lg={12} xl={4}>
          <Board />
        </Col>
      </Row>
    </div>
  );
};

export default MapContainer;
