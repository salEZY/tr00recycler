import React, { useState } from "react";
import { Transition } from "react-spring/renderprops";

import Form from "../Form/Form";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

import "./Modal.css";

const Modal = ({ hide, modal }) => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [register, setRegister] = useState(false);
  const [btn, setBtn] = useState("Sign up");
  const [fontAwesome, setFontAwesome] = useState("fas fa-user-plus");

  const switchModeHandler = () => {
    setPasswordModal(false);
    if (!register) {
      setRegister(true);
      setBtn("Sign in");
      setFontAwesome("fas fa-sign-in-alt");
    } else {
      setRegister(false);
      setBtn("Sign up");
      setFontAwesome("fas fa-user-plus");
    }
  };

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
              <button className="switch" onClick={switchModeHandler}>
                Switch to {btn} <i className={fontAwesome}></i>
              </button>
              <div className="forms-holder">
                {register ? (
                  <Form name="sign up" register={true} hide={hide} />
                ) : (
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
                )}
              </div>

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
