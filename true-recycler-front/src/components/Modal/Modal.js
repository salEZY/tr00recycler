import React from "react";

import Form from "../Form/Form";

import "./Modal.css";

const Modal = ({ hide }) => {
  return (
    <>
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
    </>
  );
};

export default Modal;
