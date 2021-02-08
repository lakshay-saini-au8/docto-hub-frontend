import { useCallback, useEffect, useState } from "react";
import PageName from "../../components/Reusable/PageName";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import selectPageName from "../../components/Reusable/PageName/pageNameSelect";
import DashBoardSide from "../../components/Dashboard/DashboardSide";
import ChangePassword from "../../components/Forms/ChangePassword";

//patient components
import DashboardIndexP from "../../components/Dashboard/Patient/Index";
import ProfileSettingsP from "../../components/Dashboard/Patient/ProfileSettings";
// doctor components
import DashboardIndexD from "../../components/Dashboard/Doctor/Index";
import ProfileSettingsD from "../../components/Dashboard/Doctor/ProfileSettings";
import ScheduleTimings from "../../components/Dashboard/Doctor/Schedule";
import DoctorsBookings from "../../components/Dashboard/Doctor/DoctorBookings";

import { useUserInfo } from "../../customHooks";
import { getCurrentProfile } from "../../utils/api";
const DashBoard = ({ match }) => {
  const { user, token } = useUserInfo();
  const { role } = user;
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getProfile = useCallback(async () => {
    setLoading(true);
    const { data, message } = await getCurrentProfile(role, token);
    if (message) {
      setError(message);
    } else {
      setCurrentProfile(data.user);
    }
    if (user) {
    }

    setLoading(false);
  }, [role, token, user]);
  useEffect(() => {
    if (!currentProfile && !error) {
      getProfile();
    }
  }, [currentProfile, getProfile, error]);

  return (
    <div>
      <PageName pageName={selectPageName(match.params.subRoute)} />
      <Container
        fluid
        className="pt-4"
        style={{ backgroundColor: "#dddddd40" }}
      >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner
              animation="border"
              style={{ width: "3rem", height: "3rem" }}
              color="primary"
            />
          </div>
        ) : error ? (
          <Alert variant={"danger"} className="text-center">
            {error}
          </Alert>
        ) : (
          <Row>
            <DashBoardSide
              style={{ backgroundColor: "#15558D" }}
              currentUser={currentProfile}
              setCurrentProfile={setCurrentProfile}
              token={token}
              role={role}
            />
            {match.params.subRoute === "index" ? (
              role === "patient" ? (
                <DashboardIndexP />
              ) : (
                <DashboardIndexD />
              )
            ) : match.params.subRoute === "profile" ? (
              role === "patient" ? (
                <ProfileSettingsP
                  currentProfile={currentProfile}
                  setCurrentProfile={setCurrentProfile}
                  token={token}
                />
              ) : (
                <ProfileSettingsD
                  currentProfile={currentProfile}
                  setCurrentProfile={setCurrentProfile}
                  token={token}
                />
              )
            ) : match.params.subRoute === "schedule-timings" ? (
              <ScheduleTimings
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                token={token}
              />
            ) : match.params.subRoute === "change-password" ? (
              <ChangePassword />
            ) : match.params.subRoute === "your-bookings" ? (
              <DoctorsBookings />
            ) : (
              <></>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DashBoard;
