import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AllDocto from "../../components/Doctors/AllDocto";
import FilterSide from "../../components/Doctors/FilterSide";
import PageName from "../../components/Reusable/PageName";
import selectPageName from "../../components/Reusable/PageName/pageNameSelect";
import { getAllDoctor } from "../../utils/api";

const AllDoctor = () => {
  const { search } = useLocation();
  let q = {};
  if (search) {
    q["specialization"] = search.split("=")[1];
  }

  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!doctors) {
      setLoading(true);
      getAllDoctor(q).then((res) => {
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
    <div>
      <PageName pageName={selectPageName("doctors")} />
      <Container
        fluid
        className="pt-4"
        style={{ backgroundColor: "#dddddd40" }}
      >
        <Row>
          <FilterSide
            setDoctors={setDoctors}
            setLoading={setLoading}
            setError={setError}
          />
          <AllDocto doctors={doctors} loading={loading} error={error} />
        </Row>
      </Container>
    </div>
  );
};

export default AllDoctor;
