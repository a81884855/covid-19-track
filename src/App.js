/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, createRef } from "react";
import "./App.css";
import { Row, Col, Card } from "reactstrap";
import { DropdownList } from "react-widgets";

import { Context as dataContext } from "./Context/dataContext";
import Map from "./Map";
import InfoBox from "./InfoBox";
import Table from "./Table";
import Chart from "./Chart";

function App() {
  const dropDownRef = createRef();
  const {
    state: { country, countries },
    getCountryInfo,
    getCountriesData,
    handleChangeCountry,
  } = useContext(dataContext);

  useEffect(() => {
    getCountriesData();
    getCountryInfo();
  }, []);

  return (
    <div className="App">
      <Row>
        <Col md={12} lg={8}>
          <div className="app_header">
            <h1>COVID-19 Tracker</h1>
            <div className="dropdown-box">
              <DropdownList
                data={countries}
                ref={dropDownRef}
                valueField="value"
                textField="name"
                defaultValue={country}
                onChange={(country) => handleChangeCountry(country.name)}
              />
            </div>
          </div>
          <InfoBox />
          <Map />
        </Col>
        <Col md={12} lg={4}>
          <Card className="table_container">
            <Table />
          </Card>
          <Card className="chart_container">
            <Chart />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
