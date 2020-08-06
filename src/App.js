import React, { useContext, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import { Context as dataContext } from "./Context/dataContext";
import Map from "./Map";

function App() {
  const {
    state: { countries, mapCountries, tableData },
    getCountriesData,
  } = useContext(dataContext);

  useEffect(() => {
    getCountriesData();
  }, []);

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
