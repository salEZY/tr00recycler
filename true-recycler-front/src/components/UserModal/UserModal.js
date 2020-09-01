import React, { useContext } from "react";
import { Transition } from "react-spring/renderprops";

import { Auth } from "../../util/auth-context";

import ChangePassword from "./ChangePassword";
import "./UserModal.css";

const UserModal = ({ userModal, HideUserModalHandler }) => {
  const auth = useContext(Auth);

  const logoutHandler = () => {
    auth.logout();
    HideUserModalHandler();
  };
  return (
    <Transition
      items={userModal}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      trail={150}
    >
      {(userModal) =>
        userModal &&
        ((props) => (
          <div style={props}>
            <div className="user-modal">
              <span onClick={HideUserModalHandler} className="user-modal-close">
                <i
                  className="fas fa-window-close"
                  aria-hidden="true"
                  title="Close"
                ></i>
              </span>
              <div className="user-info">
                <h4>User info</h4>
                <p>
                  User e-mail:{" "}
                  <span style={{ fontWeight: "bold" }}>{auth.email}</span>
                </p>
                <p>
                  Joined:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {auth.joined.split("T")[0].replace(/-/g, ".")}
                  </span>
                </p>
              </div>
              <ChangePassword />
              <button className="auth logout-button" onClick={logoutHandler}>
                Logout{" "}
                <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default UserModal;
