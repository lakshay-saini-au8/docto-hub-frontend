import React from "react";
import { useRouteMatch } from "react-router-dom";
import PageName from "../../../components/Reusable/PageName";
import selectPageName from "../../../components/Reusable/PageName/pageNameSelect";
import BookingForm from "../../../components/Patients/DoctorBooking";
const DoctorBooking = () => {
  const { path } = useRouteMatch();
  return (
    <div style={{ backgroundColor: "#F6F6F6" }}>
      <PageName pageName={selectPageName(path.substr(0, 15))} />
      <BookingForm />
    </div>
  );
};

export default DoctorBooking;
