import React, { useState } from "react";
import { Transition } from "react-spring/renderprops";

import "./ChangePassword.css";

const ChangePassword = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
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
                  <input type="text" placeholder="Old Password"></input>
                  <input type="text" placeholder="New Password"></input>
                  <input type="text" placeholder="Repeat new Password"></input>
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
