import React, { useState, useEffect } from "react";
import "./index.css";
import { defaultTimeSlots } from "./utils";
import { Col, Form, Button, Row, Badge, Alert } from "react-bootstrap";
import { updateCurrentProfile } from "../../../../utils/api";
import useFormHandler from "../../../Forms/Formhandler/useFormHandler";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../../../../redux/actionTypes";
const ScheduleTimings = ({ currentProfile, token, setCurrentProfile }) => {
  const [slots, setSlots] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [onLeave, setOnleave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  //   onLeave
  const changeOnLeave = () => {
    setOnleave(!onLeave);
  };

  const setslotonchange = (e) => {
    const newObj = { ...slots };
    newObj[e.target.name].push(e.target.value);

    setSlots(() => {
      return {
        ...newObj,
      };
    });
    e.target.value = "Select Slot";
  };

  const removeSlot = (e) => {
    let name = e.target.getAttribute("name");
    let newArr = slots[name];
    let id = e.target.getAttribute("id");
    newArr.splice(id, 1);
    setSlots((slots) => {
      return {
        ...slots,
        [e.target.name]: newArr,
      };
    });
  };
  // form submit handler
  const submit = async () => {
    inputs["available"] = [onLeave, slots];
    delete inputs["__v"];
    delete inputs["_id"];
    const finalData = new FormData();

    finalData.append("inputs", JSON.stringify(inputs));
    setLoading(true);
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

  // using custom form handler
  const { inputs, normalSubmit, setInputs } = useFormHandler(submit);

  useEffect(() => {
    setInputs((inputs) => ({
      ...inputs,
      ...currentProfile,
    }));

    if (currentProfile) {
      setSlots(currentProfile.available[1]);
      setOnleave(currentProfile.available[0]);
    }
  }, [setInputs, currentProfile]);
  return (
    <>
      <Col lg={8} className="rounded ">
        {error && <Alert variant="danger">{error} </Alert>}
        <Form onSubmit={normalSubmit}>
          <Row>
            <Col className=" m-3 bg-white rounded p-3">
              <h4 className="mb-3">Availability</h4>
              <Row className="mx-0">
                <h5 className="d-inline text-success mr-2">Available</h5>
                <div
                  className={`availability-toggle ${onLeave ? "red" : ""}`}
                  onClick={changeOnLeave}
                >
                  <div
                    className={`availability-toggle-inside ${
                      onLeave ? "red" : ""
                    }`}
                  ></div>
                </div>
                <h5 className="d-inline text-danger ml-2">On Leave</h5>
              </Row>
            </Col>
          </Row>
          {!onLeave ? (
            <>
              {" "}
              <Row>
                <Col className=" m-3 bg-white rounded p-3 schedule-div">
                  <h4 className="mb-3">Schedule</h4>
                  {onLeave ? (
                    <div className="disable-div rounded"></div>
                  ) : (
                    <></>
                  )}

                  {/* monday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotsmon">
                      <Form.Label className="font-weight-bold">
                        Monday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.monday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots Selected
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.monday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="monday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="monday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="monday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.monday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  {/* tuesdday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotstue">
                      <Form.Label className="font-weight-bold">
                        Tuesday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.tuesday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.tuesday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="tuesday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="tuesday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="tuesday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.tuesday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  {/* wednesday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotswed">
                      <Form.Label className="font-weight-bold">
                        Wednesday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.wednesday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.wednesday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="wednesday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="wednesday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="wednesday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.wednesday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  {/* thursday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotsthu">
                      <Form.Label className="font-weight-bold">
                        Thursday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.thursday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.thursday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="thursday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="thursday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="thursday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.thursday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  {/* friday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotsfri">
                      <Form.Label className="font-weight-bold">
                        Friday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.friday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.friday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="friday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="friday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="friday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.friday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  {/* saturday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotssat">
                      <Form.Label className="font-weight-bold">
                        Saturday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.saturday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.saturday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="saturday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="saturday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="saturday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.saturday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  {/* sunday */}
                  <Form.Row className="ml-1">
                    <Form.Group as={Col} controlId="formGridslotssun">
                      <Form.Label className="font-weight-bold">
                        Sunday
                      </Form.Label>
                      <Row className="px-3 py-1">
                        {slots.sunday.length === 0 ? (
                          <p className="text-info font-weight-bold">
                            No Slots
                            <small className="ml-2"> Select Some Slots.</small>
                          </p>
                        ) : (
                          ""
                        )}
                        {slots.sunday.map((slot, index) => {
                          return (
                            <Badge
                              pill
                              variant="light"
                              key={slot}
                              id={index}
                              className="m-1 border border-dark align-middle"
                              style={{
                                cursor: "pointer",
                                letterSpacing: "1px",
                              }}
                              onClick={removeSlot}
                              name="sunday"
                            >
                              {slot.toString()}{" "}
                              <i
                                className="fas fa-minus-circle text-danger"
                                id={index}
                                name="sunday"
                              ></i>
                            </Badge>
                          );
                        })}
                      </Row>
                      <Form.Control
                        as="select"
                        name="sunday"
                        defaultValue="Select Slot"
                        onChange={setslotonchange}
                      >
                        <option disabled>Select Slot</option>
                        {defaultTimeSlots.map((slot) => {
                          return slots.sunday.includes(slot) ? (
                            ""
                          ) : (
                            <option key={slot}>{slot}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
          {loading ? (
            <Button variant="primary" className="mb-4 text-white" size="lg">
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

export default ScheduleTimings;
