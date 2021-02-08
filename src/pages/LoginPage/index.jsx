import React from "react";
import LoginForm from "../../components/Forms/Login";

// component imports

import RegisterForm from "../../components/Forms/Register";
const LoginPage = ({ location }) => {
  return (
    <>
      {location.pathname.includes("/login") ? (
        <>
          <LoginForm location={location} />
        </>
      ) : (
        <></>
      )}

      {location.pathname.includes("/register") ? (
        <>
          <RegisterForm location={location} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginPage;
