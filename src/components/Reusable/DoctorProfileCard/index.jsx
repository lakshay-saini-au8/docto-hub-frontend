import React from "react";
import {
  Col,
  Row,
  Image,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
const DoctorProfileCard = ({ doctor, md, lg, xl }) => {
  return (
    <>
      <Col sm={6} md={md} xl={xl} lg={lg} className="mb-2 p-3">
        <Card className="p-3 doctor-card">
          <Link to={`/doctor/profile/${doctor._id}`}>
            <Image
              src={doctor.profileImg[0].url}
              className="doctor-card-img"
              style={{ height: "230px", width: "100%" }}
            ></Image>
            <Card.Title
              className="doctor-card-title my-2 pb-1 text-truncate"
              style={{ fontSize: "120%" }}
            >
              Dr. {doctor.firstname} {doctor.lastname}
            </Card.Title>
          </Link>

          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="tooltip">
                {doctor.specialization.length === 0
                  ? "NA"
                  : doctor.specialization
                      .map((value) => {
                        return value[0].toUpperCase() + value.slice(1);
                      })
                      .join(", ")}
              </Tooltip>
            }
          >
            <Card.Subtitle className="text-muted my-1 text-truncate">
              {doctor.specialization.length === 0
                ? "NA"
                : doctor.specialization
                    .map((value) => {
                      return value[0].toUpperCase() + value.slice(1);
                    })
                    .join(", ")}
            </Card.Subtitle>
          </OverlayTrigger>
          <p className="text-muted my-1 text-truncate">
            <i className="fas fa-money-bill mr-1"></i> ₹ {doctor.price}
          </p>
          <p className=" text-muted my-1 text-truncate">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {doctor.state || "NA"}, {doctor.country || "NA"}
          </p>
          <Row className="px-2 flex-column flex-lg-row   ">
            <Col
              as={Link}
              to={`/doctor/profile/${doctor._id}`}
              className="doctor-card-button py-1 my-1  d-flex justify-content-center align-items-center"
              md={12}
            >
              View Profile
            </Col>
            {doctor.available[0].onLeave ? (
              <>
                <Col
                  className="py-1 my-1 on-leave d-flex justify-content-center align-items-center"
                  md={12}
                >
                  On Leave
                </Col>
              </>
            ) : (
              <>
                <Col
                  as={Link}
                  to={`/doctor/booking/${doctor._id}`}
                  className="doctor-card-button py-1 my-1  book-now d-flex justify-content-center align-items-center"
                  md={12}
                >
                  Book Now
                </Col>
              </>
            )}
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default DoctorProfileCard;
