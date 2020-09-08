import React, { useState } from "react";
import { Transition } from "react-spring/renderprops";

import Form from "../Form/Form";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

import "./Modal.css";

const Modal = ({ hide, modal }) => {
  const [passwordModal, setPasswordModal] = useState(false);
  return (
    <Transition
      items={modal}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      trail={250}
    >
      {(modal) =>
        modal &&
        ((props) => (
          <div style={props}>
            <div id="modal-holder" onClick={hide}></div>
            <div className="modal">
              <div className="login-change-div">
                {passwordModal ? (
                  <ForgetPassword
                    passwordModal={passwordModal}
                    setPasswordModal={setPasswordModal}
                  />
                ) : (
                  <>
                    <Form name="sign in" hide={hide} />
                    <p
                      onClick={() => setPasswordModal(true)}
                      className="forgot-password"
                    >
                      <i className="fas fa-unlock-alt"></i> Forgot password?
                    </p>
                  </>
                )}
              </div>
              <Form name="sign up" register={true} hide={hide} />
              <span onClick={hide}>
                <i
                  className="fa fa-times delete"
                  aria-hidden="true"
                  title="Close Window"
                ></i>
              </span>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default Modal;
