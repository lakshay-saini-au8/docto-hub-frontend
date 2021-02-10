import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CheckoutForm from "./Left";
const CartCheckoutForm = () => {
  return (
    <Container fluid className=" mt-4 p-3 p-lg-4">
      <Row className="p-0">
        <Col md={8} className="p-3 px-md-5">
          <CheckoutForm />
        </Col>

        <Col md={4} className="p-0 m-0">
          <Row className="bg-white p-3 m-4">
            <h5>Your Order</h5>
          </Row>
          <Row className="bg-white p-3 m-4">
            <Col
              className="d-flex justify-content-between pb-3 mb-1"
              style={{ borderBottom: "2px solid black" }}
            >
              <span className="font-weight-bolder">Product</span>
              <span className="font-weight-bolder">Total</span>
            </Col>
            {[...Array(3)].map(() => {
              return (
                <Col sm={12} className="my-2 d-flex justify-content-between">
                  <span className="w-50 text-truncate text-muted text-left">
                    Name
                  </span>
                  <span className=" w-50 text-muted text-right">₹ 200</span>
                </Col>
              );
            })}
          </Row>
          <Row className="bg-white p-3 m-4">
            {[...Array(3)].map(() => {
              return (
                <Col sm={12} className=" my-2 d-flex justify-content-between">
                  <span className="w-50 text-truncate text-muted text-left">
                    SibTotal,shipping,tax here
                  </span>
                  <span className=" w-50 text-muted text-right">₹ 200</span>
                </Col>
              );
            })}
          </Row>
          <Row className="bg-white p-3 m-4">
            <Col sm={12} className="my-2 d-flex justify-content-between">
              <h3 className=" text-truncate text-muted">Total</h3>
              <h3 className=" w-50 text-muted text-right">₹ 200</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CartCheckoutForm;
