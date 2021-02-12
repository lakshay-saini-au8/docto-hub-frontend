import React, { useState, useEffect } from "react";
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
import { LinkContainer } from "react-router-bootstrap";
import useFormHandler from "../Formhandler/useFormHandler";
import login1 from "../../../assets/login1.svg";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  login as loginAction,
  logout,
} from "../../../redux/actions/authActions";

const LoginForm = ({ location }) => {
  // to decide login or forgot password state
  const [forgotPassword, setForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginUser = useSelector((state) => state.loginUser);
  const { loading, userInfo, error } = loginUser;
  // form submit handler
  const submit = () => {
    if (forgotPassword) {
      clearForm();
    } else {
      dispatch(loginAction(inputs.email, inputs.password));
      clearForm();
    }
  };

  // using custom form handler
  const {
    inputs,
    handleInputChange,
    login,
    resetPassword,
    clearForm,
    errors,
  } = useFormHandler(submit);
  // to set login or forgotpassword state
  useEffect(() => {
    if (location.pathname === "/login/forgot-password") {
      setForgotPassword(true);
    } else {
      setForgotPassword(false);
    }
  }, [location.pathname, inputs]);
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
    return () => {
      if (error) {
        dispatch(logout());
      }
    };
  }, [userInfo, history, error, dispatch]);

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col className=" col-12 col-md-4 offset-md-2 mb-4 mb-md-0">
          <Image src={login1} fluid />
        </Col>
        <Col className=" col-12 col-md-4 p-4 border rounded">
          <h5 className="mb-4 text-center">
            {forgotPassword ? (
              <>
                Forgot Password
                <p>
                  <small>Enter your email to get the password reset link</small>
                </p>
              </>
            ) : (
              <>Login DoctoHub</>
            )}
          </h5>
          {forgotPassword ? (
            <>
              <Form onSubmit={resetPassword}>
                {errors.email ? (
                  <>
                    <Form.Text className="text-left text-danger mb-1 alert-text">
                      <strong>
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.email}
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
                <LinkContainer to="/login">
                  <Form.Text className="text-right forgot-password ">
                    <strong>Remember Password?</strong>
                  </Form.Text>
                </LinkContainer>
                <Button
                  variant="primary"
                  block
                  type="submit"
                  className="mt-2 my-submit-btn"
                  size="lg"
                >
                  <strong className="text-white font-weight-bolder">
                    Send Reset Password Link
                  </strong>
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Form onSubmit={login}>
                {errors.email ? (
                  <>
                    <Form.Text className="text-left text-danger mb-1 alert-text">
                      <strong>
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.email}
                      </strong>
                    </Form.Text>
                  </>
                ) : (
                  <></>
                )}
                {error && (
                  <Alert variant={"danger"} className="text-center">
                    {error}
                  </Alert>
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
                    placeholder="Enter Your Password"
                    onChange={handleInputChange}
                    value={inputs.password || ""}
                    name="password"
                  />
                  <Form.Label column className="my-label">
                    Enter Your Password
                  </Form.Label>
                </Form.Group>
                <LinkContainer to="/login/forgot-password">
                  <Form.Text className="text-right forgot-password ">
                    <strong>Forgot Password?</strong>
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
                      Login
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
                <LinkContainer to="/register/patient">
                  <Form.Text className="text-center custom-link">
                    Don't Have an account?
                    <strong className="text-primary">Register</strong>
                  </Form.Text>
                </LinkContainer>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
