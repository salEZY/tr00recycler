import React, { useContext } from "react";
import { Transition } from "react-spring/renderprops";

import { Auth } from "../../util/auth-context";

import ChangePassword from "./ChangePassword";
import "./UserModal.css";

const UserModal = ({ userModal, setUserModal }) => {
  const auth = useContext(Auth);

  const logoutHandler = () => {
    auth.logout();
    setUserModal(false);
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
              <span
                onClick={() => setUserModal(false)}
                className="user-modal-close"
              >
                <i
                  className="fas fa-window-close"
                  aria-hidden="true"
                  title="Close"
                ></i>
              </span>
              <div className="user-info">
                <h3>
                  <i className="fas fa-user"></i> User info
                </h3>
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
                <i className="fas fa-sign-out-alt" aria-hidden="true"></i>{" "}
                Logout
              </button>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default UserModal;
