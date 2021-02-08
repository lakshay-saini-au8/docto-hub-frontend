import React from "react";
import { Col, Row, Image, Card } from "react-bootstrap";
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
            ></Image>
            <Card.Title className="doctor-card-title mt-3">
              {doctor.firstname} {doctor.lastname}
            </Card.Title>
          </Link>
          <Card.Subtitle className="text-muted my-1 text-truncate">
            {doctor.specialization.length === 0
              ? "NA"
              : doctor.specialization.join(", ")}
          </Card.Subtitle>
          <small className="text-muted my-1">
            <i className="fas fa-money-bill mr-1"></i>
            {doctor.price}
          </small>
          <small className=" text-muted my-1">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {doctor.state || "NA"}, {doctor.country || "NA"}
          </small>
          <Row className="px-2 flex-column flex-lg-row   ">
            <Col
              as={Link}
              to={`/doctor/profile/${doctor._id}`}
              className="doctor-card-button py-1 my-1 m-lg-1 d-flex justify-content-center align-items-center"
            >
              View Profile
            </Col>
            <Col
              as={Link}
              to={`/doctor/booking/${doctor._id}`}
              className="doctor-card-button py-1 my-1 m-lg-1 book-now d-flex justify-content-center align-items-center"
            >
              Book Now
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default DoctorProfileCard;
