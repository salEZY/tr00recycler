import React, { useContext } from "react";

import { Auth } from "../util/auth-context";

const Header = ({ modal, show, userModalHandler }) => {
  const auth = useContext(Auth);

  return (
    <>
      <header>
        <a href="/">
          <h1>
            Tr00<i className="fa fa-recycle" aria-hidden="true"></i>R
          </h1>
        </a>
        {modal ? (
          <span style={{ paddingTop: "15px" }}> Press X to exit screen</span>
        ) : auth.token ? (
          <div className="header-auth-div">
            <span>
              Hi {auth.email.split("@")[0]}!
              <span
                style={{
                  margin: "30px 10px",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={userModalHandler}
              >
                <i className="fas fa-caret-down" aria-hidden="true"></i>
              </span>
            </span>
          </div>
        ) : (
          <button className="auth" onClick={show}>
            <i class="fas fa-users"></i> Authenticate
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
