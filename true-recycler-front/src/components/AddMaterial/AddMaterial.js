import React, { useState } from "react";
import axios from "axios";

import Message from "../Message/Message";
import { messageHandler } from "../../util/messageHandler";
import "./AddMaterial.css";

const AddMaterial = ({ setLoading }) => {
  const [materialType, setMaterialType] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [selectMsg, setSelectMsg] = useState("");
  const [materialNameMsg, setMaterialNameMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clearForm = () => {
    setMaterialType("");
    setMaterialName("");
  };

  const addMaterialHandler = (e) => {
    e.preventDefault();

    if (materialName === "") {
      messageHandler(setMaterialNameMsg, "Name is missing!", clearForm);
    }

    if (materialType === "") {
      messageHandler(setSelectMsg, "Type not selected!", clearForm);
      return;
    }
    setLoading(true);
    axios
      .post("/api/materials/add", { materialName, materialType })
      .then((res) => {
        messageHandler(setSuccess, res.data.message, clearForm);
        setLoading(false);
      })
      .catch((error) => {
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
        return;
      });
  };

  return (
    <>
      <form method="POST">
        <h4>Add Material</h4>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setMaterialName(e.target.value)}
          value={materialName}
        />
        <Message msg={materialNameMsg} danger={true} id="addFormStyle" />
        <select
          name=""
          onChange={(e) => setMaterialType(e.target.value)}
          value={materialType}
        >
          <option value="">--Select--</option>
          <option value="Paper">Paper</option>
          <option value="General">General</option>
          <option value="Plastic">Plastic</option>
          <option value="Glass">Glass</option>
          <option value="Lightning-waste">Lightning-waste</option>
          <option value="Metal">Metal</option>
          <option value="E-waste">E-waste</option>
        </select>
        <Message msg={selectMsg} danger={true} id="addFormStyle" />
        <button onClick={addMaterialHandler} id="addMatBtn">
          <i className="fas fa-plus-circle"></i> Add
        </button>
        <Message msg={errorMsg} danger={true} id="addFormStyle" />
        <Message msg={success} id="addFormStyle" />
      </form>
    </>
  );
};

export default AddMaterial;
