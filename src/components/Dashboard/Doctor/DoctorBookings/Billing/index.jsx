import React from "react";
import { Table, Image, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../index.css";
const Billing = () => {
  return (
    <Table responsive className="m-0 mt-3 ">
      <thead>
        <tr>
          <th className="border-0">Invoice No.</th>
          <th className="border-0">Doctor</th>
          <th className="border-0">Amount</th>
          <th className="border-0">Paid On</th>
          <th className="border-0"></th>
        </tr>
      </thead>

      <tbody>
        {/* to be mapped */}
        <tr className="table-row ">
          <td className="align-middle">
            <p>#INV-1000</p>
          </td>

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
            <p>₹ 150</p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle text-right">
            <Badge className="p-2 mb-3 mr-1 view-button" onClick={""}>
              <i className="far fa-eye mr-1"></i>
              View
            </Badge>
            <Badge className="p-2 mb-3 mr-1 print-button" onClick={""}>
              <i className="fas fa-print mr-1"></i>
              Print
            </Badge>
          </td>
        </tr>
        {/* here one row ends  */}

        <tr className="table-row ">
          <td className="align-middle">
            <p>#INV-1000</p>
          </td>

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
            <p>₹ 150</p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle text-right">
            <Badge className="p-2 mb-3 mr-1 view-button" onClick={""}>
              <i className="far fa-eye mr-1"></i>
              View
            </Badge>
            <Badge className="p-2 mb-3 mr-1 print-button" onClick={""}>
              <i className="fas fa-print mr-1"></i>
              Print
            </Badge>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Billing;
