import React, { useEffect, useState } from "react";
import { Col, Form, Button, Alert, Image, Badge } from "react-bootstrap";
import { updateCurrentProfile } from "../../../../utils/api";
import useFormHandler from "../../../Forms/Formhandler/useFormHandler";
import { useDispatch } from "react-redux";
import "./index.css";
import { USER_LOGIN_SUCCESS } from "../../../../redux/actionTypes";
const ProfileSettingsP = ({ currentProfile, token, setCurrentProfile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [proImg, setProImg] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);

  // form submit handler
  const submit = async () => {
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
      "patient",
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
  };
  // using custom form handler
  const {
    inputs,
    handleInputChange,
    updateProfile,
    setInputs,
    errors,
  } = useFormHandler(submit);

  useEffect(() => {
    setInputs((inputs) => ({
      ...inputs,
      ...currentProfile,
    }));
  }, [setInputs, currentProfile]);

  return (
    <Col lg={8} className=" m-3 bg-white rounded p-3">
      {error && (
        <Alert variant={"danger"} className="text-center">
          {error}
        </Alert>
      )}
      <Form onSubmit={updateProfile}>
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
                <label htmlFor="file-upload" className="file-upload-label">
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

        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridFname">
            <Form.Label>First Name</Form.Label>
            <small className="ml-1 text-danger align-top">*</small>
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

          <Form.Group as={Col} md={6} controlId="formGridLname">
            <Form.Label>Last Name</Form.Label>
            <small className="ml-1 text-danger align-top">*</small>
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
            <Form.Label>Blood Group</Form.Label>
            <Form.Control
              as="select"
              name="bloodgroup"
              onChange={handleInputChange}
              defaultValue={inputs.bloodgroup && "Select"}
            >
              <option disabled>Select</option>
              <option>A-</option>
              <option>A+</option>
              <option>B-</option>
              <option>B+</option>
              <option>AB-</option>
              <option>AB+</option>
              <option>O-</option>
              <option>O+</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridemail">
            <Form.Label>Email</Form.Label>
            <small className="ml-1 text-danger align-top">*</small>
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
            <small className="ml-1 text-danger align-top">*</small>
            {errors.mobile ? (
              <>
                <small className="ml-1 text-danger">
                  <i className="fas fa-exclamation-circle"></i> {errors.mobile}
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

        <Form.Group controlId="formGridAddress">
          <Form.Label>Address </Form.Label>
          <Form.Control
            placeholder="Apartment, room no. , floor , landmark"
            name="address"
            onChange={handleInputChange}
            value={inputs.address || ""}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridcity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              name="city"
              onChange={handleInputChange}
              value={inputs.city || ""}
            />
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="formGridstate">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter State"
              name="state"
              onChange={handleInputChange}
              value={inputs.state || ""}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridpincode">
            <Form.Label>Pin-Code</Form.Label>
            {errors.zipcode ? (
              <>
                <small className="ml-1 text-danger">
                  <i className="fas fa-exclamation-circle"></i> {errors.zipcode}
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

          <Form.Group as={Col} md={6} controlId="formGridcountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              name="country"
              onChange={handleInputChange}
              value={inputs.country || ""}
            />
          </Form.Group>
        </Form.Row>

        {loading ? (
          <Button variant="primary">Updating ...</Button>
        ) : (
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        )}
      </Form>
    </Col>
  );
};

export default ProfileSettingsP;
