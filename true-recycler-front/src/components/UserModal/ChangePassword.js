import React, { useState } from "react";
import { Transition } from "react-spring/renderprops";

import "./ChangePassword.css";

const ChangePassword = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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
                <h4>Change password</h4>
                <form>
                  <input
                    type="text"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  ></input>
                  <input
                    type="text"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  ></input>
                  <input
                    type="text"
                    placeholder="Repeat new Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  ></input>
                  <div className="change-buttons">
                    <button>Change</button>
                    <button onClick={() => setShowChangePassword(false)}>
                      Cancel
                    </button>
                  </div>
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
