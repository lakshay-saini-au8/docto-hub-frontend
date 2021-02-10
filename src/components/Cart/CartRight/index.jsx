import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const CartRight = ({ details }) => {
  return (
    <>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Total Items{" "}
          <span className="text-dark font-weight-bolder">{details.qty}</span>
        </Col>
      </Row>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Sub Total{" "}
          <span className="text-dark font-weight-bolder">
            ₹ {details.subTotal}
          </span>
        </Col>
      </Row>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Shipping Cost{" "}
          <span className="text-dark font-weight-bolder">
            ₹ {details.shipping}
          </span>
        </Col>
      </Row>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Tax{" "}
          <span className="text-dark font-weight-bolder">₹ {details.tax}</span>
        </Col>
      </Row>
      <Row className="my-2 px-3 font-weight-bold text-muted">
        <Col
          className="w-100 p-0 pt-2 d-flex justify-content-between"
          style={{
            fontSize: "20px",
            borderTop: "2px solid black",
          }}
        >
          Total{" "}
          <span className="text-dark font-weight-bolder">
            ₹ {details.total}
          </span>
        </Col>
      </Row>
      <Row className="my-2 px-3 font-weight-bold text-muted">
        <Link to="/medicines/checkout" className=" w-100">
          <Button
            as={Col}
            variant={"info"}
            className="font-weight-bold mt-3 py-2"
          >
            Proceed To Checkout
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default CartRight;
