import React from "react";

const Header = ({ setModal }) => {
  return (
    <>
      <header>
        <a href="/">
          <h1>
            Tr00<i className="fa fa-recycle" aria-hidden="true"></i>R
          </h1>
        </a>
        <button className="auth" onClick={() => setModal(true)}>
          Authenticate<i className="fa fa-sign-in" aria-hidden="true"></i>
        </button>
      </header>
    </>
  );
};

export default Header;
