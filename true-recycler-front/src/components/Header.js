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
            Authenticate <i className="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
