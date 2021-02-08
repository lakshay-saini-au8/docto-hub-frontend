import React, { useState, useEffect, useCallback } from "react";
import { Table, Image, Badge } from "react-bootstrap";
import { useUserInfo } from "../../../../../customHooks";

import { LinkContainer } from "react-router-bootstrap";
import { getAllBooking, updateBookingStatus } from "../../../../../utils/api";
const DynamicTable = ({ item }) => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userInfo = useUserInfo();
  const setBookingData = useCallback(() => {
    setLoading(true);
    getAllBooking(userInfo.token).then((res) => {
      const { bookings: bookingData, message } = res;
      if (bookingData) {
        setBookings(bookingData);
      }
      if (message) {
        setError(message);
      }
      setLoading(false);
    });
  }, [userInfo.token]);
  const updateStatus = async (value, bookingId) => {
    const { status, message } = await updateBookingStatus(
      userInfo.token,
      value,
      bookingId
    );
    if (status === "success") {
      setBookingData();
    }
    if (message) {
      setError(message);
    }
  };
  useEffect(() => {
    if (!bookings) {
      setBookingData();
    }
  }, [bookings, setBookingData]);
  return (
    <>
      <tr className="table-row " key={item._id}>
        <LinkContainer to="/patient/profile/item.user._id">
          <td className="appointments-doctor ">
            <div className="m-0 pl-0 align-middle d-flex align-items-center ">
              <div>
                <Image
                  src={item.user.profileImg[0].url}
                  className="rounded-circle mr-1 p-0 d-inline-block"
                  style={{ width: "40px", height: "40px" }}
                ></Image>
              </div>
              <div>
                <p className="mb-0 appointments-doctor-name font-weight-bold">
                  {item.user.firstname}
                </p>
              </div>
            </div>
          </td>
        </LinkContainer>

        <td className="align-middle">
          <p className="m-0">
            {item.bookingDetails.booking_date
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/")}
          </p>
        </td>

        <td className="align-middle">
          <p className="appointments-appt-time" style={{ color: "#20C0F3" }}>
            {item.bookingDetails.booking_time}
          </p>
        </td>

        <td className="align-middle">
          <p>
            {item.paymentDetails.payment_method === "payonspot"
              ? "Pay On Spot"
              : "Paytm"}
          </p>
        </td>

        <td className="align-middle">
          <p>₹{item.bookingDetails.totalPrice}</p>
        </td>
        <td className="align-middle">
          {item.status === "confirm" ? (
            <Badge pill className="mb-3 pill-success  pill-success">
              Confirm
            </Badge>
          ) : item.status === "pending" ? (
            <Badge pill className="mb-3 text-warning pill-warning">
              Pending
            </Badge>
          ) : item.status === "reject" ? (
            <Badge pill className="mb-3 text-danger pill-danger">
              Rejected
            </Badge>
          ) : (
            <></>
          )}
        </td>

        <td className="align-middle text-right">
          <Badge
            className="p-2 mb-3 m-1 accept-button"
            onClick={() => updateStatus("confirm", item._id)}
          >
            <i className="fas fa-check mr-1"></i>
            Accept
          </Badge>
          <Badge
            className="p-2 mb-3 m-1 cancel-button"
            onClick={() => updateStatus("reject", item._id)}
          >
            <i className="fas fa-times mr-1"></i>
            Cancel
          </Badge>
        </td>
      </tr>
    </>
  );
};

export default DynamicTable;
