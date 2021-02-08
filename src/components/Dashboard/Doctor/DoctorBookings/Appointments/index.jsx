import React from "react";
import { Table, Image, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../index.css";
const Appointments = () => {
  return (
    <Table responsive className="m-0 mt-3 appointments-table">
      <thead>
        <tr>
          <th className="border-0">Doctor</th>
          <th className="border-0">Appt Date</th>
          <th className="border-0">Booking Date</th>
          <th className="border-0">Amount</th>
          <th className="border-0">Follow Up</th>
          <th className="border-0">Status</th>
          <th className="border-0"></th>
        </tr>
      </thead>

      <tbody>
        {/* to be mapped */}
        <tr className="table-row ">
          <LinkContainer to="/doctor/profile">
            <td className="appointments-doctor ">
              <div className="m-0 pl-0 align-middle table-doctor-cell">
                <div>
                  <Image
                    src="https://via.placeholder.com/40"
                    className="rounded-circle mr-1 p-0 d-inline-block"
                  ></Image>
                </div>
                <div>
                  <p className="mb-0 appointments-doctor-name font-weight-bold">
                    {"Doctor Name"}
                  </p>
                  <small className="m-0 align-top text-muted">
                    {"Doctor Type"}
                  </small>
                </div>
              </div>
            </td>
          </LinkContainer>

          <td className="align-middle">
            <p className="m-0">00/00/0000</p>
            <p className="appointments-appt-time" style={{ color: "#20C0F3" }}>
              10:10 AM
            </p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle">
            <p>₹ 150</p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle">
            {"success" ? (
              <Badge pill className="mb-3 pill-success  pill-success">
                Confirm
              </Badge>
            ) : "pending" ? (
              <Badge pill className="mb-3 text-warning pill-warning">
                Confirm
              </Badge>
            ) : "cancelled" ? (
              <Badge pill className="mb-3 text-danger pill-danger"></Badge>
            ) : (
              <></>
            )}
          </td>

          <td className="align-middle text-right">
            <Badge className="p-2 mb-3 mr-1 print-button" onClick={""}>
              <i className="fas fa-print mr-1"></i>
              Print
            </Badge>
            <Badge className="p-2 mb-3  view-button" onClick={""}>
              <i className="far fa-eye mr-1"></i>
              View
            </Badge>
          </td>
        </tr>
        {/* here one row ends  */}

        <tr className="table-row ">
          <LinkContainer to="/doctor/profile">
            <td className="appointments-doctor ">
              <div className="m-0 pl-0 align-middle table-doctor-cell">
                <div>
                  <Image
                    src="https://via.placeholder.com/40"
                    className="rounded-circle mr-1 p-0 d-inline-block"
                  ></Image>
                </div>
                <div>
                  <p className="mb-0 appointments-doctor-name font-weight-bold">
                    {"Doctor Name"}
                  </p>
                  <small className="m-0 align-top text-muted">
                    {"Doctor Type"}
                  </small>
                </div>
              </div>
            </td>
          </LinkContainer>

          <td>
            <p className="m-0">00/00/0000</p>
            <p className="appointments-appt-time" style={{ color: "#20C0F3" }}>
              10:10 AM
            </p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle">
            <p>₹ 150</p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle">
            {"success" ? (
              <Badge pill className="mb-3 pill-success  pill-success">
                Confirm
              </Badge>
            ) : "pending" ? (
              <Badge pill className="mb-3 text-warning pill-warning">
                Confirm
              </Badge>
            ) : "cancelled" ? (
              <Badge pill className="mb-3 text-danger pill-danger"></Badge>
            ) : (
              <></>
            )}
          </td>

          <td className="align-middle text-right">
            <Badge className="p-2 mb-3 mr-1 print-button" onClick={""}>
              <i className="fas fa-print mr-1"></i>
              Print
            </Badge>
            <Badge className="p-2 mb-3  view-button" onClick={""}>
              <i className="far fa-eye mr-1"></i>
              View
            </Badge>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Appointments;
