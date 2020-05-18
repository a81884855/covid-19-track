import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Board from "./caseNumBoard";

import "./App.css";

import Nav from "./Layout/Navbar";
import WorldMapChart from "./WorldMap";

function App() {
  const [value, setValue] = useState(false);
  return (
    <>
      <Nav />
      <div
        style={{
          margin: "0 1rem",
          padding: "0 1rem",
        }}
      >
        <Row
          style={{
            margin: "0 0 60px 0",
          }}
        >
          <Col md={12} lg={8}>
            <WorldMapChart />
          </Col>
          <Col md={12} lg={4}>
            <Board />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
