import React from "react";

import "./index.css";
import { Row, Col } from "react-bootstrap";
import MapChart from "./MapChart";
import Board from "../caseNumBoard";
import ScrollAnimation from "react-animate-on-scroll";

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
          <ScrollAnimation animateIn="bounceInUp">
            <MapChart />
          </ScrollAnimation>
        </Col>
        <Col lg={12} xl={4}>
          <ScrollAnimation animateIn="bounceInUp">
            <Board />
          </ScrollAnimation>
        </Col>
      </Row>
    </div>
  );
};

export default MapContainer;
