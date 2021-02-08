import React from "react";
import { Col, ListGroup, Image, ListGroupItem, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./index.css";
import { logout as logoutAction } from "../../../redux/actions/authActions";
const DashBoardSide = ({ currentUser, role }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logoutAction());
    history.push("/login");
  };
  return (
    currentUser && (
      <Col
        lg={3}
        className=" m-3 rounded p-3 bg-white"
        style={{ height: "fit-content" }}
      >
        <ListGroup variant={"flush"}>
          <Image
            src={currentUser.profileImg[0].url}
            className="m-auto rounded-circle"
            style={{ width: "100px", height: "100px" }}
          ></Image>
          <ListGroupItem className="text-center">
            <h5 className="mb-0">{currentUser.firstname}</h5>
            <small className="text-muted font-weight-bolder d-block mb-0">
              <i className="fas fa-birthday-cake mr-2"></i>
              {currentUser.dateofbirth.split("-").reverse().join("-")}
            </small>
            <small className="text-muted font-weight-bolder">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {currentUser.city} , {currentUser.country}
            </small>
          </ListGroupItem>
          <ListGroupItem>
            <LinkContainer className="py-0 side-bar-link" to="/dashboard/index">
              <Nav.Link>
                <i className="mr-2 fas fa-columns"></i> Dashboard
              </Nav.Link>
            </LinkContainer>
          </ListGroupItem>
          <ListGroupItem>
            <LinkContainer
              className="py-0 side-bar-link"
              to="/dashboard/profile"
            >
              <Nav.Link>
                <i className="mr-2 fas fa-user-cog"></i> Profile Settings
              </Nav.Link>
            </LinkContainer>
          </ListGroupItem>
          {role === "doctor" ? (
            <>
              <ListGroupItem>
                <LinkContainer
                  className="py-0 side-bar-link"
                  to="/dashboard/schedule-timings"
                >
                  <Nav.Link>
                    <i className="mr-2 fas fa-clock"></i> Schedule Timings
                  </Nav.Link>
                </LinkContainer>
              </ListGroupItem>
              <ListGroupItem>
                <LinkContainer
                  className="py-0 side-bar-link"
                  to="/dashboard/your-bookings"
                >
                  <Nav.Link>
                    <i className="mr-2 fas fa-hospital-user"></i> Your Bookings
                  </Nav.Link>
                </LinkContainer>
              </ListGroupItem>
            </>
          ) : (
            <></>
          )}
          <ListGroupItem>
            <LinkContainer
              className="py-0 side-bar-link"
              to="/dashboard/change-password"
            >
              <Nav.Link>
                <i className="mr-2 fas fa-user-lock"></i> Change Password
              </Nav.Link>
            </LinkContainer>
          </ListGroupItem>
          <ListGroupItem onClick={handleLogout}>
            <Nav.Link className="py-0 side-bar-link">
              <i className="mr-2 fas fa-sign-out-alt"></i> Log Out
            </Nav.Link>
          </ListGroupItem>
        </ListGroup>
      </Col>
    )
  );
};

export default DashBoardSide;
