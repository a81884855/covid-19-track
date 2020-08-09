import React, { useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

import { Context as dataContext } from "../Context/dataContext";
import "./index.css";
import { rounded } from "../utils";

const CardBox = ({
  active,
  title,
  todayAmount,
  amount,
  styleClassname,
  click,
}) => (
  <Card onClick={click}>
    <CardBody className={`card-box ${active ? "active" : ""}`}>
      <h6>{title}</h6>
      <div className={styleClassname}>
        + {rounded(todayAmount)} <small>today</small>
      </div>
      <small>{rounded(amount)} Total</small>
    </CardBody>
  </Card>
);

const InfoBox = () => {
  const {
    state: { countryInfo, casesType },
    handleChangeCaseTypes,
  } = useContext(dataContext);
  return (
    <Row className="mt-2">
      <Col xs={12} sm={4}>
        <CardBox
          active={casesType === "cases"}
          title="Coronavirus Cases"
          todayAmount={countryInfo.todayCases}
          amount={countryInfo.cases}
          styleClassname="info-confirmed"
          click={() => handleChangeCaseTypes("cases")}
        />
      </Col>

      <Col xs={12} sm={4}>
        <CardBox
          active={casesType === "recovered"}
          title="Recovered"
          todayAmount={countryInfo.todayRecovered}
          amount={countryInfo.recovered}
          styleClassname="info-recovered"
          click={() => handleChangeCaseTypes("recovered")}
        />
      </Col>

      <Col xs={12} sm={4}>
        <CardBox
          active={casesType === "deaths"}
          title="Deaths"
          todayAmount={countryInfo.todayDeaths}
          amount={countryInfo.deaths}
          styleClassname="info-deaths"
          click={() => handleChangeCaseTypes("deaths")}
        />
      </Col>
    </Row>
  );
};

export default InfoBox;
