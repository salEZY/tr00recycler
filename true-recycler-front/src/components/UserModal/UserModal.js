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
      <span onClick={HideUserModalHandler}>
        <i className="fas fa-window-close" aria-hidden="true" title="Close"></i>
      </span>
      <div className="user-info"></div>
      <div className="change-password"></div>
      <button className="auth" onClick={logoutHandler}>
        Logout <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default UserModal;
