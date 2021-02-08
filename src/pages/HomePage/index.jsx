import React from "react";
import { Container } from "react-bootstrap";

import WelcomeComp from "../../components/HomePageComponents/WelcomeComp";
import LookingFor from "../../components/HomePageComponents/LookingFor";
import BrowseByCategory from "../../components/HomePageComponents/BrowseByCategory";
import OurDoctors from "../../components/HomePageComponents/OurDoctors";
const HomePage = () => {
  return (
    <Container fluid className="m-0 p-0">
      <WelcomeComp />
      <LookingFor />
      <BrowseByCategory />
      <OurDoctors />
    </Container>
  );
};

export default HomePage;
