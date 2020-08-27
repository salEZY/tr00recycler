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
          <div className="header-auth-div">
            <span>
              Hi {auth.email.split("@")[0]}!
              <span
                style={{
                  margin: "0px 10px",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-caret-down" aria-hidden="true"></i>
              </span>
            </span>
            <button className="auth" onClick={logoutHandler}>
              Logout <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
            </button>
          </div>
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
