import { Col, Row } from "react-bootstrap";
import DoctorProfileCard from "../../Reusable/DoctorProfileCard";
import ErrorMessage from "../../Reusable/ErrorMessage";
import Loader from "../../Reusable/Loader";

const AllDocto = ({ loading, error, doctors }) => {
  return (
    <Col md={12} lg={9} className="rounded ">
      <Row className=" m-sm-0 bg-white  p-3">
        {loading ? (
          <div style={{ width: "100%", height: "50vh" }}>
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          doctors &&
          doctors.map((doctor) => (
            <DoctorProfileCard md={4} doctor={doctor} key={doctor._id} />
          ))
        )}
      </Row>
    </Col>
  );
};

export default AllDocto;
