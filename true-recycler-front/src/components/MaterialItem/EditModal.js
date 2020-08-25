import React from "react";

import "./EditModal.css";

const EditModal = ({ edit, editModalHideHandler, editFunc, setEdit }) => {
  return (
    <div className="edit-modal">
      <h5>Edit Material</h5>
      <input
        type="text"
        defaultValue={edit}
        onChange={(e) => setEdit(e.target.value)}
      />
      <button onClick={editFunc} id="edit">
        Edit
      </button>
      <button onClick={editModalHideHandler} id="cancel-edit">
        Cancel
      </button>
    </div>
  );
};

export default EditModal;
