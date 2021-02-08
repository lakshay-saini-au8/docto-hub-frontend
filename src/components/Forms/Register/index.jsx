import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import useFormHandler from "../Formhandler/useFormHandler";
import registerPatient from "../../../assets/registerPatient.svg";
import registerDoctor from "../../../assets/registerDoctor.svg";
import { USER_REGISTER_RESET } from "../../../redux/actionTypes";
import { useHistory } from "react-router-dom";
import { register as registerAction } from "../../../redux/actions/authActions";
const RegisterForm = () => {
  // to decide login or forgot password state
  const { pathname } = useLocation();
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const registerUser = useSelector((state) => state.registerUser);
  const { loading, success, error } = registerUser;
  const loginUser = useSelector((state) => state.loginUser);
  const { loading: loginLoader, userInfo, error: loginError } = loginUser;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [success, dispatch]);
  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard/profile");
    }
    if (loginError) {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, loginError]);
  useEffect(() => {
    setRole(pathname.slice(10));
  }, [pathname]);
  // form submit handler
  const submit = () => {
    inputs["role"] = role;
    console.log("Inputs", inputs);
    dispatch(
      registerAction(
        inputs.firstname,
        inputs.mobile,
        inputs.email,
        inputs.password,
        inputs.role
      )
    );
    clearForm();
  };

  // using custom form handler
  const {
    inputs,
    handleInputChange,
    register,
    clearForm,
    errors,
  } = useFormHandler(submit);
  // to set login or forgotpassword state
  const changeRole = () => {
    dispatch({ type: USER_REGISTER_RESET });
  };
  console.log(role);
  return (
    <Container className="mt-5 mb-5" fluid>
      <Row>
        <Col className=" col-12 col-md-4 offset-md-2 mb-4 mb-md-0">
          <Image
            src={role === "patient" ? registerPatient : registerDoctor}
            fluid
          />
        </Col>
        <Col className=" col-12 col-md-4 p-4 border rounded">
          <h5 className="mb-4 text-center">
            {role === "patient" ? "Register As Patient" : "Register As Doctor"}
          </h5>
          {role === "patient" ? (
            <Form.Text className="text-right mb-3">
              <Link
                className="text-primary role-change font-weight-bolder"
                to="/register/doctor"
                style={{ textDecoration: "none" }}
                onClick={changeRole}
              >
                Are You A Doctor?
              </Link>
            </Form.Text>
          ) : (
            <Form.Text className="text-right mb-3">
              <Link
                className="text-primary role-change font-weight-bolder"
                to="/register/patient"
                style={{ textDecoration: "none" }}
                onClick={changeRole}
              >
                Not A Doctor?
              </Link>
            </Form.Text>
          )}

          {error && (
            <Alert variant={"danger"} className="text-center">
              {error}
            </Alert>
          )}
          {loading ? (
            <Spinner animation="border" variant="primary" className="m-auto" />
          ) : null}
          {loginLoader ? (
            <>
              <Spinner
                animation="border"
                variant="primary"
                className="m-auto"
              />{" "}
              Loging you{" "}
            </>
          ) : null}
          <Form onSubmit={register}>
            {errors.firstname ? (
              <>
                <Form.Text className="text-left text-danger mb-1 alert-text">
                  <strong>
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {errors.firstname}
                  </strong>
                </Form.Text>
              </>
            ) : (
              <></>
            )}
            <Form.Group controlId="firstname" className="my-form-group mb-5">
              <Form.Control
                size="md"
                type="name"
                className={`my-input ${
                  errors.firstname ? "border border-danger" : ""
                }`}
                placeholder="Enter Your FirstName"
                autoComplete="off"
                onChange={handleInputChange}
                value={inputs.firstname || ""}
                name="firstname"
              />
              <Form.Label column className="my-label">
                Enter Your FirstName
              </Form.Label>
            </Form.Group>
            {errors.email ? (
              <>
                <Form.Text className="text-left text-danger mb-1 alert-text">
                  <strong>
                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                  </strong>
                </Form.Text>
              </>
            ) : (
              <></>
            )}
            <Form.Group controlId="email" className="my-form-group mb-5">
              <Form.Control
                size="md"
                type="text"
                className={`my-input ${
                  errors.email ? "border border-danger" : ""
                }`}
                placeholder="Enter Your Email"
                autoComplete="off"
                onChange={handleInputChange}
                value={inputs.email || ""}
                name="email"
              />
              <Form.Label column className="my-label">
                Enter Your Email
              </Form.Label>
            </Form.Group>
            {errors.mobile ? (
              <>
                <Form.Text className="text-left text-danger mb-1 alert-text">
                  <strong>
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {errors.mobile}
                  </strong>
                </Form.Text>
              </>
            ) : (
              <></>
            )}
            <Form.Group controlId="phone" className="my-form-group mb-5">
              <Form.Control
                size="md"
                type="tel"
                className={`my-input ${
                  errors.mobile ? "border border-danger" : ""
                }`}
                placeholder="Enter Your PhoneNumber"
                autoComplete="off"
                onChange={handleInputChange}
                value={inputs.mobile || ""}
                name="mobile"
              />
              <Form.Label column className="my-label">
                Enter Your PhoneNumber
              </Form.Label>
            </Form.Group>
            {errors.password ? (
              <>
                <Form.Text className="text-left text-danger mb-1 alert-text">
                  <strong>
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {errors.password}
                  </strong>
                </Form.Text>
              </>
            ) : (
              <></>
            )}
            <Form.Group controlId="password" className="my-form-group mb-5">
              <Form.Control
                size="md"
                type="password"
                className={`my-input ${
                  errors.password ? "border border-danger" : ""
                }`}
                placeholder="Create Password"
                onChange={handleInputChange}
                value={inputs.password || ""}
                name="password"
              />
              <Form.Label column className="my-label">
                Create Password
              </Form.Label>
            </Form.Group>
            {errors.confirm_password ? (
              <>
                <Form.Text className="text-left text-danger mb-1 alert-text">
                  <strong>
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {errors.confirm_password}
                  </strong>
                </Form.Text>
              </>
            ) : (
              <></>
            )}
            <Form.Group
              controlId="confirm_password"
              className="my-form-group mb-5"
            >
              <Form.Control
                size="md"
                type="password"
                className={`my-input ${
                  errors.confirm_password ? "border border-danger" : ""
                }`}
                placeholder="Confirm Password"
                onChange={handleInputChange}
                value={inputs.confirm_password || ""}
                name="confirm_password"
              />
              <Form.Label column className="my-label">
                Confirm Password
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="role" className="d-none">
              <Form.Control
                onChange={handleInputChange}
                value={role}
                name="role"
              />
            </Form.Group>
            <LinkContainer to="/login">
              <Form.Text className="text-right forgot-password ">
                <strong>Already Have An Account?</strong>
              </Form.Text>
            </LinkContainer>
            {loading ? (
              <Button
                variant="primary"
                block
                className="mt-2 my-submit-btn"
                size="lg"
              >
                <strong className="text-white font-weight-bolder">
                  <Spinner animation="border" />
                </strong>
              </Button>
            ) : (
              <Button
                variant="primary"
                block
                type="submit"
                className="mt-2 my-submit-btn"
                size="lg"
              >
                <strong className="text-white font-weight-bolder">
                  Register
                </strong>
              </Button>
            )}

            <div className="login-or">
              <span className="or-line"></span>
              <span className="span-or">or</span>
            </div>
            <Row>
              <Col>
                <Button
                  block
                  type="button"
                  className="mt-2 my-submit-btn-fb"
                  size="sm"
                >
                  <strong className="text-white font-weight-bolder">
                    <i className="fab fa-facebook-f"></i> Login
                  </strong>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  block
                  type="button"
                  className="mt-2 my-submit-btn-google"
                  size="sm"
                >
                  <strong className="text-white ">
                    <i className="fab fa-google"></i> Login
                  </strong>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
