import React, { useContext } from "react";
import { Auth } from "../util/auth-context";

const Header = ({ modal, show }) => {
  const auth = useContext(Auth);

  const logoutHandler = () => {
    auth.logout();
  };
  return (
    <>
      <header>
        <a href="/">
          <h1>
            Tr00<i className="fa fa-recycle" aria-hidden="true"></i>R
          </h1>
        </a>
        {modal ? (
          <span>Press X to exit screen</span>
        ) : auth.token ? (
          <>
            <span>Hi {auth.email.split("@")[0]}!</span>
            <button className="auth" onClick={logoutHandler}>
              Logout <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
            </button>
          </>
        ) : (
          <button className="auth" onClick={show}>
            Authenticate <i className="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
