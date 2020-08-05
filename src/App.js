import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import Map from "./Map";

function App() {
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("case");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  const getCountriesData = async () => {
    const { data } = axios.get("https://disease.sh/v3/covid-19/countries");
  };

  useEffect(() => {});
  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={12} lg={9}>
            <h1>COVID-19 Tracker</h1>
            <Map />
          </Col>
          <Col md={12} lg={3}>
            sth
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
