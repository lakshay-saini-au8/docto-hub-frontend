import React from "react";
import { Container, Image } from "react-bootstrap";
import docOndesk from "../../../assets/docondesk.svg";
import docthings from "../../../assets/docthings.svg";
import goldengate from "../../../assets/goldengate.svg";
import "./index.css";
const WelcomeComp = () => {
  return (
    <Container fluid className="p-0 welcome-container mb-5 pt-2">
      <Image src={docOndesk} className="welcome-right-img "></Image>
      <h1 className=" text-center font-weight-bolder ">
        Search Doctor, Make an Appointment, Buy Medicines
      </h1>
      <h5 className="text-muted   text-center ">
        Discover the best doctors, clinic & buy medicines at few clicks.
      </h5>
      <Image src={goldengate} className="welcome-center-img "></Image>
      <Image src={docthings} className="welcome-left-img "></Image>
    </Container>
  );
};

export default WelcomeComp;
