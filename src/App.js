import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Switch from "./Component/switch";
import Board from "./caseNumBoard";

import "./App.css";

import Nav from "./Layout/Navbar";
import WorldMapChart from "./WorldMap";

function App() {
  const [value, setValue] = useState(false);
  return (
    <>
      <Nav />
      <Container>
        <Row
          style={{
            margin: "0 0 60px 0",
          }}
        >
          <Col
            md={12}
            lg={8}
            style={{
              padding: "0 20px 0 20px",
              marginBottom: 30,
            }}
          >
            <Switch
              isOn={value}
              onColor="#EF476F"
              handleToggle={() => setValue(!value)}
            />
            <WorldMapChart />
          </Col>
          <Col md={12} lg={4}>
            <Board />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
