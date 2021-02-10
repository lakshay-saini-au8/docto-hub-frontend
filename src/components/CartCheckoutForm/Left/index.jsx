import React, { useState, useEffect } from "react";
import useFormHandler from "../../../components/Forms/Formhandler/useFormHandler";
import {
  Container,
  Row,
  Image,
  Form,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
// import { Link, useHistory, useParams } from "react-router-dom";
const CheckOutform = () => {
  const submit = async () => {
    console.log(inputs);
  };

  // using custom form handler
  const {
    inputs,
    handleInputChange,
    placeOrder,
    errors,
    setInputs,
  } = useFormHandler(submit);

  useEffect(() => {}, []);

  return (
    <Row className="d-flex justify-content-between align-items-start">
      <Col>
        <Form onSubmit={placeOrder}>
          {/* date and time */}
          <Row className="bg-white px-3 py-3 my-2 rounded">
            <h5>Order Details</h5>
            <Form.Row className="w-100"></Form.Row>
          </Row>
          {/* personale information */}
          <Row className="bg-white px-3 py-3 my-2 rounded">
            <h5>Buyer Information</h5>
            <Form.Row className="w-100">
              {/* fname */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="fname"
              >
                <Form.Label>First Name</Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  name="firstname"
                  className={errors.firstname ? "border border-danger" : ""}
                  value={inputs.firstname || ""}
                ></Form.Control>
                {errors.firstname ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.firstname}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
              {/* lname */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="lname"
              >
                <Form.Label>Last Name</Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  name="lastname"
                  className={errors.lastname ? "border border-danger" : ""}
                  value={inputs.lastname || ""}
                ></Form.Control>
                {errors.lastname ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.lastname}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row className="w-100">
              {/* email */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="email"
              >
                <Form.Label>Email </Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  name="email"
                  className={errors.email ? "border border-danger" : ""}
                  value={inputs.email || ""}
                ></Form.Control>
                {errors.email ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.email}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
              {/* phone */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="phone"
              >
                <Form.Label>Phone</Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="tel"
                  name="mobile"
                  value={inputs.mobile || ""}
                  className={errors.mobile ? "border border-danger" : ""}
                ></Form.Control>
                {errors.mobile ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.mobile}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Form.Row>
          </Row>
          {/* address , city,postalCode,country */}
          {/* Shipping Address information */}
          <Row className="bg-white px-3 py-3 my-2 rounded">
            <h5>Shipping Details</h5>
            <Form.Row className="w-100">
              {/* fname */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="addressShip"
              >
                <Form.Label>Address</Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  name="address"
                  className={errors.address ? "border border-danger" : ""}
                  value={inputs.address || ""}
                ></Form.Control>
                {errors.address ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.address}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
              {/* lname */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="city"
              >
                <Form.Label>City</Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  name="city"
                  className={errors.city ? "border border-danger" : ""}
                  value={inputs.city || ""}
                ></Form.Control>
                {errors.city ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.city}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row className="w-100">
              {/* email */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="postal"
              >
                <Form.Label>Postal Code </Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="number"
                  name="postalCode"
                  className={errors.postalCode ? "border border-danger" : ""}
                  value={inputs.postalCode || ""}
                ></Form.Control>
                {errors.postalCode ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.postalCode}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
              {/* phone */}
              <Form.Group
                className="w-100"
                sm={12}
                md={6}
                as={Col}
                controlId="country"
              >
                <Form.Label>Country</Form.Label>
                <small className="ml-1 text-danger font-weight-bold align-top">
                  *
                </small>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  name="country"
                  className={errors.country ? "border border-danger" : ""}
                  value={inputs.country || ""}
                ></Form.Control>
                {errors.country ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.country}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Form.Row>
          </Row>
          {/* payment method */}
          <Row className="bg-white px-3 py-3 my-2 rounded">
            <h5>Payment Method</h5>
            <Form.Row className="w-100">
              <Form.Group as={Col} md={6} controlId="formGridtimeslots">
                <Form.Label>Select a payment method</Form.Label>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  label="Paypal"
                  className="my-2"
                  onChange={handleInputChange}
                  value="paypal"
                />
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  id="payonspot"
                  label="Pay On Spot"
                  className="my-2"
                  onChange={handleInputChange}
                  value="payonspot"
                />
              </Form.Group>
              {errors.paymentMethod ? (
                <>
                  <small className="ml-1 text-danger">
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {errors.paymentMethod}
                  </small>
                </>
              ) : (
                <></>
              )}
            </Form.Row>
          </Row>
          <Row>
            {"inputs.paymentMethod" === "paypal" && "showButton" ? (
              <>
                {/* {
                  <PayPalButton
                    amount={
                      "doctorProfile.price" === 0
                        ? "0.01"
                        : "doctorProfile.price"
                    }
                    onSuccess={"placeOrder"}
                    options={{
                      currency: "INR",
                    }}
                  />
                } */}
              </>
            ) : (
              <Button className="text-white m-0" type="submit" size="lg">
                Place Order
              </Button>
            )}
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CheckOutform;
