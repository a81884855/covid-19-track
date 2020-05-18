import React from "react";

import { Row, Col } from "react-bootstrap";

const MapCaseNumDisplay = (Global) => {
  return (
    <Row className="mt-3">
      <Col>
        Confimed:
        {Global.TotalConfirmed && (
          <span className="caseNumDisplay confirmedCase">
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
        )}
      </Col>

      <Col>
        Recovered:
        {Global.TotalRecovered && (
          <span className="caseNumDisplay recoveredCase">
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
        )}
      </Col>

      <Col>
        Death:
        {Global.TotalDeaths && (
          <span className="caseNumDisplay deathCase">
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
        )}
      </Col>
    </Row>
  );
};

export default MapCaseNumDisplay;
