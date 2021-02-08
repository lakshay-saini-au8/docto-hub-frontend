import { useState, useEffect } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
// image imports
import urology from "../../../assets/kidney.svg";
import doctor from "../../../assets/doctor.svg";
import cardiology from "../../../assets/heart.svg";
import ortho from "../../../assets/joint.svg";
import nuero from "../../../assets/neurology.svg";
import dental from "../../../assets/tooth.svg";
import { categoryStats } from "../../../utils/api";
import ErrorMessage from "../../Reusable/ErrorMessage";
const BrowseByCategory = () => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    if (Object.keys(stats).length === 0) {
      categoryStats().then((res) => {
        const { stats, message } = res;

        if (stats) {
          setStats(stats);
        }
        if (message) {
          setError(message);
        }
      });
    }
  }, [stats]);
  return (
    <Container>
      <Row>
        <h2 className="w-100 text-center">Browse By Category</h2>
      </Row>
      {error && <ErrorMessage error={error} />}
      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card
            className="m-auto w-100 h-100 d-flex flex-column justify-content-center align-items-center browse-category-card"
            as={Link}
            to="/doctors?q=general-physician"
          >
            <Card.Body>
              <Card.Img
                src={doctor}
                style={{ width: "50%", marginLeft: "25%" }}
              ></Card.Img>
              <Card.Title className="text-center">General Physician</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {stats["general-physician"]} Doctors
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="m-auto w-100 h-100 d-flex flex-column justify-content-center align-items-center browse-category-card"
            as={Link}
            to="/doctors?q=urology"
          >
            <Card.Body>
              <Card.Img
                src={urology}
                style={{ width: "50%", marginLeft: "25%" }}
              ></Card.Img>
              <Card.Title className="text-center">Urology</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {stats.urology} Doctors
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="m-auto w-100 h-100 d-flex flex-column justify-content-center align-items-center browse-category-card"
            as={Link}
            to="/doctors?q=cardiologist"
          >
            <Card.Body>
              <Card.Img
                src={cardiology}
                style={{ width: "50%", marginLeft: "30%" }}
              ></Card.Img>
              <Card.Title className="text-center">Cardiology</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {stats.cardiologist} Doctors
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="m-auto w-100 h-100 d-flex flex-column justify-content-center align-items-center browse-category-card"
            as={Link}
            to="/doctors?q=orthopedic"
          >
            <Card.Body>
              <Card.Img
                src={ortho}
                style={{ width: "50%", marginLeft: "29%" }}
              ></Card.Img>
              <Card.Title className="text-center">Orthopedic</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {stats.orthopedic} Doctors
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="m-auto w-100 h-100 d-flex flex-column justify-content-center align-items-center browse-category-card"
            as={Link}
            to="/doctors?q=neurology"
          >
            <Card.Body>
              <Card.Img
                src={nuero}
                style={{ width: "50%", marginLeft: "25%" }}
              ></Card.Img>
              <Card.Title className="text-center">Neurology</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {stats.neurology} Doctors
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="m-auto w-100 h-100 d-flex flex-column justify-content-center align-items-center browse-category-card"
            as={Link}
            to="/doctors?q=dentist"
          >
            <Card.Body>
              <Card.Img
                src={dental}
                style={{ width: "50%", marginLeft: "25%" }}
              ></Card.Img>
              <Card.Title className="text-center">Dentist</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {stats.dentist} Doctors
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BrowseByCategory;
