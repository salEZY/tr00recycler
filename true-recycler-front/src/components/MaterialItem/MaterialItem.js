import React, { useState } from "react";
import axios from "axios";

import DeleteModal from "./DeleteModal";
import "./MaterialItem.css";
import { iconPick } from "../../util/iconPicker";

const MaterialItem = ({
  name,
  type,
  matId,
  setMaterialByType,
  setFilteredMaterial,
}) => {
  const [deleteModal, showDeleteModal] = useState(false);
  let icon = iconPick(type);

  const deleteHandler = (matId) => {
    axios
      .delete(`/api/materials/${matId}`)
      .then((res) => {
        if (setMaterialByType) {
          setMaterialByType(res.data);
        }
        if (setFilteredMaterial) {
          setFilteredMaterial([]);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteModalHandler = () => {
    deleteHandler(matId);
  };

  const deleteModalHideHandler = () => {
    showDeleteModal(false);
  };

  return (
    <div className="mat-item" title={`${name} - ${type}`}>
      {deleteModal ? (
        <DeleteModal
          deleteFunc={deleteModalHandler}
          hideFunc={deleteModalHideHandler}
        />
      ) : (
        <>
          <h4>{name}</h4>
          <p>
            Type: <i className={icon} aria-hidden="true" title={type}></i>
          </p>
          <button className="edit-button" title="Edit Material">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button
            className="delete-button"
            title="Delete Material"
            onClick={() => showDeleteModal(true)}
          >
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </>
      )}
    </div>
  );
};

export default MaterialItem;
