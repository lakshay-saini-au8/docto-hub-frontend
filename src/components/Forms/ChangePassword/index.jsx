import { useState } from "react";
import { Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useUserInfo } from "../../../customHooks";
import { updatePassword } from "../../../utils/api";
import ErrorMessage from "../../Reusable/ErrorMessage";
import useFormHandler from "../Formhandler/useFormHandler";

const ChangePassword = () => {
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userInfo = useUserInfo();

  // form submit handler
  const submit = () => {
    const data = {
      oldPassword: inputs.password,
      password: inputs.newpassword,
    };

    setLoading(true);
    updatePassword(userInfo.token, data).then((res) => {
      const { status, message } = res;
      if (status === "success") {
        setPasswordStatus("Password Update");
        setError(null);
      }
      if (message) {
        setPasswordStatus(null);
        setError(message);
      }
      clearForm();
      setLoading(false);
    });
  };
  // using custom form handler
  const {
    inputs,
    handleInputChange,
    clearForm,
    changePassword,
    errors,
  } = useFormHandler(submit);
  return (
    <Col lg={8} className=" m-3 bg-white rounded p-3">
      {error && <ErrorMessage error={error} />}
      {passwordStatus && (
        <Alert variant="success" className="text-break">
          {passwordStatus}
        </Alert>
      )}
      <Form onSubmit={changePassword}>
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridold">
            <Form.Label>Old Password</Form.Label>
            {errors.password ? (
              <>
                <small className="ml-1 text-danger">
                  <i className="fas fa-exclamation-circle"></i>{" "}
                  {errors.password}
                </small>
              </>
            ) : (
              <></>
            )}
            <Form.Control
              type="password"
              placeholder="Old Password"
              name="password"
              value={inputs.password || ""}
              onChange={handleInputChange}
              className={errors.password ? "border border-danger" : ""}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridnew">
            <Form.Label>New Password</Form.Label>
            {errors.newpassword ? (
              <>
                <small className="ml-1 text-danger">
                  <i className="fas fa-exclamation-circle"></i>{" "}
                  {errors.newpassword}
                </small>
              </>
            ) : (
              <></>
            )}
            <Form.Control
              type="password"
              placeholder="New Password"
              name="newpassword"
              value={inputs.newpassword || ""}
              onChange={handleInputChange}
              className={errors.newpassword ? "border border-danger" : ""}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="formGridnewconfirm">
            <Form.Label>Confirm New Password</Form.Label>
            {errors.confirmnewpassword ? (
              <>
                <small className="ml-1 text-danger">
                  <i className="fas fa-exclamation-circle"></i>{" "}
                  {errors.confirmnewpassword}
                </small>
              </>
            ) : (
              <></>
            )}
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              name="confirmnewpassword"
              value={inputs.confirmnewpassword || ""}
              onChange={handleInputChange}
              className={
                errors.confirmnewpassword ? "border border-danger" : ""
              }
            />
          </Form.Group>
        </Form.Row>

        {loading ? (
          <Button
            variant="primary"
            type="submit"
            className="text-white d-flex align-items-center"
          >
            Updating
            <Spinner animation="border" className="mx-2" />
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="text-white">
            Change Password
          </Button>
        )}
      </Form>
    </Col>
  );
};

export default ChangePassword;
