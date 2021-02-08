import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./index.css";

import Appointments from "./Appointments";

const DoctorsBookings = () => {
  const [current, setCurrent] = useState("appointments");
  const clickHandler = (e) => {
    setCurrent(e.target.getAttribute("name"));
  };
  return (
    <Col lg={8} className="m-3 rounded p-3 bg-white">
      <Row className="px-3">
        <Col
          lg={3}
          className={`text-center font-weight-bolder py-1 py-lg-3 m-0 tab-links ${
            current === "appointments" ? "current" : ""
          }`}
          name="appointments"
          onClick={clickHandler}
        >
          Appointments
        </Col>
        <Col
          lg={3}
          className={`text-center font-weight-bolder py-1 py-lg-3 m-0 tab-links ${
            current === "prescriptions" ? "current" : ""
          }`}
          name="prescriptions"
          onClick={clickHandler}
        >
          Prescriptions
        </Col>
        <Col
          lg={3}
          className={`text-center font-weight-bolder py-1 py-lg-3 m-0 tab-links ${
            current === "medicalRecords" ? "current" : ""
          }`}
          name="medicalRecords"
          onClick={clickHandler}
        >
          Medical Records
        </Col>
        <Col
          lg={3}
          className={`text-center font-weight-bolder py-1 py-lg-3 m-0 tab-links ${
            current === "billing" ? "current" : ""
          }`}
          name="billing"
          onClick={clickHandler}
        >
          Billing
        </Col>
        <Col>
          <Appointments />
        </Col>
      </Row>
    </Col>
  );
};

export default DoctorsBookings;
