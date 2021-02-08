import React from "react";
import { Table, Image, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../index.css";
const MedicalRecords = () => {
  return (
    <Table responsive="md" className="m-0 mt-3 table-center appointments-table">
      <thead>
        <tr>
          <th className="border-0">ID</th>
          <th className="border-0">Date</th>
          <th className="border-0">Description</th>
          <th className="border-0">Attachment</th>
          <th className="border-0">Created By</th>
          <th className="border-0"></th>
        </tr>
      </thead>

      <tbody>
        {/* to be mapped */}
        <tr className="table-row ">
          <td className="align-middle">
            <p>#ID-1020</p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle">
            <p>Some Checkup</p>
          </td>

          <td className="align-middle attachment-link">
            <p>Attachment.pdf</p>
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
            <p>#ID-1020</p>
          </td>

          <td className="align-middle">
            <p>00/00/0000</p>
          </td>

          <td className="align-middle">
            <p>Some Checkup</p>
          </td>

          <td className="align-middle attachment-link">
            <p>Attachment.pdf</p>
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

export default MedicalRecords;
