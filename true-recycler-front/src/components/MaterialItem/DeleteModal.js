import React from "react";

import "./DeleteModal.css";

const DeleteModal = ({ deleteFunc, hideFunc }) => {
  return (
    <div className="delete-modal">
      <p>Delete this material?</p>
      <div>
        <button onClick={deleteFunc} className="yes">
          Yes
        </button>
        <button onClick={hideFunc} className="no">
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
