import React from "react";

import { Row, Col } from "react-bootstrap";

const MapCaseNumDisplay = (Global) => {
  return (
    <Row
      style={{
        padding: "0 15px 0 15px",
      }}
    >
      {Global.TotalConfirmed && (
        <Col className="caseDisplayContainer confirmedCaseBackground">
          <span>
            {Global.TotalConfirmed}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {" "}
              + {Global.NewConfirmed} new
            </p>
          </span>
          <h5>Confirmed</h5>
        </Col>
      )}

      {Global.TotalRecovered && (
        <Col className="caseDisplayContainer recoveredCaseBackground">
          <span>
            {Global.TotalRecovered}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {" "}
              + {Global.NewRecovered} new
            </p>
          </span>
          <h5>Recovered</h5>
        </Col>
      )}

      {Global.TotalDeaths && (
        <Col className="caseDisplayContainer deathCaseBackground">
          <span>
            {Global.TotalDeaths}
            <p
              className="font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {" "}
              + {Global.NewDeaths} new
            </p>
          </span>
          <h5>Death</h5>
        </Col>
      )}
    </Row>
  );
};

export default MapCaseNumDisplay;
