import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { defaultSpecializations } from "./utils";
import { Col, Row, Button } from "react-bootstrap";

import "./index.css";
import { getAllDoctor } from "../../../utils/api";
const FilterSide = ({ setDoctors, setLoading, setError }) => {
  const { search } = useLocation();
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState(
    `${search.slice(3) || ""}`
  );

  const changeGender = (e) => {
    let optionName = e.target
      .closest(".custom-option")
      .getAttribute("optionname");
    if (optionName === gender) {
      setGender("");
    } else {
      setGender(optionName);
    }
  };

  const changeSpecialization = (e) => {
    let optionName = e.target
      .closest(".custom-option")
      .getAttribute("optionname");
    if (optionName === specialization) {
      setSpecialization("");
    } else {
      setSpecialization(optionName);
    }
  };

  const handleSearch = (e) => {
    let filters = {};
    if (gender !== "") {
      filters["gender"] = gender;
    }
    if (specialization !== "") {
      filters["specialization"] = specialization;
    }
    if (search) {
      history.push("/doctors");
    }
    setLoading(true);
    getAllDoctor(filters).then((res) => {
      const { data, message } = res;
      if (data) {
        setDoctors(data.user);
      }
      if (message) {
        setError(message);
      }
      setLoading(false);
    });
  };

  return (
    <Col lg={3} className="rounded filter-container">
      <Row className="m-3 bg-white p-3">
        <h5>Search Filters</h5>
      </Row>
      <Row className="m-3 bg-white p-3">
        <Col className="px-0">
          <h6>Gender</h6>
          <div
            className="custom-option disable-select"
            optionname="male"
            onClick={changeGender}
          >
            <div className="mr-2 check-box">
              {gender === "male" ? <i className="fas fa-check"></i> : <></>}
            </div>
            <div className="text-muted">Male</div>
          </div>
          <div
            className="custom-option disable-select"
            optionname="female"
            onClick={changeGender}
          >
            <div className="mr-2 check-box">
              {gender === "female" ? <i className="fas fa-check"></i> : <></>}
            </div>
            <div className="text-muted">Female</div>
          </div>
        </Col>
      </Row>
      <Row className="m-3 bg-white p-3">
        <Col className="px-0">
          <h6>Specialization</h6>
          {defaultSpecializations.map((spec) => {
            return (
              <div
                className="custom-option disable-select"
                optionname={`${spec}`}
                onClick={changeSpecialization}
              >
                <div className="mr-2 check-box">
                  {specialization === spec ? (
                    <i className="fas fa-check"></i>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="text-muted">
                  {spec[0].toUpperCase() + spec.slice(1)}
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row className="m-3 p-3 bg-white">
        <Button
          type={"button"}
          size="lg"
          className="w-100 text-white font-weight-bold search-filter-button"
          onClick={handleSearch}
        >
          Apply Filters
        </Button>
      </Row>
    </Col>
  );
};

export default FilterSide;
