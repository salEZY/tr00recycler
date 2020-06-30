import React from "react";

import Form from "../Form/Form";

import "./Modal.css";

const Modal = ({ setModal }) => {
  return (
    <>
      <div className="modal-holder"></div>
      <div className="modal">
        <Form name="Login" />
        <Form name="Register" register={true} />
        <span onClick={() => setModal(false)}>X</span>
      </div>
    </>
  );
};

export default Modal;
