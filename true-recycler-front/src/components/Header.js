import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <h1>
          Tr00 <i className="fa fa-recycle" aria-hidden="true"></i>
        </h1>
        <button className="auth">
          Login <i className="fa fa-sign-in" aria-hidden="true"></i>
        </button>
      </header>
    </>
  );
};

export default Header;
