import React from "react";
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
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
            <Row className="px-2">
              <h2>
                Dr. {profile.firstname} {profile.lastname}
              </h2>
            </Row>
            <Row className="px-2">
              {profile.specialization.map((item) => {
                return (
                  <p className="p-1 mr-2 doctor-card-button">
                    {item[0].toUpperCase() + item.slice(1)}
                  </p>
                );
              })}
            </Row>
            <Row className="px-2">
              <p>{profile.bio}</p>
            </Row>
            {profile.services.length === 0 ? (
              <></>
            ) : (
              <>
                <Row className="px-2 text-muted">
                  <h6>Services Offered</h6>
                </Row>
                <Row className="px-2 my-2">
                  <h6>
                    {profile.services
                      .map((value) => {
                        return value[0].toUpperCase() + value.slice(1);
                      })
                      .join(", ")}
                  </h6>
                </Row>
              </>
            )}
            <Row className="px-2 text-muted">
              Address:{" "}
              <span className="text-dark ml-2">{profile.address || "NA"}</span>
            </Row>
            <Row className="px-2 text-muted">
              City:{" "}
              <span className="text-dark ml-2">{profile.city || "NA"}</span>
            </Row>
            <Row className="px-2 text-muted">
              State:{" "}
              <span className="text-dark ml-2">{profile.state || "NA"}</span>
            </Row>
            <Row className="px-2 text-muted">
              Country:{" "}
              <span className="text-dark ml-2">{profile.country || "NA"}</span>
            </Row>
            <Row className="px-2 my-3">
              <h5>Clinic or Hospital</h5>
            </Row>
            <Row className="px-2">
              <h6 className="text-muted">
                Name:{" "}
                <span className="text-dark">
                  {profile.clinicInfo[0].clinicName || "NA"}
                </span>
              </h6>
            </Row>
            <Row className="px-2">
              <h6 className="text-muted">
                Address:{" "}
                <span className="text-dark">
                  {profile.clinicInfo[0].clinicAddress || "NA"}
                </span>
              </h6>
            </Row>
            <Row className="px-2">
              <h6 className="text-muted">
                Phone:{" "}
                <span className="text-dark">{profile.mobile || "NA"}</span>
              </h6>
            </Row>
            <Row className="px-2 border py-2 border-info">
              <h6 className="text-muted m-0">
                Price:{" "}
                <span className="text-dark">
                  <i class="fas fa-rupee-sign mr-1"></i>
                  {profile.price}.00
                </span>{" "}
                Per Hour
              </h6>
            </Row>

            <Row className="px-2">
              {profile.available[0].onLeave ? (
                <Alert variant="warning w-100 my-2">On Leave</Alert>
              ) : (
                <>
                  <Link
                    to={`/doctor/booking/${profile._id}`}
                    className=" align-self-start doctor-card-button py-2 my-2 px-5 book-now d-flex justify-content-center align-items-center"
                  >
                    Book Now
                  </Link>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorProfile;
