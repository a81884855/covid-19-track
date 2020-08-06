import React, { useContext, useEffect, createRef } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import { DropdownList } from "react-widgets";

import { Context as dataContext } from "./Context/dataContext";
import Map from "./Map";
import InfoBox from "./InfoBox";

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

  console.log(country);

  return (
    <div className="App">
      {/* <Container> */}
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
          sth
        </Col>
      </Row>
      {/* </Container> */}
    </div>
  );
}

export default App;
