import React from "react";

import "./index.css";
import { Row, Col } from "react-bootstrap";
import MapChart from "./MapChart";
import Board from "../caseNumBoard";
import ScrollAnimation from "react-animate-on-scroll";
import { Paper } from "@material-ui/core";

const MapContainer = () => {
  return (
    <Paper
      elevation={3}
      style={{
        margin: "1.5rem",
        padding: "1rem 1rem 0.25rem 1rem",
      }}
    >
      <div
        style={{
          margin: "1rem",
        }}
      >
        <h1>Map</h1>
      </div>
      <Row
        style={{
          margin: "0 0 60px 0",
        }}
      >
        <Col lg={12} xl={8}>
          <ScrollAnimation
            animateIn="bounceInLeft"
            animateOut="fadeOutRight"
            // delay={500}
            // animateOnce={true}
          >
            <MapChart />
          </ScrollAnimation>
        </Col>
        <Col lg={12} xl={4}>
          <ScrollAnimation
            animateIn="bounceInRight"
            animateOut="fadeOutLeft"
            // delay={500}
            // animateOnce={true}
          >
            <Board />
          </ScrollAnimation>
        </Col>
      </Row>
    </Paper>
  );
};

export default MapContainer;
