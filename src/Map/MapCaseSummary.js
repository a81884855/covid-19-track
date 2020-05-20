import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";
import { Context as MapContext } from "../context/MapContext";

const MapCaseSummary = () => {
  const {
    state: {
      mapSummaryData: {
        TotalConfirmed,
        NewConfirmed,
        TotalDeaths,
        NewDeaths,
        TotalRecovered,
        NewRecovered,
        Test,
        TestsPerOneMillion,
      },
    },
  } = useContext(MapContext);

  return (
    <Row
      style={{
        padding: "0 15px 0 15px",
      }}
    >
      {TotalConfirmed && (
        <Col className="caseDisplayContainer confirmedCaseBackground">
          <span>
            {TotalConfirmed}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {NewConfirmed ? `${" "}+ ${NewConfirmed} new` : "N/A"}
            </p>
          </span>
          <h5>Confirmed</h5>
        </Col>
      )}

      {TotalRecovered && (
        <Col className="caseDisplayContainer recoveredCaseBackground">
          <span>
            {TotalRecovered}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {NewRecovered ? `${" "}+ ${NewRecovered} new` : "N/A"}
            </p>
          </span>
          <h5>Recovered</h5>
        </Col>
      )}

      {TotalDeaths && (
        <Col className="caseDisplayContainer deathCaseBackground">
          <span>
            {TotalDeaths}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {NewDeaths ? `${" "}+ ${NewDeaths} new` : "N/A"}
            </p>
          </span>
          <h5>Death</h5>
        </Col>
      )}

      {Test && (
        <Col className="caseDisplayContainer testCaseBackground">
          <span>
            {Test}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {TestsPerOneMillion
                ? ` ${TestsPerOneMillion} Per Million`
                : "N/A"}
            </p>
          </span>
          <h5>Tests</h5>
        </Col>
      )}
    </Row>
  );
};

export default MapCaseSummary;
