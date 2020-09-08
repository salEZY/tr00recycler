import React, { useState } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

import Message from "../Message/Message";
import { messageHandler } from "../../util/messageHandler";
import "./ForgetPassword.css";

const ForgetPassword = ({ passwordModal, setPasswordModal }) => {
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const clearForm = () => {
    setEmail("");
  };

  const sendEmailHandler = (e) => {
    e.preventDefault();

    if (!!!email) {
      messageHandler(setEmailMsg, "Email is missing", clearForm);
      return;
    }

    axios
      .post("/api/auth/forgot-password", { email })
      .then((res) => {
        messageHandler(setSuccessMsg, res.data.message, clearForm);
        setTimeout(() => {
          setPasswordModal(false);
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
      });
  };

  return (
    <Transition
      items={passwordModal}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      trail={250}
    >
      {(passwordModal) =>
        passwordModal &&
        ((props) => (
          <div style={props}>
            <div className="reset-password">
              <h3>Reset Password</h3>
              <p>
                To reset your password, type in your email and press submit. You
                will receive an email with further instructions on how to solve
                the issue at hand.
              </p>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Message msg={emailMsg} danger={true} />
              <div>
                <button className="send-email" onClick={sendEmailHandler}>
                  <i className="far fa-envelope"></i> Submit
                </button>
                <button
                  onClick={() => setPasswordModal(false)}
                  className="cancel-send"
                >
                  Cancel
                </button>
              </div>
              <Message msg={errorMsg} danger={true} />
              <Message msg={successMsg} />
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default ForgetPassword;
