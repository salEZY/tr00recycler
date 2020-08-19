import React from "react";

const Header = ({ modal, show }) => {
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
        ) : (
          <button className="auth" onClick={show}>
            <i className="fa fa-sign-in" aria-hidden="true"></i> Authenticate
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
