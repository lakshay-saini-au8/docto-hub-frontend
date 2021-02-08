import { useEffect, useState } from "react";

import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllTopDoctor } from "../../../utils/api";
import DoctorProfileCard from "../../Reusable/DoctorProfileCard";
import ErrorMessage from "../../Reusable/ErrorMessage";
import CustomLoader from "../../Reusable/CustomLoader";
import "./index.css";
const OurDoctors = () => {
  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!doctors) {
      setLoading(true);
      getAllTopDoctor().then((res) => {
        const { data, message } = res;
        if (data) {
          setDoctors(data.user);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [doctors]);

  return (
    <Container className="mt-5">
      <Row className="mb-2 mb-md-5 ">
        <h2 className="w-100 text-center ">Book Our Best Doctors</h2>
      </Row>
      <Row>
        {loading ? (
          <>
            <CustomLoader size={50} color={"#09dca4"} />
          </>
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          doctors &&
          doctors.map((doctor) => (
            <DoctorProfileCard md={4} xl={3} doctor={doctor} />
          ))
        )}
      </Row>
      <Row className=" mt-2 mb-2 mb-md-5">
        <Link to="/doctors" className="m-auto py-3 px-4 view-more-doctors">
          View More
        </Link>
      </Row>
    </Container>
  );
};

export default OurDoctors;
