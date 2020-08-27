import React from "react";
import { Transition } from "react-spring/renderprops";

import Form from "../Form/Form";

import "./Modal.css";

const Modal = ({ hide, modal }) => {
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
              <Form name="login" hide={hide} />
              <Form name="register" register={true} hide={hide} />
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
