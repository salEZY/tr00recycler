import React from "react";

import Form from "../Form/Form";

import "./Modal.css";

const Modal = ({ setModal }) => {
  return (
    <>
      <div className="modal-holder" onClick={() => setModal(false)}></div>
      <div className="modal">
        <Form name="Login" />
        <Form name="Register" register={true} />
        <span onClick={() => setModal(false)}>
          <i
            className="fa fa-times delete"
            aria-hidden="true"
            title="Close Window"
          ></i>
        </span>
      </div>
    </>
  );
};

export default Modal;
