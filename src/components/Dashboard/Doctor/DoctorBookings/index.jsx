import React from "react";
import { Col, Row } from "react-bootstrap";
import "./index.css";

import Appointments from "./Appointments";

const DoctorsBookings = () => {
  return (
    <Col lg={8} className="px-0 rounded  ">
      <Row className=" p-3 m-3 bg-white ">
        <Col
          sm={12}
          className={`text-center font-weight-bolder py-1 py-lg-3 m-0 tab-links current `}
        >
          Appointments
        </Col>

        <Col>
          <Appointments />
        </Col>
      </Row>
    </Col>
  );
};

export default DoctorsBookings;
