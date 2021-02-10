import React, { useState, useEffect } from "react";
import { statesArray } from "./utils";
import { Col, Form, Button, Row, Badge, Alert, Image } from "react-bootstrap";
import { updateCurrentProfile } from "../../../../utils/api";
import useFormHandler from "../../../Forms/Formhandler/useFormHandler";
import { useDispatch } from "react-redux";
import "./index.css";
import { USER_LOGIN_SUCCESS } from "../../../../redux/actionTypes";
const ProfileSettingsD = ({ currentProfile, token, setCurrentProfile }) => {
  // following two states used to select services and specialisation
  // when you are loading previous data, set the services and specialization arrays to the state
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proImg, setProImg] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [clinicInfo, setClinicInfo] = useState({});
  const dispatch = useDispatch();

  const [specialization, setSpecialisation] = useState(["urology"]);
  const defaultSpecialization = [
    "urology",
    "cardiologist",
    "neurology",
    "general-physician",
    "orthopedic",
    "dentist",
  ];
  // form submit handler
  const submit = async () => {
    inputs["price"] = parseInt(inputs.price);
    inputs["specialization"] = specialization;
    inputs["services"] = services;
    inputs["clinicInfo"] = [clinicInfo];

    delete inputs["__v"];
    delete inputs["_id"];
    const finalData = new FormData();
    if (proImg) {
      finalData.append("profileImg", proImg["0"]);
    }

    finalData.append("inputs", JSON.stringify(inputs));

    setLoading(true);

    // can use above input and do api call or perform some action
    const { data, message } = await updateCurrentProfile(
      "doctor",
      token,
      finalData
    );
    if (data.user) {
      setCurrentProfile(data.user);
      const { token, user } = JSON.parse(localStorage.getItem("userInfo"));
      const userData = {
        ...user,
        firstname: data.user.firstname,
        email: data.user.email,
        profileImg: data.user.profileImg,
      };
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ token, user: userData })
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { token, user: userData },
      });
    }
    if (message) {
      setError(message);
    }
    setLoading(false);
  };

  const hangleImageChange = (e) => {
    setProImg(e.target.files);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setCurrentImg({ name: e.target.files[0].name, url: reader.result });
    };
    console.log(e.target.files[0]);
  };
  // since i am using enter key for some event, default action of submiting form on pressing enter is disabled
  const preventEnterSubmit = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  };

  // used to set the services and specialisations
  const addService = (e) => {
    if (e.which === 13 && e.target.value.trim() !== "") {
      if (e.target.name === "services") {
        setServices([...services, e.target.value]);
        e.target.value = "";
      } else {
        setSpecialisation([...specialization, e.target.value]);
        e.target.value = "";
      }
    }
  };
  const addSpecialization = (e) => {
    setSpecialisation([...specialization, e.target.value.toLowerCase()]);
    e.target.value = "Select Specializations";
  };
  // to remove services and specialization
  const removeService = (e) => {
    if (e.target.getAttribute("fromService") === "yes") {
      let newArr = [...services];
      let id = e.target.getAttribute("id");
      newArr.splice(id, 1);
      setServices([...newArr]);
    } else {
      let newArr = [...specialization];
      let id = e.target.getAttribute("id");
      newArr.splice(id, 1);
      setSpecialisation([...newArr]);
    }
  };
  // to change price shceme
  const handleselectChange = (e) => {
    if (e.target.value === "Free") {
      // eslint-disable-next-line
      setInputs((inputs) => ({
        ...inputs,
        price: 0,
      }));
    } else if (e.target.value === "Per Hour") {
      setInputs((inputs) => ({
        ...inputs,
        price: "notSet",
      }));
    }
  };
  // clinic info change
  const handleClinicInfoChange = (e) => {
    setClinicInfo({ ...clinicInfo, [e.target.name]: e.target.value });
  };
  // using custom form handler
  const {
    inputs,
    handleInputChange,
    updateProfile,
    errors,
    setInputs,
  } = useFormHandler(submit);

  useEffect(() => {
    setInputs((inputs) => ({
      ...inputs,
      ...currentProfile,
    }));
    if (currentProfile) {
      setSpecialisation(currentProfile.specialization);
      setServices(currentProfile.services);
      setClinicInfo(currentProfile.clinicInfo[0]);
    }
  }, [setInputs, currentProfile]);

  return (
    <>
      <Col lg={8} className="rounded ">
        {error && (
          <Alert variant={"danger"} className="text-center">
            {error}
          </Alert>
        )}
        <Form onSubmit={updateProfile} onKeyPress={preventEnterSubmit}>
          {/* Basic Information */}
          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">Basic Information</h4>
              {/* for image upload */}
              <Form.Row>
                {currentImg ? (
                  <div className="mx-2 mb-2">
                    <Image
                      src={currentImg.url}
                      style={{ width: "80px", height: "80px" }}
                    ></Image>
                    <Form.Text className="text-success font-weight-bolder">
                      {currentImg.name}
                    </Form.Text>
                    <Badge
                      variant="pill"
                      className="bg-danger text-white"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setProImg(null);
                        setCurrentImg(null);
                      }}
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Remove
                    </Badge>
                  </div>
                ) : (
                  <>
                    <Form.Group>
                      <label
                        htmlFor="file-upload"
                        className="file-upload-label"
                      >
                        <i className="fas fa-upload mr-2"></i> Upload Photo
                      </label>
                      <Form.Text className="">
                        <small>Allowed JPG, GIF or PNG. Max size of 2MB</small>
                      </Form.Text>
                      <input
                        id="file-upload"
                        type="file"
                        className="file-upload"
                        name="profileImg"
                        onChange={hangleImageChange}
                      />
                    </Form.Group>
                  </>
                )}
              </Form.Row>
              {/*  first name and lst name*/}
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridFname">
                  <Form.Label>First Name</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  {errors.firstname ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.firstname}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstname"
                    onChange={handleInputChange}
                    value={inputs.firstname || ""}
                    className={errors.firstname ? "border border-danger" : ""}
                  />
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridlastname">
                  <Form.Label>Last Name</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  {errors.lastname ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.lastname}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    onChange={handleInputChange}
                    value={inputs.lastname || ""}
                    className={errors.lastname ? "border border-danger" : ""}
                  />
                </Form.Group>
              </Form.Row>
              {/*  email and phone number*/}
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridemail">
                  <Form.Label>Email</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    disabled
                    value={inputs.email || ""}
                  />
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridmobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  {errors.mobile ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.mobile}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="tel"
                    placeholder="Mobile Number"
                    name="mobile"
                    onChange={handleInputChange}
                    value={inputs.mobile || ""}
                    className={errors.mobile ? "border border-danger" : ""}
                  />
                </Form.Group>
              </Form.Row>
              {/*  Dob and sex*/}
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridDob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Select DOB"
                    name="dateofbirth"
                    onChange={handleInputChange}
                    value={inputs.dateofbirth || ""}
                  />
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridBloodGroup">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    onChange={handleInputChange}
                    defaultValue={inputs.bloodgroup && "Select"}
                  >
                    <option disabled>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>

          {/* About ME */}

          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">About Me</h4>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Biography</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  onChange={handleInputChange}
                  value={inputs.bio || ""}
                  name="bio"
                />
              </Form.Group>
            </Col>
          </Row>

          {/*  Contact details*/}

          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">Contact Details</h4>
              {/* address */}
              <Form.Row>
                <Form.Group as={Col} controlId="formGridaddress">
                  <Form.Label>Address</Form.Label>
                  {errors.address ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.address}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    onChange={handleInputChange}
                    value={inputs.address || ""}
                  />
                </Form.Group>
              </Form.Row>
              {/* city and state */}
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridcity">
                  <Form.Label>City</Form.Label>
                  {errors.city ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.city}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Enter CityName"
                    name="city"
                    onChange={handleInputChange}
                    value={inputs.city || ""}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formGridstate">
                  <Form.Label>State</Form.Label>
                  {errors.state ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.state}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    as="select"
                    name="gender"
                    onChange={handleInputChange}
                    defaultValue={inputs.state && "Select"}
                  >
                    <option disabled>Select</option>
                    {statesArray.map((state) => {
                      return <option key={state}>{state}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              {/* country and zipcode */}
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridcountry">
                  <Form.Label>Country</Form.Label>
                  {errors.country ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.country}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    name="country"
                    onChange={handleInputChange}
                    value={inputs.country || ""}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formGridpincode">
                  <Form.Label>Pin-Code</Form.Label>
                  {errors.zipcode ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.zipcode}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="tel"
                    placeholder="Enter Pin-Code"
                    name="zipcode"
                    onChange={handleInputChange}
                    value={inputs.zipcode || ""}
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
          {/* Clinic Information */}

          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">Clinic Or Hospital</h4>
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridclinicName">
                  <Form.Label>Name Of Clinic</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter Clinic/Hospital Name"
                    name="clinicName"
                    onChange={handleClinicInfoChange}
                    value={clinicInfo.clinicName || ""}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formGridclinicAddress">
                  <Form.Label>Clinic Address</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter Clinic Address"
                    name="clinicAddress"
                    onChange={handleClinicInfoChange}
                    value={clinicInfo.clinicAddress || ""}
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
          {/* pricing info */}

          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">Pricing Details</h4>
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridprice">
                  <Form.Label>Scheme</Form.Label>
                  <Form.Control
                    as="select"
                    name="priceSheme"
                    onChange={handleselectChange}
                    value={
                      !inputs.price
                        ? "Free"
                        : inputs.price === 0
                        ? "Free"
                        : "Per Hour"
                    }
                  >
                    <option disabled>Select</option>
                    <option>Free</option>
                    <option>Per Hour</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridpriceAmount">
                  <Form.Label>Amount</Form.Label>
                  {errors.price ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.price}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    disabled={
                      !inputs.price ? true : inputs.price === 0 ? true : false
                    }
                    onChange={handleInputChange}
                    value={
                      inputs.price === "notSet"
                        ? ""
                        : !inputs.price
                        ? 0
                        : inputs.price
                    }
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
          {/* Services and specialization */}
          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">Services And Specialization</h4>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridservices">
                  <Form.Label>Services</Form.Label>
                  {services.length === 0 || (
                    <Form.Text>Currently Selected:</Form.Text>
                  )}
                  <Row
                    className={`${services.length === 0 ? "" : "px-3 py-1"}`}
                  >
                    {services.map((service, index) => (
                      <Badge
                        pill
                        variant="light"
                        key={index}
                        id={index}
                        fromService={"yes"}
                        className="m-1 border border-dark align-middle"
                        style={{ cursor: "pointer", letterSpacing: "1px" }}
                        onClick={removeService}
                      >
                        {service.toString()}{" "}
                        <i
                          className="fas fa-minus-circle text-danger"
                          fromService={"yes"}
                          id={index}
                        ></i>
                      </Badge>
                    ))}
                  </Row>
                  {errors.services ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.services}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Enter Services"
                    name="services"
                    onKeyPress={addService}
                    autoComplete={"off"}
                  />
                  <Form.Text className="text-warning font-weight-bold">
                    Note: Type one Service and press ENTER to add
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridspecializaton">
                  <Form.Label>Specializations</Form.Label>
                  {specialization.length === 0 || (
                    <Form.Text>Currently Selected:</Form.Text>
                  )}
                  <Row
                    className={`${
                      specialization.length === 0 ? "" : "px-3 py-1"
                    }`}
                  >
                    {specialization.map((spec, index) => (
                      <Badge
                        pill
                        variant="light"
                        key={index}
                        id={index}
                        className="m-1 border border-dark align-middle"
                        style={{ cursor: "pointer", letterSpacing: "1px" }}
                        onClick={removeService}
                      >
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}{" "}
                        <i
                          className="fas fa-minus-circle text-danger"
                          id={index}
                        ></i>
                      </Badge>
                    ))}
                  </Row>
                  {errors.specialization ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.specialization}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <Form.Control
                    type="select"
                    placeholder="Enter Specializations"
                    name="specialization"
                    onKeyPress={addService}
                    autoComplete={"off"}
                  ></Form.Control> */}
                  <Form.Control
                    as="select"
                    defaultValue="Select Specializations"
                    onChange={addSpecialization}
                    name="specialization"
                  >
                    <option disabled>Select Specializations</option>
                    {defaultSpecialization.map((spec) => {
                      return specialization.includes(spec) ? (
                        <option
                          disabled
                          className="text-white"
                          style={{ backgroundColor: "#CCCCCC" }}
                          key={spec}
                        >
                          {spec.charAt(0).toUpperCase() + spec.slice(1)}
                        </option>
                      ) : (
                        <option key={spec}>
                          {spec.charAt(0).toUpperCase() + spec.slice(1)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
          {Object.keys(errors).length !== 0 && (
            <Form.Text className="text-danger font-weight-bold m-2">
              <i className="fas fa-exclamation-circle"></i> Fill All Required
              Fields Before Submitting
            </Form.Text>
          )}
          {loading ? (
            <Button
              variant="primary"
              className="mb-4 text-white"
              size="lg"
              disabled
            >
              Updating
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              className="mb-4 text-white"
              size="lg"
            >
              Save Changes
            </Button>
          )}
        </Form>
      </Col>
    </>
  );
};

export default ProfileSettingsD;
