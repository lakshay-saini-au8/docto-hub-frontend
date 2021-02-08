import React from "react";
import { Container, Row, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PageName = ({ pageName }) => {
  return (
    <>
      <Container fluid className="bg-secondary" style={{ height: "80px" }}>
        <Row className="text-left pl-2">
          <LinkContainer to="/" className="">
            <Nav.Link className="text-white ml-0">
              <small className="font-weight-bolder">Home</small>
            </Nav.Link>
          </LinkContainer>
          <Nav.Link className="disabled text-white">
            <small className="font-weight-bolder">/</small>
          </Nav.Link>
          <Nav.Link className="disabled text-white m-0">
            <small className="font-weight-bolder"> {pageName}</small>
          </Nav.Link>
        </Row>
        <Row className="text-left pl-4">
          <h4 className="font-weight-bolder  text-white">{pageName}</h4>
        </Row>
      </Container>
    </>
  );
};

export default PageName;
