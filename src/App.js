/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, createRef } from "react";
import "./App.css";
import { Row, Col, Card } from "reactstrap";
import { DropdownList } from "react-widgets";

import { Context as dataContext } from "./Context/dataContext";
import Map from "./Map";
import CountriesTable from "./CountriesTable";
import InfoBox from "./InfoBox";
import Table from "./Table";
import Chart from "./Chart";
import News from "./News";

function App() {
  const dropDownRef = createRef();
  const {
    state: { country, countries },
    getCountryInfo,
    getCountriesData,
    handleChangeCountry,
    getNewsData,
  } = useContext(dataContext);

  useEffect(() => {
    getCountriesData();
    getCountryInfo();
    getNewsData();
  }, []);

  return (
    <div className="App">
      <Row>
        <Col lg={12} xl={8}>
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
          <CountriesTable />
        </Col>
        <Col lg={12} xl={4}>
          <Card className="chart_container">
            <Chart />
          </Card>
          <Card className="table_container">
            <Table />
          </Card>
          <Card className="news-container">
            <News />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
