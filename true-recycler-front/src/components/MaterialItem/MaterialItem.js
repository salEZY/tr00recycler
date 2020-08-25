import React, { useState, useContext } from "react";
import axios from "axios";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import "./MaterialItem.css";
import { iconPick } from "../../util/iconPicker";
import { Auth } from "../../util/auth-context";

const MaterialItem = ({
  name,
  type,
  matId,
  setMaterialByType,
  setFilteredMaterial,
  creatorId,
}) => {
  const auth = useContext(Auth);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [materialName, setMaterialName] = useState(name);

  let icon = iconPick(type);

  const deleteHandler = (matId) => {
    axios
      .delete(`/api/materials/${matId}`, {
        headers: { Authorization: `${auth.token}` },
      })
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

  const editHandler = (matId) => {
    if (materialName === "") {
      setMaterialName(name);
      return;
    }
    axios
      .patch(
        `/api/materials/${matId}`,
        { materialName },
        { headers: { Authorization: `${auth.token}` } }
      )
      .then((res) => {
        setMaterialName(res.data);
        setEditModal(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteModalHandler = () => {
    deleteHandler(matId);
  };

  const deleteModalHideHandler = () => {
    setDeleteModal(false);
  };

  const editModalHandler = () => {
    editHandler(matId);
  };

  const editModalHideHandler = () => {
    setEditModal(false);
  };

  return (
    <div className="mat-item" title={`${name} - ${type}`}>
      {deleteModal ? (
        <DeleteModal
          deleteFunc={deleteModalHandler}
          hideFunc={deleteModalHideHandler}
        />
      ) : editModal ? (
        <EditModal
          edit={materialName}
          editModalHideHandler={editModalHideHandler}
          editFunc={editModalHandler}
          setEdit={setMaterialName}
        />
      ) : (
        <>
          <h4>{materialName}</h4>
          <p style={{ color: "#039b3b", fontWeight: "bold" }}>
            Type: <i className={icon} aria-hidden="true" title={type}></i>
          </p>
          {auth.userId === creatorId && (
            <>
              <button
                className="edit-button"
                title="Edit Material"
                onClick={() => setEditModal(true)}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              <button
                className="delete-button"
                title="Delete Material"
                onClick={() => setDeleteModal(true)}
              >
                <i className="far fa-trash-alt"></i> Delete
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MaterialItem;
