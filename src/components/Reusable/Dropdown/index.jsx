import React, { useState, useRef } from "react";
import { Button, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { logout as logoutAction } from "../../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useOutsdieClick from "./useOutsideClick";
import "./index.css";
const DropDown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginUser = useSelector((state) => state.loginUser);
  const userInfo = loginUser.userInfo.user;
  const [openState, toggle] = useState(false);
  const ref = useRef();

  const changeState = () => {
    toggle(!openState);
  };
  useOutsdieClick(ref, toggle);

  const handleLogout = () => {
    dispatch(logoutAction());
    history.push("/login");
  };
  return (
    <Button
      variant="outline-light "
      onClick={changeState}
      className="text-left ml-sm-0  text-primary dropdown-trigger"
      ref={ref}
    >
      <div className="d-flex justify-content-flex-start align-items-center">
        <Image
          src={userInfo.profileImg[0].url}
          className="rounded-circle mr-2"
          style={{ width: "40px", height: "40px" }}
        ></Image>
        <i
          className={`d-none d-lg-inline ${
            openState ? "fas fa-chevron-up" : "fas fa-chevron-down"
          }`}
        ></i>
        <span className="d-lg-none">
          <h6 className="mb-0">{userInfo.firstname}</h6>
          <small className="m-0">
            {userInfo.role[0].toUpperCase() + userInfo.role.slice(1)}
          </small>
        </span>
      </div>

      {openState && (
        <>
          <div className="options-container d-none d-lg-block">
            <>
              <div className="user-info-div">
                <Image
                  src={userInfo.profileImg[0].url}
                  className="rounded-circle mr-2"
                  style={{ width: "40px", height: "40px" }}
                ></Image>
                <span>
                  <h6 className="mb-0 ml-1">{userInfo.firstname}</h6>
                  <small className="m-0">
                    {userInfo.role[0].toUpperCase() + userInfo.role.slice(1)}
                  </small>
                </span>
              </div>
              <NavLink
                exact
                to="/dashboard/index"
                className=" m-0 p-0 border d-flex align-items-center px-3 dropdown-navlink"
                activeStyle={{ backgroundColor: "#20C0F3", color: "white" }}
              >
                <i className="fas fa-columns mr-2"></i>Dashboard
              </NavLink>
              <NavLink
                exact
                className=" m-0 p-0 border d-flex align-items-center px-3 dropdown-navlink"
                to="/dashboard/profile"
                activeStyle={{ backgroundColor: "#20C0F3", color: "white" }}
              >
                <i className="fas fa-user-cog mr-2"></i>Profile Settings
              </NavLink>
              <Link
                className=" m-0 p-0 border d-flex align-items-center px-3 dropdown-navlink"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2 "></i>Sign Out
              </Link>
            </>
          </div>
        </>
      )}
    </Button>
  );
};

export default DropDown;
