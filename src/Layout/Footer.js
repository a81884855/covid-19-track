import React from "react";
import { Row, Container } from "react-bootstrap";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "hover.css/css/hover-min.css";

const sentence = "More about this project".split("");

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="justify-content-center">
          {/* <h3>More about this project</h3> */}
          {sentence.map((char) => (
            <div className="sentence">
              {char !== " " ? char : <span style={{ marginRight: 5 }} />}
            </div>
          ))}
          <FaGithub />
        </Row>
      </Container>

      <Row className="justify-content-center">
        <div>
          <a
            href="https://github.com/a81884855/covid-19-track"
            className="social hvr-pop"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gary-guan/"
            className="social hvr-pop"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </Row>
    </div>
  );
};

export default Footer;
