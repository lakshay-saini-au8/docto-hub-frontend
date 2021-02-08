import { Col, Row } from "react-bootstrap";
import Today from "./Today";
import "./index.css";
const DashboardIndexD = () => {
  return (
    <Col lg={8} className="rounded px-0">
      <Row className="p-3 m-3 bg-white">
        <Col sm={12} className="p-3">
          <div
            className={`text-center p-3 my-2 font-weight-bolder tab-buttons current`}
          >
            All Booking
          </div>
        </Col>

        <Col>
          <Today />
        </Col>
      </Row>
    </Col>
  );
};

export default DashboardIndexD;
