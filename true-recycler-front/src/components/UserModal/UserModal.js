import React, { useContext } from "react";
import { Auth } from "../../util/auth-context";

import "./UserModal.css";

const UserModal = ({ HideUserModalHandler }) => {
  const auth = useContext(Auth);

  const logoutHandler = () => {
    auth.logout();
    HideUserModalHandler();
  };
  return (
    <div className="user-modal">
      <p>blaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <span onClick={HideUserModalHandler}>X</span>
      <button className="auth" onClick={logoutHandler}>
        Logout <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default UserModal;
