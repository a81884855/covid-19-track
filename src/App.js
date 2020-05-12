import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { Container, Row, Col } from "react-bootstrap";
import Switch from "./Component/switch";
import Board from "./caseNumBoard";

import "./App.css";

import Nav from "./Layout/Navbar";
import WorldMapChart from "./WorldMap";

function App() {
  const [content, setContent] = useState("");
  const [value, setValue] = useState(false);
  return (
    <>
      <Nav />
      <Container>
        <Row>
          <Col
            xs={12}
            md={8}
            style={{
              padding: "0 20px 0 20px",
            }}
          >
            <Switch
              isOn={value}
              onColor="#EF476F"
              handleToggle={() => setValue(!value)}
            />
            <WorldMapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
          </Col>
          <Col xs={12} md={4}>
            <Board />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
