import React, { useContext } from "react";
import { Row, Col, CardImg } from "reactstrap";
import moment from "moment";

import { Context as dataContext } from "../Context/dataContext";
import "./News.css";

const NewsBox = ({ article }) => (
  <div className="news-box">
    <Row>
      <Col xs={4}>
        <CardImg src={article.image} alt="" />
      </Col>
      <Col xs={8}>
        <a href={article.url}>
          <strong>{article.title}</strong>
        </a>
        <div className="mt-1">
          <small>Published: {moment(article.publishedAt).format("llll")}</small>
          <br />
          <p>{article.description.slice(0, 120)}</p>
        </div>
      </Col>
    </Row>
  </div>
);

const NewsContainer = () => {
  const {
    state: { newsData },
  } = useContext(dataContext);

  return (
    <div>
      <h4>Top News for COVID</h4>
      <div className="news-boxes">
        {newsData.map((article) => (
          <NewsBox article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsContainer;
