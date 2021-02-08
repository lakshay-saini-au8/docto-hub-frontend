import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
const LookinFor = () => {
  return (
    <Container className="">
      <Row className="mb-2 mb-md-5">
        <h2 className="w-100 text-center">What Are You Looking For?</h2>
      </Row>

      <Row className="mt-2 mt-md-5 mb-5">
        <Col md={6} className="text-center mb-2 lookingfor-overlay-container">
          <div className="parent">
            <div className="child search-doctor">
              <span className="overlay-button">
                <h6 className="overlay-heading">Visit a Doctor</h6>
                <Link className="overlay-link-buttons" to="/doctors">
                  Book Now
                </Link>
              </span>
            </div>
          </div>
        </Col>
        <Col md={6} className="text-center mb-2 lookingfor-overlay-container">
          <div className="parent">
            <div className="child search-pharmacy">
              <span className="overlay-button">
                <h6 className="overlay-heading">Buy Medicines</h6>
                <Link className="overlay-link-buttons" to="/medicines">
                  Find Now
                </Link>
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LookinFor;
