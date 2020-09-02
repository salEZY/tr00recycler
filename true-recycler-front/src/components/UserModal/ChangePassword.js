import React, { useState, useContext } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

import Message from "../Message/Message";
import { messageHandler } from "../../util/messageHandler";
import { Auth } from "../../util/auth-context";
import "./ChangePassword.css";

const ChangePassword = () => {
  const auth = useContext(Auth);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [oldPassMsg, setOldPassMsg] = useState("");
  const [newPassMsg, setNewPassMsg] = useState("");
  const [repeatPassMsg, setRepeatPassMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const clearForm = () => {
    setOldPassword("");
    setNewPassword("");
    setRepeatPassword("");
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();

    if (!!!oldPassword && !!!newPassword && !!!repeatPassword) {
      messageHandler(setOldPassMsg, "Old password is missing", clearForm);
      messageHandler(setNewPassMsg, "New password is missing", clearForm);
      messageHandler(
        setRepeatPassMsg,
        "Repeated password is missing",
        clearForm
      );
      return;
    }

    if (!!!oldPassword) {
      messageHandler(setOldPassMsg, "Old password is missing", clearForm);
      return;
    }
    if (!!!newPassword) {
      messageHandler(setNewPassMsg, "New password is missing", clearForm);
      return;
    }
    if (!!!repeatPassword) {
      messageHandler(
        setRepeatPassMsg,
        "Repeated password is missing",
        clearForm
      );
      return;
    }

    if (newPassword !== repeatPassword || newPassword.length < 6) {
      messageHandler(
        setErrorMsg,
        "Passwords do NOT match or too short!",
        clearForm
      );
      return;
    }

    axios
      .patch(`/api/auth/${auth.userId}/change`, {
        oldPassword,
        newPassword,
        repeatPassword,
      })
      .then((res) => {
        messageHandler(setSuccessMsg, res.data.message, clearForm);
        setTimeout(() => {
          setShowChangePassword(false);
        }, 2500);
      })
      .catch((error) => {
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
        return;
      });
  };

  return (
    <div className="change-password">
      {showChangePassword ? (
        <Transition
          items={showChangePassword}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          trail={200}
        >
          {(showChangePassword) =>
            showChangePassword &&
            ((props) => (
              <div style={props}>
                <h3>Change password</h3>
                <form>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  ></input>
                  <Message msg={oldPassMsg} danger={true} />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  ></input>
                  <Message msg={newPassMsg} danger={true} />
                  <input
                    type="password"
                    placeholder="Repeat new Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  ></input>
                  <Message msg={repeatPassMsg} danger={true} />
                  <div className="change-buttons">
                    <button onClick={changePasswordHandler}>Change</button>
                    <button onClick={() => setShowChangePassword(false)}>
                      Cancel
                    </button>
                  </div>
                  <Message msg={errorMsg} danger={true} />
                  <Message msg={successMsg} />
                </form>
              </div>
            ))
          }
        </Transition>
      ) : (
        <button onClick={() => setShowChangePassword(true)}>
          Change Password
        </button>
      )}
    </div>
  );
};

export default ChangePassword;
