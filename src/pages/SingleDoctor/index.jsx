import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DoctorProfile from "../../components/DoctorProfile";
import Loader from "../../components/Reusable/Loader";
import PageName from "../../components/Reusable/PageName";
import { getSingleProfile } from "../../utils/api";

const SingleDoctor = () => {
  const { doctorId } = useParams();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!doctorProfile) {
      setLoading(true);
      getSingleProfile("doctor", doctorId).then((res) => {
        const { data, message } = res;
        if (data) {
          setDoctorProfile(data.user);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [doctorId, doctorProfile]);
  return (
    <div>
      <PageName pageName={"Doctor Profile"} />
      {loading ? (
        <div style={{ width: "100%", height: "60vh" }}>
          <Loader />
        </div>
      ) : error ? (
        <Alert variant="danger">{error} </Alert>
      ) : (
        doctorProfile && <DoctorProfile profile={doctorProfile} />
      )}
    </div>
  );
};

export default SingleDoctor;
