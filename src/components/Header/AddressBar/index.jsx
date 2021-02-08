import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AdressBar = () => {
  return (
    <Container fluid className="d-none d-lg-block d-xl-block">
      <Row className="pl-2 py-1 text-white bg-primary">
        <Col>
          <small className="mr-3">
            <i className="fas fa-map-marker-alt mr-2"></i>
            Address Goes Here, City Name
          </small>
          <small className="mr-3">
            <i className="fas fa-phone mr-2"></i>
            +91-9999-9999
          </small>
          <small>
            <i className="fas fa-envelope mr-2"></i>
            xyz@gmail.com
          </small>
        </Col>
        <Col className=" d-flex justify-content-end">
          <small>
            <i className="fab fa-facebook-f mr-4"></i>
          </small>
          <small>
            <i className="fab fa-instagram mr-4"></i>
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default AdressBar;
