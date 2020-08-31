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
      <div className="user-info">
        <h4>User info</h4>
        <p>User e-mail: {auth.email}</p>
        <p>Joined: {auth.joined.split("T")[0].replace(/-/g, ".")}</p>
      </div>
      <div className="change-password">
        <h4>Change password</h4>
        <form>
          <input type="text" placeholder="Old Password"></input>
          <input type="text" placeholder="New Password"></input>
          <input type="text" placeholder="Repeat new Password"></input>
          <button>Change!</button>
        </form>
      </div>
      <button className="auth" onClick={logoutHandler}>
        Logout <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default UserModal;
