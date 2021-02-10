import React, { useState, useEffect } from "react";
import useFormHandler from "../../../components/Forms/Formhandler/useFormHandler";
import {
  Container,
  Row,
  Image,
  Form,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { getMaxDate, getDay, getReadableDate } from "./utils";
import { Link, useHistory, useParams } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import "./index.css";
import { createBooking, getSingleProfile } from "../../../utils/api";
import Loader from "../../Reusable/Loader";
import ErrorMessage from "../../Reusable/ErrorMessage";
import { useUserInfo } from "../../../customHooks";
const BookingForm = () => {
  const history = useHistory();
  const [minDate, setminDate] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [readableDate, setreadableDate] = useState("");
  const [currentDaySlots, setCurrentDaySlots] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const userInfo = useUserInfo();
  const onDateChange = (e) => {
    setreadableDate(getReadableDate(e.target.value));
    setCurrentDaySlots(doctorProfile.available[1][getDay(e.target.value)]);
    setInputs((inputs) => {
      return {
        ...inputs,
        booking_time: null,
        booking_date: minDate,
      };
    });
  };

  const submit = async () => {
    if (inputs.payment_method === "payonspot") {
      inputs["totalPrice"] = doctorProfile.price;

      const { status, message } = await createBooking(
        userInfo.token,
        inputs,
        doctorId
      );
      if (status === "success") {
        history.push("/dashboard/index");
      }
      if (message) {
        setBookingError(message);
      }
    } else if (inputs.payment_method === "paypal") {
      setShowButton(true);
    }
  };

  // using custom form handler
  const {
    inputs,
    handleInputChange,
    bookDoctor,
    errors,
    setInputs,
  } = useFormHandler(submit);

  const { doctorId } = useParams();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!doctorProfile) {
      setLoading(true);
      getSingleProfile("doctor", doctorId).then((res) => {
        const { data, message } = res;
        if (data) {
          setDoctorProfile(data.user);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
    if (inputs.payment_method === "payonspot") {
      setShowButton(false);
    }
  }, [doctorId, doctorProfile, inputs.payment_method]);

  useEffect(() => {
    var d = new Date();
    var n = d.toISOString().split("T")[0];
    setminDate(n);
    setreadableDate(getReadableDate(minDate));
    setCurrentDaySlots(
      doctorProfile ? doctorProfile.available[1][getDay(minDate)] : []
    );
    setInputs((inputs) => {
      return {
        ...inputs,
        booking_date: minDate,
      };
    });
  }, [minDate, setInputs, doctorProfile]);
  const handleBooking = async (details) => {
    inputs["paymentResult"] = details.payer;
    inputs["totalPrice"] = doctorProfile.price;
    const { status, message } = await createBooking(
      userInfo.token,
      inputs,
      doctorId
    );
    if (status === "success") {
      history.push("/dashboard/index");
    }
    if (message) {
      setBookingError(message);
    }
  };
  return (
    <Container className=" mt-3" style={{ backgroundColor: "#F6F6F6" }}>
      <Row className="d-flex justify-content-between align-items-start">
        <Col sm={12} md={7} lg={8}>
          {bookingError && <ErrorMessage error={bookingError} />}
          <Form onSubmit={bookDoctor}>
            {/* date and time */}
            <Row className="bg-white px-3 py-3 my-2 rounded">
              <h5>Date And Time</h5>
              <Form.Row className="w-100">
                <Form.Group className="w-100" as={Col} controlId="selectDate">
                  <Form.Label>Select A Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={minDate}
                    max={getMaxDate(minDate)}
                    onChange={onDateChange}
                    defaultValue={minDate}
                    className={
                      errors.booking_date ? "border border-danger" : ""
                    }
                  ></Form.Control>
                  {errors.booking_date ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.booking_date}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                  <h6 className="mt-2">{readableDate}</h6>
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridtimeslots">
                  {currentDaySlots.length === 0 ? (
                    <Form.Label className="text-danger">
                      No Slots Available!!
                    </Form.Label>
                  ) : (
                    <Form.Label>Time Slots Avaliable</Form.Label>
                  )}
                  <Form.Control
                    as="select"
                    name="booking_time"
                    defaultValue={
                      currentDaySlots.length === 0
                        ? "Select Other Date"
                        : "Select"
                    }
                    disabled={currentDaySlots.length == 0}
                    onChange={handleInputChange}
                    className={
                      errors.booking_time ? "border border-danger" : ""
                    }
                  >
                    {currentDaySlots.length === 0 || (
                      <option value="">Select</option>
                    )}
                    {currentDaySlots.map((slot, index) => {
                      return <option key={index}> {slot}</option>;
                    })}
                  </Form.Control>
                  {errors.booking_time ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.booking_time}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                </Form.Group>
              </Form.Row>
            </Row>

            {/* personale information */}
            <Row className="bg-white px-3 py-3 my-2 rounded">
              <h5>Patient Information</h5>
              <Form.Row className="w-100">
                {/* fname */}
                <Form.Group
                  className="w-100"
                  sm={12}
                  md={6}
                  as={Col}
                  controlId="fname"
                >
                  <Form.Label>First Name</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  <Form.Control
                    onChange={handleInputChange}
                    type="text"
                    name="firstname"
                    className={errors.firstname ? "border border-danger" : ""}
                  ></Form.Control>
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
                </Form.Group>
                {/* lname */}
                <Form.Group
                  className="w-100"
                  sm={12}
                  md={6}
                  as={Col}
                  controlId="lname"
                >
                  <Form.Label>Last Name</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  <Form.Control
                    onChange={handleInputChange}
                    type="text"
                    name="lastname"
                    className={errors.lastname ? "border border-danger" : ""}
                  ></Form.Control>
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
                </Form.Group>
              </Form.Row>

              <Form.Row className="w-100">
                {/* email */}
                <Form.Group
                  className="w-100"
                  sm={12}
                  md={6}
                  as={Col}
                  controlId="email"
                >
                  <Form.Label>Email </Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  <Form.Control
                    onChange={handleInputChange}
                    type="text"
                    name="email"
                    className={errors.email ? "border border-danger" : ""}
                  ></Form.Control>
                  {errors.email ? (
                    <>
                      <small className="ml-1 text-danger">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.email}
                      </small>
                    </>
                  ) : (
                    <></>
                  )}
                </Form.Group>
                {/* phone */}
                <Form.Group
                  className="w-100"
                  sm={12}
                  md={6}
                  as={Col}
                  controlId="phone"
                >
                  <Form.Label>Phone</Form.Label>
                  <small className="ml-1 text-danger font-weight-bold align-top">
                    *
                  </small>
                  <Form.Control
                    onChange={handleInputChange}
                    type="tel"
                    name="mobile"
                  ></Form.Control>
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
                </Form.Group>
              </Form.Row>
            </Row>

            {/* payment method */}
            <Row className="bg-white px-3 py-3 my-2 rounded">
              <h5>Payment Method</h5>
              <Form.Row className="w-100">
                <Form.Group as={Col} md={6} controlId="formGridtimeslots">
                  <Form.Label>Select a payment method</Form.Label>
                  <Form.Check
                    type="radio"
                    name="payment_method"
                    id="paypal"
                    label="Paypal"
                    className="my-2"
                    onChange={handleInputChange}
                    value="paypal"
                  />
                  <Form.Check
                    type="radio"
                    name="payment_method"
                    id="payonspot"
                    label="Pay On Spot"
                    className="my-2"
                    onChange={handleInputChange}
                    value="payonspot"
                  />
                </Form.Group>
                {errors.payment_method ? (
                  <>
                    <small className="ml-1 text-danger">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.payment_method}
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </Form.Row>
            </Row>
            <Row>
              {inputs.payment_method === "paypal" && showButton ? (
                <PayPalButton
                  amount={
                    doctorProfile.price === 0 ? "0.01" : doctorProfile.price
                  }
                  onSuccess={handleBooking}
                  options={{
                    currency: "INR",
                  }}
                />
              ) : (
                <Button className="text-white m-0" type="submit" size="lg">
                  Book Now
                </Button>
              )}
            </Row>
          </Form>
        </Col>
        <Col sm={12} md={5} lg={4} className="my-2 pr-md-0">
          {loading ? (
            <Loader w={6} h={6} />
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            doctorProfile && (
              <Card className="border-0">
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Card.Title className="mb-0">Booking Summary</Card.Title>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 d-flex justify-content-start align-items-start">
                    <Image
                      src={doctorProfile.profileImg[0].url}
                      style={{ width: "80px", height: "80px" }}
                    ></Image>
                    <Link className="ml-2 text-decoration-none">
                      <p className="font-weight-bolder m-0">
                        Dr. {doctorProfile.firstname} {doctorProfile.lastname}
                      </p>
                      <p className="text-muted m-0">
                        {" "}
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {doctorProfile.state || "NA"},{" "}
                        {doctorProfile.country || "NA"}
                      </p>
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 d-flex justify-content-between align-items-center">
                    <p className="font-weight-bold m-0">Date</p>
                    <p className="text-muted m-0" style={{ fontWeight: "500" }}>
                      {readableDate}
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 d-flex justify-content-between align-items-center">
                    <p className="font-weight-bold m-0">Time</p>
                    <p className="text-muted m-0" style={{ fontWeight: "500" }}>
                      {inputs.booking_time || "No Time Selected"}
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 d-flex justify-content-between align-items-center">
                    <p className="font-weight-bold m-0">Consulting Fee</p>
                    <p className="text-muted m-0" style={{ fontWeight: "500" }}>
                      Rs.{doctorProfile.price}
                    </p>
                  </ListGroupItem>
                  <div
                    className="m-auto border"
                    style={{ height: "0px", width: "90%" }}
                  ></div>
                  <ListGroupItem className="d-flex  justify-content-between align-items-center">
                    <h5 className="font-weight-bolder">Total</h5>
                    <h5 className="font-weight-bolder text-primary">
                      Rs.{doctorProfile.price}
                    </h5>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
