import { useState, useEffect } from "react";
import { Table, Image, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useUserInfo } from "../../../../../customHooks";
import { getAllBooking } from "../../../../../utils/api";
import ErrorMessage from "../../../../Reusable/ErrorMessage";
import Loader from "../../../../Reusable/Loader";
import "../index.css";
const Appointments = () => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userInfo = useUserInfo();
  useEffect(() => {
    if (!bookings) {
      setLoading(true);
      getAllBooking(userInfo.token, { mine: "mybooking" }).then((res) => {
        const { bookings: bookingData, message } = res;
        if (bookingData) {
          setBookings(bookingData);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [bookings, userInfo]);
  return (
    <Table responsive className="m-0 mt-3 appointments-table">
      <thead>
        <tr>
          <th className="border-0">Doctor</th>
          <th className="border-0">Appt Date</th>
          <th className="border-0">Booking Date</th>
          <th className="border-0">Amount</th>
          <th className="border-0">Status</th>
        </tr>
      </thead>

      {loading ? (
        <div style={{ width: "100%", height: "50vh" }}>
          <Loader />
        </div>
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <tbody>
          {bookings &&
            bookings.map((item) => (
              <tr className="table-row " key={item._id}>
                <LinkContainer to={`/doctor/profile/${item.doctor._id}`}>
                  <td className="appointments-doctor ">
                    <div className="m-0 pl-0 align-middle table-doctor-cell">
                      <div>
                        <Image
                          src={item.doctor.profileImg[0].url}
                          className="rounded-circle mr-1 p-0 d-inline-block"
                          style={{ width: "40px", height: "40px" }}
                        ></Image>
                      </div>
                      <div>
                        <p className="mb-0 appointments-doctor-name font-weight-bold">
                          {item.doctor.firstname}
                        </p>
                      </div>
                    </div>
                  </td>
                </LinkContainer>

                <td>
                  <p className="m-0">
                    {item.bookingDetails.booking_date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </td>

                <td className="align-middle">
                  <p
                    className="appointments-appt-time"
                    style={{ color: "#20C0F3" }}
                  >
                    {item.bookingDetails.booking_time}
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
                      Rjected
                    </Badge>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      )}
    </Table>
  );
};

export default Appointments;
