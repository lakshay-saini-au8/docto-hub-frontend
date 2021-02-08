import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const DoctorProfile = ({ profile }) => {
  return (
    <>
      <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
        <Row>
          <Col md={4}>
            <Image src={profile.profileImg[0].url} fluid className="w-100" />
          </Col>
          <Col md={8} className="px-md-5 py-md-0 pb-5 px-4 py-5">
            <Row>
              <Col>
                <Row className="flex-column">
                  <h2>
                    Dr. {profile.firstname} {profile.lastname}
                  </h2>
                  <div className="d-flex">
                    {profile.specialization.map((item) => (
                      <p className="p-1 mr-2 doctor-card-button">
                        {item[0].toUpperCase() + item.slice(1)}
                      </p>
                    ))}
                  </div>
                  <div className="d-flex">
                    <p className="pt-1 ">{profile.bio}</p>
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="pt-1 font-weight-bold">
                      Clinic Or Hospital
                    </h5>
                    <div className="d-flex">
                      <p style={{ marginBottom: 0 }}>
                        <span className="font-weight-bold">Name: </span>
                        <small>
                          {profile.clinicInfo[0].clinicName || "NA"}
                        </small>
                      </p>
                    </div>
                    <div className="d-flex">
                      <p style={{ marginBottom: 0 }}>
                        <span className="font-weight-bold">Address: </span>
                        <small>
                          {profile.clinicInfo[0].clinicAddress || "NA"}
                        </small>
                      </p>
                    </div>
                  </div>
                  <p className="text-muted my-1">
                    <i className="fas fa-money-bill mr-2"></i>
                    <i class="fas fa-rupee-sign"></i>
                    {profile.price} per hour
                  </p>
                  <p className="text-muted my-1">
                    <i class="fas fa-phone-volume mr-2"></i>
                    {profile.mobile}
                  </p>
                  <p className=" text-muted my-1">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {profile.address || "NA"}, {profile.state || "NA"},{" "}
                    {profile.country || "NA"}
                  </p>
                  <Link
                    to={`/doctor/booking/${profile._id}`}
                    className=" align-self-start doctor-card-button py-2 my-2 px-5 book-now d-flex justify-content-center align-items-center"
                  >
                    Book Now
                  </Link>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorProfile;
